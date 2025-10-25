import React, { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const ProductGallery = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);

  const visibleCount = 3;
  const itemHeight = 96; // chuẩn chiều cao thumbnail
  const gap = 8; // gap-2 = 0.5rem = 8px

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
      {/* Cột ảnh phụ */}
      <div className="flex md:flex-col items-center gap-2">
        {/* Nút lên */}
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
              <img
                key={i}
                src={img}
                alt={`thumb-${i}`}
                onClick={() => setSelectedIndex(i)}
                className={`w-20 h-24 object-cover border rounded-md cursor-pointer ${
                  i === selectedIndex ? "ring-2 ring-blue-400" : ""
                }`}
              />
            ))}
          </motion.div>
        </div>

        {/* Nút xuống */}
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
          key={selectedIndex}
          src={images[selectedIndex]}
          alt="main"
          initial={{ opacity: 0.8, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="max-w-full h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default ProductGallery;
