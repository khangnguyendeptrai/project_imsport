import React, { useState, useRef } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const ProductGallery = ({ images }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [startIndex, setStartIndex] = useState(0);
    const [showZoom, setShowZoom] = useState(false);
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const [lensPosition, setLensPosition] = useState({ left: 0, top: 0 });

    const visibleCount = 3;
    const itemHeight = 96;
    const mobileVisible = 4;
    const gap = 8;
    const totalHeight = visibleCount * itemHeight + (visibleCount - 1) * gap;

    const imgRef = useRef(null);
    const lensSize = 150; // kích thước ô vuông mờ

    const handlePrev = () => {
        if (startIndex > 0) setStartIndex((prev) => prev - 1);
    };

    const handleNext = () => {
        if (startIndex + visibleCount < images.length)
            setStartIndex((prev) => prev + 1);
    };
    //mobile 
    const handleMobilePrev = () => {
        if (mobileStart > 0) setMobileStart((s) => s - 1);
    };
    const handleMobileNext = () => {
        if (mobileStart + mobileVisible < images.length) setMobileStart((s) => s + 1);
    };
    const handleMouseMove = (e) => {
        const rect = imgRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Giới hạn lens không vượt khỏi ảnh
        const left = Math.max(0, Math.min(x - lensSize / 2, rect.width - lensSize));
        const top = Math.max(0, Math.min(y - lensSize / 2, rect.height - lensSize));

        setLensPosition({ left, top });
        setZoomPosition({
            x: ((x / rect.width) * 100).toFixed(2),
            y: ((y / rect.height) * 100).toFixed(2),
        });
    };

    return (
        <div className="flex flex-col md:flex-row gap-4">
            {/* Ảnh phụ */}
            <div className="flex md:flex-col items-center gap-2">
                <button
                    onClick={handlePrev}
                    disabled={startIndex === 0}
                    className={`transition-opacity duration-200 ${startIndex === 0 ? "opacity-40" : "opacity-100 hover:opacity-80"
                        }`}
                >
                    <ChevronUpIcon className="h-5 w-5" />
                </button>

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

      {/* Ảnh phụ (MOBILE ONLY) */}
      <div className="md:hidden w-full mt-2">
        <div className="flex items-center justify-between">
          <button
            onClick={handleMobilePrev}
            disabled={mobileStart === 0}
            className={`p-2 ${mobileStart === 0 ? "opacity-40" : "opacity-100"}`}
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>

          <div className="overflow-hidden flex-1 mx-2">
            <motion.div
              animate={{ x: -mobileStart * (88 + gap) }}
              transition={{ duration: 0.25 }}
              className="flex gap-2"
              style={{ width: `${images.length * (88 + gap)}px` }}
            >
              {images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedIndex(i)}
                  className="w-22 h-22 border border-gray-300 bg-white flex items-center justify-center cursor-pointer"
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

          <button
            onClick={handleMobileNext}
            disabled={mobileStart + mobileVisible >= images.length}
            className={`p-2 ${mobileStart + mobileVisible >= images.length ? "opacity-40" : "opacity-100"}`}
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
            {/* Ảnh chính + hiệu ứng zoom */}
            <div className="relative flex-1 flex justify-center items-center">
                <img
                    ref={imgRef}
                    src={images[selectedIndex]}
                    alt="main"
                    className="max-w-full h-auto object-contain rounded-lg select-none"
                    onMouseEnter={() => setShowZoom(true)}
                    onMouseLeave={() => setShowZoom(false)}
                    onMouseMove={handleMouseMove}
                />

                {/* Ô vuông mờ theo chuột */}
                {showZoom && (
                    <div
                        className="absolute border border-gray-600 bg-gray-300/20 pointer-events-none"

                        style={{
                            width: `${lensSize}px`,
                            height: `${lensSize}px`,
                            left: `${lensPosition.left}px`,
                            top: `${lensPosition.top}px`,
                        }}
                    />
                )}

                {/* Ảnh phóng to */}
                {showZoom && (
                    <div
                        className="hidden md:block absolute right-[-70%] top-15 w-[350px] h-[400px] border-2 border-gray-500 bg-white overflow-hidden z-10"
                        style={{
                            backgroundImage: `url(${images[selectedIndex]})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "200%",
                            backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default ProductGallery;
