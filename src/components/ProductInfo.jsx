import React, { useState, useEffect } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useCart } from "../context/CartContext";

import { useNavigate } from "react-router-dom";



const ProductInfo = ({ product, sizes, highlights }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const isAddToCartDisabled = !selectedSize || quantity <= 0;

  const handleAddToCart = (product) => {
    if (isAddToCartDisabled) return;

    console.log('handleAddToCart ', {...product, quantity: quantity });
    addToCart({ ...product, quantity: quantity });
    navigate('/cart');

  }
  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', 'VNĐ');
  }
  return (
    <div className="w-full md:w-[90%] text-gray-800">
      {/* Tên sản phẩm */}
      <h1 className="text-2xl font-semibold mb-3 break-words leading-snug">
        {product?.name}
      </h1>

      {/* Thương hiệu + Mã sản phẩm */}
      <p className="text-sm  mb-4 border-b border-gray-200 mb-6 pb-5">
        Thương hiệu:{" "}
        <span className="text-[#898989]">{product?.brand}</span> | Mã SP:{" "}
        <span className="text-[#898989]">{product?.id}</span>
      </p>

      {/* Giá */}
      <p className=" text-black pb-4 ">
        Giá: <span className=" text-2xl">{formatPrice(Number(product?.price))}</span>
      </p>

      {/* Chọn size (Giữ nguyên logic hiển thị) */}
      <div className="mb-6">
        <p className="font-medium mb-3">Chọn size:</p>
        <div className="flex flex-wrap gap-4 relative">
          {sizes.map((size) => (
            <div
              key={size}
              className="relative flex flex-col items-center group"
            >
              {/* Bong bóng hiển thị khi hover hoặc chọn */}
              {!isMobile && (
                <>
                  {selectedSize === size && (
                    <div className="absolute -top-11 flex flex-col items-center animate-fadeIn">
                      <div className="bg-black text-white text-xs font-medium px-2 py-1 rounded-md relative w-14 text-center whitespace-nowrap">
                        {size}
                        <span className="absolute left-1/2 -bottom-[5px] -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black"></span>
                      </div>
                    </div>
                  )}

                  {selectedSize !== size && (
                    <div className="absolute -top-11 hidden group-hover:flex flex-col items-center animate-fadeIn">
                      <div className="bg-black text-white text-xs font-medium px-2 py-1 rounded-md relative w-14 text-center whitespace-nowrap">
                        {size}
                        <span className="absolute left-1/2 -bottom-[5px] -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black"></span>
                      </div>
                    </div>
                  )}
                </>
              )}
              {/* Ô chọn size */}
              <button
                onClick={() => setSelectedSize(size)}
                className={`w-14 h-10 border text-sm font-medium transition-all duration-200 text-center
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
      <div className="pb-6 border-gray-200 mb-6 flex flex-wrap items-center gap-4">
        <div className="w-full sm:w-auto">
          <p className="font-medium mb-2">Số lượng:</p>
          {/* --- THAY ĐỔI 3: Cải thiện Input Số lượng --- */}
          <input
            type="number"
            min="1"
            value={quantity}
            // Logic để đảm bảo số lượng luôn >= 1
            onChange={(e) =>
              setQuantity(Math.max(1, parseInt(e.target.value) || 1))
            }
            onFocus={(e) => e.target.select()} // Thêm để dễ chỉnh sửa
            className="w-full sm:w-20 h-10 border border-gray-300 rounded-full text-center"
          />
        </div>

        <div className="w-full sm:w-auto flex justify-center sm:justify-start gap-4 sm:mt-6">
          {/* --- THAY ĐỔI 4: Áp dụng Logic cho Nút --- */}
          <button
            className="bg-[#673AB7] text-white px-8 py-3 rounded-full uppercase font-medium hover:bg-[#7e4fd1] transition-all disabled:opacity-50 disabled:cursor-not-allowed" // Thêm class disabled
            onClick={handleAddToCart} // Thêm onClick
            disabled={isAddToCartDisabled} // Thêm trạng thái disabled
          >
            Thêm vào giỏ hàng
          </button>

          <button className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center transition-all">
            <HeartIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Đặc điểm nổi bật (Giữ nguyên) */}
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