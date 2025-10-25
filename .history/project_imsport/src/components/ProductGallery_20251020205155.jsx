import React, { useState, useRef } from "react";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const ProductGallery = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [mobileStart, setMobileStart] = useState(0);
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [lensPosition, setLensPosition] = useState({ left: 0, top: 0 });

  const visibleCount = 3;
  const itemHeight = 96;
  const mobileVisible = 4;
  const gap = 8;
  const totalHeight = visibleCount * itemHeight + (visibleCount - 1) * gap;

  const imgRef = useRef(null);
  const lensSize = 150;

  // PC thumbnail navigation
  const handlePrev = () => {
    if (startIndex > 0) setStartIndex((prev) => prev - 1);
  };
  const handleNext = () => {
    if (startIndex + visibleCount < images.length)
      setStartIndex((prev) => prev + 1);
  };

  // Mobile thumbnail navigation
  const handleMobilePrev = () => {
    if (mobileStart > 0) setMobileStart((s) => s - 1);
  };
  const handleMobileNext = () => {
    if (mobileStart + mobileVisible < images.length)
      setMobileStart((s) => s + 1);
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
    <div className="flex flex-col md:flex-row gap-4">
      {/* PC thumbnails */}
      <div className="hidden md:flex md:flex-col items-center gap-2">
        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          className={`transition-opacity duration-200 ${
            startIndex === 0 ? "opacity-40" : "opacity-100 hover:opacity-80"
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
          className={`transition-opacity duration-200 ${
            startIndex + visibleCount >= images.length
              ? "opacity-40"
              : "opacity-100 hover:opacity-80"
          }`}
        >
          <ChevronDownIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Main image (PC zoom) */}
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

      {/* MOBILE thumbnails */}
      <div className="md:hidden relative w-full mt-4">
        {/* Thumbnails container */}
        <div className="overflow-hidden w-full">
          <motion.div
            animate={{ x: -mobileStart * (100 / mobileVisible) + "%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex w-1"
          >
            {images.map((img, i) => (
              <div
                key={i}
                onClick={() => setSelectedIndex(i)}
                className="flex-shrink-0 w-1/4 aspect-square border border-gray-300 flex items-center justify-center bg-white"
              >
                <img
                  src={img}
                  alt={`mobile-thumb-${i}`}
                  className="w-[80%] h-[70%] object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Left arrow overlay */}
        {mobileStart > 0 && (
          <button
            onClick={handleMobilePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 z-10"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
        )}

        {/* Right arrow overlay */}
        {mobileStart + mobileVisible < images.length && (
          <button
            onClick={handleMobileNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 z-10"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductGallery;
