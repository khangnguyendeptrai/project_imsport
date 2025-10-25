import React, { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

const ProductGallery = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3; // hiển thị 3 ảnh nhỏ

  const handlePrev = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  const handleNext = () => {
    if (startIndex + visibleCount < images.length)
      setStartIndex(startIndex + 1);
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

        <div className="flex md:flex-col gap-2">
          {images.slice(startIndex, startIndex + visibleCount).map((img, i) => {
            const actualIndex = startIndex + i;
            return (
              <img
                key={i}
                src={img}
                alt={`thumb-${i}`}
                onClick={() => setSelectedIndex(actualIndex)}
                className={`w-20 h-20 md:w-24 md:h-24 object-cover border rounded-md cursor-pointer transition-all ${
                  actualIndex === selectedIndex
                    ? "border-[#673AB7]"
                    : "border-gray-200 hover:border-[#673AB7]"
                }`}
              />
            );
          })}
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
        <img
          src={images[selectedIndex]}
          alt="main"
          className="max-w-full h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default ProductGallery;
