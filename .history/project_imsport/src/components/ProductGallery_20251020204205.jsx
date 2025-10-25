import React, { useState, useRef } from "react";
import { ChevronUpIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const ProductGallery = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mobileStart, setMobileStart] = useState(0);
  const imgRef = useRef(null);

  const mobileVisible = 4;
  const gap = 8;

  const handleMobilePrev = () => {
    if (mobileStart > 0) setMobileStart((s) => s - 1);
  };
  const handleMobileNext = () => {
    if (mobileStart + mobileVisible < images.length) setMobileStart((s) => s + 1);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Ảnh chính */}
      <div className="w-full flex justify-center">
        <img
          ref={imgRef}
          src={images[selectedIndex]}
          alt="main"
          className="w-full max-h-[400px] object-contain rounded-md bg-white"
        />
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
  );
};

export default ProductGallery;
