import React, { useState } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import imsports from "../assets/images/aotrail.jpeg";

const ProductInfo = ({ name, brand, code, price, sizes, highlights }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="w-full md:w-1/2 flex flex-col justify-between h-full md:min-h-[520px]">
      <div className="space-y-6">
        {/* Tên sản phẩm */}
        <div>
          <h1 className="text-2xl font-semibold mb-2 leading-snug">{name}</h1>
          <p className="text-sm text-gray-600">
            Thương hiệu: <span className="font-medium text-black">{brand}</span> | Mã SP:{" "}
            <span className="text-gray-700">{code}</span>
          </p>
        </div>

        {/* Giá */}
        <p className="text-2xl font-semibold text-black">Giá: {price}</p>

        {/* Size chọn */}
        <div>
          <p className="font-medium mb-2">Chọn size:</p>
          <div className="flex flex-wrap gap-3">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-12 h-10 border text-sm font-medium transition-all duration-200
                  ${
                    selectedSize === size
                      ? "border-[#FF9800] text-[#FF9800]"
                      : "border-gray-300 hover:border-[#FF9800]"
                  }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Số lượng + nút */}
        <div className="flex items-center flex-wrap gap-4">
          <div>
            <p className="font-medium mb-2">Số lượng:</p>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-20 h-10 border border-gray-300 text-center"
            />
          </div>

          <button className="bg-[#673AB7] text-white px-8 py-3 rounded-full uppercase font-medium hover:bg-[#7e4fd1] transition-all">
            Thêm vào giỏ hàng
          </button>

          <button className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:border-[#673AB7] hover:text-[#673AB7] transition-all">
            <HeartIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Đặc điểm nổi bật */}
      <div className="border-t pt-4 mt-6">
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
