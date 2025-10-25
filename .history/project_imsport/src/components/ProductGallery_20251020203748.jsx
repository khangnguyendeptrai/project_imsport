import React, { useState, useRef } from "react";
import { ChevronUpIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const ProductGallery = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // desktop thumbnails state (giữ nguyên, không đổi)
  const [startIndex, setStartIndex] = useState(0);

  // mobile-specific thumbnails state (riêng, để chỉ ảnh mobile)
  const [mobileStart, setMobileStart] = useState(0);

  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [lensPosition, setLensPosition] = useState({ left: 0, top: 0 });

  const visibleCount = 3; // desktop vertical visible count
  const itemHeight = 96;
  const gap = 8;
  const totalHeight = visibleCount * itemHeight + (visibleCount - 1) * gap;

  const imgRef = useRef(null);
  const lensSize = 150; // kích thước ô vuông mờ

  // --- desktop handlers (giữ nguyên) ---
  const handlePrev = () => {
    if (startIndex > 0) setStartIndex((prev) => prev - 1);
  };
  const handleNext = () => {
    if (startIndex + visibleCount < images.length) setStartIndex((prev) => prev + 1);
  };

  // --- mobile handlers (riêng) ---
  const mobileVisible = 4; // *YÊU CẦU*: mobile show 4 thumbs at a time
  const handleMobilePrev = () => {
    if (mobileStart > 0) setMobileStart((s) => s - 1);
  };
  const handleMobileNext = () => {
    if (mobileStart + mobileVisible < images.length) setMobileStart((s) => s + 1);
  };

  const handleMouseMove = (e) => {
    if (!imgRef.current) return;
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
      {/* ----------------------------
          Desktop thumbnails (vertical)
          ---------------------------- */}
      <div className="hidden md:flex md:flex-col items-center gap-2">
        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          className={`transition-opacity duration-200 ${startIndex === 0 ? "opacity-40" : "opacity-100 hover:opacity-80"}`}
        >
          <ChevronUpIcon className="h-5 w-5" />
        </button>

        <div className="overflow-hidden flex md:flex-col w-[100px]" style={{ height: totalHeight }}>
          <motion.div
            animate={{ y: -startIndex * (itemHeight + gap) }}
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

      {/* ----------------------------
          Main image (keeps zoom behavior)
          ---------------------------- */}
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

        {/* Lens (desktop only) */}
        {showZoom && (
          <div
            className="absolute border border-gray-600 bg-gray-300/20 pointer-events-none hidden md:block"
            style={{
              width: `${lensSize}px`,
              height: `${lensSize}px`,
              left: `${lensPosition.left}px`,
              top: `${lensPosition.top}px`,
            }}
          />
        )}

        {/* Zoom preview (desktop only) */}
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

      {/* ----------------------------
          MOBILE thumbnails block (ONLY mobile) 
          - shows 4 thumbnails per view
          - arrows left/right to shift window by 1
          ---------------------------- */}
      <div className="md:hidden w-full mt-4">
        <div className="flex items-center justify-between px-2">
          <button
            onClick={handleMobilePrev}
            disabled={mobileStart === 0}
            className={`p-2 rounded-full  "opacity-40" : "opacity-100 hover:bg-gray-100"}`}
            aria-label="previous thumbnails"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>

          {/* visible area */}
          <div className="overflow-hidden flex-1 mx-2">
            <motion.div
              animate={{ x: -mobileStart * (96 + gap) }} // 96 = approx thumbnail width used below (w-24 = 96px)
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="flex gap-2"
              style={{ width: `${images.length * (96 + gap)}px` }}
            >
              {images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedIndex(i)}
                  className={`w-24 h-24 border ${i === selectedIndex ? "border-gray-600" : "border-gray-200"} cursor-pointer flex items-center justify-center bg-white`}
                >
                  <img src={img} alt={`mobile-thumb-${i}`} className="w-[80%] h-[70%] object-contain" />
                </div>
              ))}
            </motion.div>
          </div>

          <button
            onClick={handleMobileNext}
            disabled={mobileStart + mobileVisible >= images.length}
            className={`p-2 rounded-full "opacity-40" : "opacity-100 hover:bg-gray-100"}`}
            aria-label="next thumbnails"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>

        {/* pagination hint (optional): shows "x / y groups" */}
        <div className="text-xs text-center text-gray-500 mt-2">
          {Math.min(mobileStart + 1, images.length)} - {Math.min(mobileStart + mobileVisible, images.length)} / {images.length}
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
