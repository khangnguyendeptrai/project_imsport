import React, { useState, useRef } from "react";
import { ChevronUpIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const ProductGallery = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [lensPosition, setLensPosition] = useState({ left: 0, top: 0 });

  const visibleCount = 3; // desktop: 3 ảnh dọc
  const visibleCountMobile = 4; // mobile: 4 ảnh ngang
  const itemSize = 96;
  const gap = 8;
  const totalHeight = visibleCount * itemSize + (visibleCount - 1) * gap;
  const totalWidth = visibleCountMobile * itemSize + (visibleCountMobile - 1) * gap;

  const imgRef = useRef(null);
  const lensSize = 150;

  const handlePrev = () => {
    if (window.innerWidth < 768) {
      if (startIndex > 0) setStartIndex((prev) => prev - 1);
    } else {
      if (startIndex > 0) setStartIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (window.innerWidth < 768) {
      if (startIndex + visibleCountMobile < images.length)
        setStartIndex((prev) => prev + 1);
    } else {
      if (startIndex + visibleCount < images.length)
        setStartIndex((prev) => prev + 1);
    }
  };

  const handleMouseMove = (e) => {
    const rect = imgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const left = Math.max(0, Math.min(x - lensSize / 2, rect.width - lensSize));
    const top = Math.max(0, Math.min(y - lensSize / 2, rect.height - lensSize));

    setLensPosition({ left, top });
    setZoomPosition({
      x: ((x / rect.width) * 100).toFixed(2),
      y: ((y / rect.height) * 100).toFixed(2),
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
      {/* --- Desktop thumbnails (vertical) --- */}
      <div className="hidden md:flex flex-col items-center gap-2">
        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          className={`transition-opacity duration-200 ${startIndex === 0 ? "opacity-40" : "opacity-100 hover:opacity-80"}`}
        >
          <ChevronUpIcon className="h-5 w-5" />
        </button>

        <div className="overflow-hidden flex md:flex-col w-[100px]" style={{ height: totalHeight }}>
          <motion.div
            animate={{ y: -startIndex * (itemSize + gap) }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="flex md:flex-col gap-2"
          >
            {images.map((img, i) => (
              <div
                key={i}
                onClick={() => setSelectedIndex(i)}
                className={`w-21 h-24 border ${i === selectedIndex ? "border-gray-600" : "border-gray-200"} cursor-pointer flex items-center justify-center`}
              >
                <img src={img} alt={`thumb-${i}`} className="w-[80%] h-[70%] object-contain" />
              </div>
            ))}
          </motion.div>
        </div>

        <button
          onClick={handleNext}
          disabled={startIndex + visibleCount >= images.length}
          className={`transition-opacity duration-200 ${startIndex + visibleCount >= images.length ? "opacity-40" : "opacity-100 hover:opacity-80"}`}
        >
          <ChevronDownIcon className="h-5 w-5" />
        </button>
      </div>

      {/* --- Main Image + Zoom (desktop only) --- */}
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

        {/* Lens on hover */}
        {showZoom && (
          <div
            className="absolute border border-gray-700 bg-gray-100/20 pointer-events-none"
            style={{
              width: `${lensSize}px`,
              height: `${lensSize}px`,
              left: `${lensPosition.left}px`,
              top: `${lensPosition.top}px`,
            }}
          />
        )}

        {/* Zoomed image */}
        {showZoom && (
          <div
            className="hidden md:block absolute right-[-70%] top-15 w-[350px] h-[400px] border-2 border-gray-700 bg-white overflow-hidden z-10"
            style={{
              backgroundImage: `url(${images[selectedIndex]})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "200%",
              backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
            }}
          />
        )}
      </div>

      {/* --- Mobile thumbnails (horizontal) --- */}
      <div className="flex md:hidden flex-col items-center w-full mt-3">
        <div className="flex items-center justify-center gap-2 w-full">
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className={`p-2 rounded-full border ${startIndex === 0 ? "opacity-40" : "opacity-100 hover:bg-gray-100"}`}
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>

          <div className="overflow-hidden w-[85%]" style={{ width: totalWidth }}>
            <motion.div
              animate={{ x: -startIndex * (itemSize + gap) }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="flex gap-2"
            >
              {images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedIndex(i)}
                  className={`w-24 h-24 border ${i === selectedIndex ? "border-gray-600" : "border-gray-200"} cursor-pointer flex items-center justify-center`}
                >
                  <img src={img} alt={`thumb-${i}`} className="w-[80%] h-[70%] object-contain" />
                </div>
              ))}
            </motion.div>
          </div>

          <button
            onClick={handleNext}
            disabled={startIndex + visibleCountMobile >= images.length}
            className={`p-2 rounded-full border ${startIndex + visibleCountMobile >= images.length ? "opacity-40" : "opacity-100 hover:bg-gray-100"}`}
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
