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

  {/* Khung chứa các ô size */}
  <div className="flex flex-wrap gap-4 relative">
    {sizes.map((size) => (
      <div key={size} className="relative flex flex-col items-center">
        {/* Bong bóng hiển thị khi được chọn */}
        {selectedSize === size && (
          <div className="absolute -top-10 flex flex-col items-center animate-fadeIn">
            <div className="bg-black text-white text-xs font-medium px-2 py-1 rounded-md relative">
              {size}
              {/* Mũi nhọn hướng xuống */}
              <span className="absolute left-1/2 -bottom-[5px] -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black"></span>
            </div>
          </div>
        )}

        {/* Nút chọn size */}
        <button
          onClick={() => setSelectedSize(size)}
          className={`w-12 h-10 border text-sm font-medium rounded-md transition-all duration-200
            ${
              selectedSize === size
                ? "border-[#FF9800] text-[#FF9800] font-semibold shadow-md shadow-orange-200"
                : "border-gray-300 text-gray-700 hover:border-[#FF9800] hover:text-[#FF9800]"
            }`}
        >
          {size}
        </button>
      </div>
    ))}
  </div>
</div>

      {/* Số lượng + Nút giỏ hàng */}
      <div className="pb-6 border-gray-200 mb-6 flex items-center gap-4 flex-wrap">
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

        <div className="flex items-center gap-x-4 mt-10">
          <button className="bg-[#673AB7] text-white px-8 py-3 rounded-full uppercase font-medium hover:bg-[#7e4fd1] transition-all">
            Thêm vào giỏ hàng
          </button>

          <button className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center  transition-all">
            <HeartIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="pt-2 border-t border-gray-200">
        <h3 className="text-red-600 font-semibold mb-3">Đặc điểm nổi bật</h3>
        <ul className="text-gray-700 space-y-1 mb-4">
          {highlights.map((item, i) => (
            <li
              key={i}
              className="relative pl-4 before:content-['-'] before:absolute before:left-0 before:"
            >
              {item}
            </li>
          ))}
        </ul>


        <p className="text-gray-600 text-sm">Thông tin thêm về sản phẩm</p>
      </div>

    </div>
  );
};

export default ProductInfo;
