import React, { useState } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";

const ProductInfo = ({ name, brand, code, price, sizes, highlights }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="w-full md:w-[90%] text-gray-800">
      {/* Tên sản phẩm */}
      <h1 className="text-2xl font-semibold mb-3 break-words leading-snug">
        {name}
      </h1>

      {/* Thương hiệu + Mã sản phẩm */}
      <p className="text-sm text-gray-600 mb-4">
        Thương hiệu:{" "}
        <span className="font-medium text-[#673AB7]">{brand}</span> | Mã SP:{" "}
        <span className="text-gray-700">{code}</span>
      </p>

      {/* Giá */}
      <p className="text-2xl font-semibold text-black pb-4 border-b border-gray-200 mb-6">
        Giá: {price}
      </p>

      {/* Chọn size */}
      <div className="mb-6">
        <p className="font-medium mb-3">Chọn size:</p>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`w-12 h-10 border text-sm font-medium transition-all duration-150 ${
                selectedSize === size
                  ? "border-[#673AB7] text-[#673AB7] font-semibold"
                  : "border-gray-300 hover:border-[#673AB7]"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Số lượng + Nút giỏ hàng */}
      <div className="pb-6 border-b border-gray-200 mb-6 flex items-center gap-4 flex-wrap">
        <div>
          <p className="font-medium mb-2">Số lượng:</p>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-20 h-10 border border-gray-300 rounded-full text-center"
          />
        </div>

        <button className="bg-[#673AB7] text-white px-8 py-3 rounded-full uppercase font-medium hover:bg-[#7e4fd1] transition-all">
          Thêm vào giỏ hàng
        </button>

        <button className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:border-[#673AB7] hover:text-[#673AB7] transition-all">
          <HeartIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Đặc điểm nổi bật */}
      <div className="pt-2 border-t border-gray-200">
        <h3 className="text-red-600 font-semibold mb-3">Đặc điểm nổi bật</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
          {highlights.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        <p className="text-gray-600 text-sm">Thông tin thêm về sản phẩm</p>
      </div>
    </div>
  );
};

export default ProductInfo;
