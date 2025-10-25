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
      <p className="text-sm  mb-4 border-b border-gray-200 mb-6 pb-5">
        Thương hiệu:{" "}
        <span className="text-[#898989]">{brand}</span> | Mã SP:{" "}
        <span className="text-[#898989]">{code}</span>
      </p>

      {/* Giá */}
      <p className=" text-black pb-4 ">
        Giá: <span className=" text-2xl">{price}</span>
      </p>

      {/* Chọn size */}
      <div className="mb-6">
        <p className="font-medium mb-3">Chọn size:</p>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`w-12 h-10 border text-sm font-medium transition-all duration-200 rounded-md
                ${selectedSize === size
                  ? "border-[#FF9800] text-[#FF9800] font-semibold"
                  : "border-gray-300 text-gray-700 hover:border-[#FF9800] hover:text-[#FF9800]"
                } focus:outline-none focus:border-[#FF9800]`}
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
  <h3 className="text-[#FF9800] font-semibold mb-3">Đặc điểm nổi bật</h3>
  <ul className="text-gray-700 space-y-1 mb-4">
    {highlights.map((item, i) => (
      <li key={i} className="flex items-start">
        <span className="mr-2 text-[#FF9800]">–</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>

  <p className="text-gray-600 text-sm">Thông tin thêm về sản phẩm</p>
</div>
}
  );
};

export default ProductInfo;
