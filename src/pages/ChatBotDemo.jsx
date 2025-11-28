import React, { useState, useRef, useEffect } from "react";

/*
Streaming Chat UI (fetch POST -> read stream)
Features:
- buffering & flush every 30ms to avoid re-render thrash
- dedupe overlapping fragments to avoid repeated words
- typing indicator
- auto-scroll
*/

const API_URL = "http://localhost:8000/chat/stream"; // change if needed

export default function App() {
    const [messages, setMessages] = useState([]); // {sender:'user'|'bot', text: ''}
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [typing, setTyping] = useState(false);
    const messageEndRef = useRef(null);

    // auto scroll
    // useEffect(() => {
    //     messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    // }, [messages, typing]);

    // helper append user/bot
    const pushUserMessage = (text) => {
        setMessages(prev => [...prev, { sender: "user", text }]);
    };

    const pushBotPlaceholder = () => {
        setMessages(prev => [...prev, { sender: "bot", text: "" }]);
        return;
    };

    // main send
    const sendMessage = async () => {
        if (!input.trim() || loading) return;
        const userText = input.trim();
        setInput("");
        setLoading(true);
        setTyping(true);

        // push user and bot placeholder in single state update
        setMessages(prev => {
            const newMsgs = [...prev, { sender: "user", text: userText }, { sender: "bot", text: "" }];
            return newMsgs;
        });

        // small delay to allow state to settle
        await new Promise(r => setTimeout(r, 5));

        // index of last message (bot placeholder)
        let botIndex = null;
        setMessages(prev => {
            botIndex = prev.length - 1;
            return prev;
        });

        // stream call
        try {
            const controller = new AbortController();
            const resp = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userText }),
                signal: controller.signal,
            });

            if (!resp.ok || !resp.body) {
                throw new Error("No stream from server");
            }

            const reader = resp.body.getReader();
            const decoder = new TextDecoder();
            let buffer = "";
            let flushBuffer = ""; // accumulate to flush periodically
            let last_sent = ""; // used to dedupe overlapping fragments

            // set an interval to flush buffer to React state to reduce re-renders
            const flushInterval = 30; // ms
            let intervalId = setInterval(() => {
                if (!flushBuffer) return;
                const textToFlush = flushBuffer;
                flushBuffer = "";
                setMessages(prev => {
                    const updated = [...prev];
                    if (botIndex == null) botIndex = updated.length - 1;
                    const cur = updated[botIndex]?.text || "";
                    updated[botIndex] = { ...updated[botIndex], text: cur + textToFlush };
                    return updated;
                });
            }, flushInterval);

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                buffer += decoder.decode(value, { stream: true });

                // split on SSE blocks (server sends "data: <text>\n\n")
                const parts = buffer.split("\n\n");
                buffer = parts.pop(); // remainder

                for (let block of parts) {
                    block = block.trim();
                    if (!block) continue;
                    // handle if server prefixes "data: "
                    if (block.startsWith("data:")) {
                        let payload = block.replace(/^data:\s*/, "");
                        // skip [DONE] marker
                        if (payload === "[DONE]") {
                            // finish
                            clearInterval(intervalId);
                            // flush any remaining flushBuffer
                            if (flushBuffer) {
                                const remaining = flushBuffer;
                                flushBuffer = "";
                                setMessages(prev => {
                                    const updated = [...prev];
                                    if (botIndex == null) botIndex = updated.length - 1;
                                    const cur = updated[botIndex]?.text || "";
                                    updated[botIndex] = { ...updated[botIndex], text: cur + remaining };
                                    return updated;
                                });
                            }
                            intervalId = null;
                            setTyping(false);
                            setLoading(false);
                            reader.releaseLock?.();
                            break;
                        }

                        // Dedupe overlapping fragments:
                        // if payload starts with last_sent, remove overlapping prefix
                        if (last_sent && payload.startsWith(last_sent)) {
                            payload = payload.slice(last_sent.length);
                        }
                        if (!payload) continue;

                        // avoid tiny duplicates contained in current
                        // append to local flushBuffer first
                        // update last_sent
                        last_sent += payload;
                        flushBuffer += payload;
                    } else {
                        // ignore other forms
                    }
                } // end for parts
            } // end while

            // final cleanup if interval still active
            setTimeout(() => {
                if (intervalId) {
                    clearInterval(intervalId);
                    if (flushBuffer) {
                        const remaining = flushBuffer;
                        flushBuffer = "";
                        setMessages(prev => {
                            const updated = [...prev];
                            if (botIndex == null) botIndex = updated.length - 1;
                            const cur = updated[botIndex]?.text || "";
                            updated[botIndex] = { ...updated[botIndex], text: cur + remaining };
                            return updated;
                        });
                    }
                }
            }, 50);

        } catch (err) {
            console.error("Stream error", err);
            setMessages(prev => [...prev, { sender: "bot", text: "❌ Lỗi kết nối stream." }]);
            setTyping(false);
            setLoading(false);
        }
    };

    const onKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="flex flex-col items-center w-full h-screen bg-gray-100 p-4">
            <div className="w-full max-w-3xl h-full bg-white rounded-xl shadow-lg flex flex-col">
                <div className="bg-blue-600 text-white p-4 rounded-t-xl text-xl font-semibold">
                    RAG Chatbot (Streaming)
                </div>

                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                            <div className={`px-4 py-2 rounded-2xl max-w-2xl shadow text-sm whitespace-pre-wrap ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {typing && (
                        <div className="flex justify-start">
                            <div className="bg-gray-200 px-4 py-2 rounded-2xl text-sm">Đang nhập...</div>
                        </div>
                    )}
                    <div ref={messageEndRef} />
                </div>

                <div className="p-4 flex gap-2 border-t">
                    <textarea
                        rows={1}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={onKeyDown}
                        placeholder="Nhập tin nhắn..."
                        className="flex-1 border rounded-xl px-4 py-2 resize-none"
                    />
                    <button onClick={sendMessage} disabled={loading} className={`px-6 py-2 rounded-xl shadow text-white ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}>
                        {loading ? "Đang trả lời..." : "Gửi"}
                    </button>
                </div>
            </div>
        </div>
    );
}
