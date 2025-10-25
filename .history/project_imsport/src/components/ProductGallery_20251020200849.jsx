import React, { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const ProductGallery = ({ images }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [startIndex, setStartIndex] = useState(0);

    const visibleCount = 3;
    const itemHeight = 96; // chiều cao mỗi thumbnail
    const gap = 8; // gap-2 = 8px
    const totalHeight = visibleCount * itemHeight + (visibleCount - 1) * gap;

    const handlePrev = () => {
        if (startIndex > 0) setStartIndex((prev) => prev - 1);
    };

    const handleNext = () => {
        if (startIndex + visibleCount < images.length)
            setStartIndex((prev) => prev + 1);
    };

    return (
        <div className="flex flex-col md:flex-row gap-4">
            {/* Ảnh phụ */}
            <div className="flex md:flex-col items-center gap-2">
                {/* Mũi tên lên */}
                <button
                    onClick={handlePrev}
                    disabled={startIndex === 0}
                    className={`transition-opacity duration-200 ${startIndex === 0 ? "opacity-40" : "opacity-100 hover:opacity-80"
                        }`}
                >
                    <ChevronUpIcon className="h-5 w-5" />
                </button>

                {/* Danh sách ảnh phụ có hiệu ứng trượt */}
                <div
                    className="overflow-hidden flex md:flex-col w-[100px] md:w-auto"
                    style={{ height: totalHeight }}
                >
                    <motion.div
                        animate={{ y: -startIndex * (itemHeight + gap) }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="flex md:flex-col gap-2"
                    >
                        {images.map((img, i) => (
                            <div
                                key={i}
                                onClick={() => setSelectedIndex(i)}
                               className="w-21 h-24 border border-gray-200 cursor-pointer flex items-center justify-center"

                            >
                                <img
                                    src={img}
                                    alt={`thumb-${i}`}
                                    className="w-[80%] h-[70%] object-contain"
                                />
                            </div>
                        ))}

                    </motion.div>
                </div>

                {/* Mũi tên xuống */}
                <button
                    onClick={handleNext}
                    disabled={startIndex + visibleCount >= images.length}
                    className={`transition-opacity duration-200 ${startIndex + visibleCount >= images.length
                            ? "opacity-40"
                            : "opacity-100 hover:opacity-80"
                        }`}
                >
                    <ChevronDownIcon className="h-5 w-5" />
                </button>
            </div>

            {/* Ảnh chính */}
           
        </div>
    );
};

export default ProductGallery;
