import React, { useState } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import imsports from "../assets/images/aotrail.jpeg";

const ProductInfo = ({ name, brand, code, price, sizes, highlights }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="w-full md:w-1/2 md:pl-10">
      {/* Tên sản phẩm */}
      <h1 className="text-2xl font-semibold mb-2 uppercase">{name}</h1>

      {/* Thương hiệu + Mã SP */}
      <p className="text-sm text-gray-600 mb-4">
        Thương hiệu:{" "}
        <span className="font-medium text-black">{brand}</span>{" "}
        <span className="mx-2">|</span> Mã SP:{" "}
        <span className="text-gray-700">{code}</span>
      </p>

      {/* Giá */}
      <p className="text-2xl font-semibold text-black mb-6">
        Giá:{" "}
        <span className="text-[#000]">
          {price.toLocaleString("vi-VN")} VNĐ
        </span>
      </p>

      {/* Chọn size */}
      <div className="mb-6">
        <p className="font-medium mb-2">Chọn size:</p>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`w-12 h-10 border text-sm font-medium transition-all 
                ${
                  selectedSize === size
                    ? "border-orange-500 text-orange-600"
                    : "border-gray-300 hover:border-orange-500"
                }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Số lượng + nút giỏ hàng + icon */}
      <div className="mb-8 flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="w-full md:w-auto">
          <p className="font-medium mb-2">Số lượng:</p>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full md:w-20 h-10 border border-gray-300 text-center outline-none focus:border-black"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none bg-[#673AB7] text-white px-8 py-3 rounded-full uppercase font-medium hover:bg-[#7e4fd1] transition-all cursor-pointer">
            Thêm vào giỏ hàng
          </button>

          <button className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:border-[#673AB7] hover:text-[#673AB7] transition-all cursor-pointer">
            <HeartIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Line phân cách */}
      <hr className="border-t border-black mb-4" />

      {/* Đặc điểm nổi bật */}
      <div>
        <h3 className="text-red-600 font-semibold mb-2">Đặc điểm nổi bật</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
          {highlights.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <img src={imsports} alt="imsports" className="w-28" />
      </div>
    </div>
  );
};

export default ProductInfo;
