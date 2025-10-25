import React, { useState } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import imsports from "../assets/imsports.png"; // logo thương hiệu demo

const ProductInfo = ({ name, brand, code, price, sizes, highlights }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="w-full md:w-1/2">
      <h1 className="text-2xl font-semibold mb-2">{name}</h1>
      <p className="text-sm text-gray-600 mb-4">
        Thương hiệu: <span className="font-medium text-black">{brand}</span> | Mã SP:{" "}
        <span className="text-gray-700">{code}</span>
      </p>

      <p className="text-2xl font-semibold text-black mb-6">Giá: {price}</p>

      <div className="mb-6">
        <p className="font-medium mb-2">Chọn size:</p>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`w-12 h-10 border rounded-md text-sm font-medium ${
                selectedSize === size
                  ? "border-[#673AB7] bg-[#673AB7] text-white"
                  : "border-gray-300 hover:border-[#673AB7]"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8 flex items-center gap-4">
        <div>
          <p className="font-medium mb-2">Số lượng:</p>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-20 h-10 border border-gray-300 rounded-md text-center"
          />
        </div>

        <button className="bg-[#673AB7] text-white px-8 py-3 rounded-full uppercase font-medium hover:bg-[#7e4fd1] transition-all">
          Thêm vào giỏ hàng
        </button>

        <button className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:border-[#673AB7] hover:text-[#673AB7] transition-all">
          <HeartIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="border-t pt-4">
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
