import React, { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const ProductGallery = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1: next, -1: prev
  const visibleCount = 3; // hiển thị 3 ảnh nhỏ

  const handlePrev = () => {
    if (startIndex > 0) {
      setDirection(-1);
      setStartIndex(startIndex - 1);
    }
  };

  const handleNext = () => {
    if (startIndex + visibleCount < images.length) {
      setDirection(1);
      setStartIndex(startIndex + 1);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Ảnh phụ */}
      <div className="flex md:flex-col items-center gap-2">
        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          className={`p-1 border rounded-md ${
            startIndex === 0
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          <ChevronUpIcon className="h-4 w-4 md:h-5 md:w-5" />
        </button>

        {/* Danh sách ảnh phụ có hiệu ứng trượt */}
        <div className="flex md:flex-col gap-2 overflow-hidden">
          <motion.div
            key={startIndex} // kích hoạt animation mỗi lần thay đổi
            initial={{
              y: direction === 1 ? 40 : direction === -1 ? -40 : 0,
              opacity: 0,
            }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex md:flex-col gap-2"
          >
            {images.slice(startIndex, startIndex + visibleCount).map((img, i) => {
              const actualIndex = startIndex + i;
              return (
                <img
                  key={i}
                  src={img}
                  alt={`thumb-${i}`}
                  onClick={() => setSelectedIndex(actualIndex)}
                  className="w-20 h-20 md:w-24 md:h-24 object-cover border border-gray-200 rounded-md cursor-pointer"
                />
              );
            })}
          </motion.div>
        </div>

        <button
          onClick={handleNext}
          disabled={startIndex + visibleCount >= images.length}
          className={`p-1 border rounded-md ${
            startIndex + visibleCount >= images.length
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          <ChevronDownIcon className="h-4 w-4 md:h-5 md:w-5" />
        </button>
      </div>

      {/* Ảnh chính */}
      <div className="relative flex-1 flex justify-center items-center">
        <motion.img
          key={selectedIndex} // để ảnh chính fade khi đổi
          src={images[selectedIndex]}
          alt="main"
          initial={{ opacity: 0.3, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="max-w-full h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default ProductGallery;
