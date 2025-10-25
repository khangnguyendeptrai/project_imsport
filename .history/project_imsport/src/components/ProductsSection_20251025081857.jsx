import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import DiscountBadge from "./DiscountBadge";
import { EyeIcon, MagnifyingGlassPlusIcon } from "@heroicons/react/24/outline";

import {
  buckethat, buckethathide,
  giaykje, giaykjehide,
  giayhoka, giayhokahide,
  thunnam, thunnamhide,
  giaycloudbom, giaycloudbomhide,
  giaymafe, giaymafehide,
  giaynam, giaynamhide,
  khoacnu, khoacnuhide,
  khoacrun, khoacrunhide,
  aotrail, aotrailhide
} from "../assets/ExportImage";

const products = [
  { id: 1, image: buckethat, imageHide: buckethathide, name: "Bucket Hat | Mũ Chạy Bộ Rộng Vành Fractel B-Series - Sprout", price: "5,950,000 VNĐ", isDiscount: 0 },
  { id: 2, image: giaykje, imageHide: giaykjehide, name: "Kjerag 02 | Giày Chạy Địa Hình Nam NNormal Kjerag 02 - Black", price: "7,050,000 VNĐ", isDiscount: 0 },
  { id: 3, image: giayhoka, imageHide: giayhokahide, name: "Mafate 5 | Giày Chạy Địa Hình Nữ Hoka Mafate 5 - NNR", price: "7,050,000 VNĐ", isDiscount: 0 },
  { id: 4, image: thunnam, imageHide: thunnamhide, name: "Áo Chạy Bộ Nam On Running Men's Pace Mesh-T - Black/Horizon", price: "2,649,000 VNĐ", isDiscount: 0 },
  { id: 5, image: giaycloudbom, imageHide: giaycloudbomhide, name: "Giày Chạy Bộ Nam On Running Cloudboom Max - Lime/Raspberry", price: "6,675,000 VNĐ", isDiscount: 0 },
  { id: 6, image: giaymafe, imageHide: giaymafehide, name: "Mafate 5 | Giày Chạy Địa Hình Nam Hoka Mafate 5 - SWRD", price: "4,599,000 VNĐ", isDiscount: 0 },
  { id: 7, image: giaynam, imageHide: giaynamhide, name: "Giày Chạy Bộ Nam On Running Cloudboom Max - White/Black", price: "6,675,000 VNĐ", isDiscount: 0 },
  { id: 8, image: khoacnu, imageHide: khoacnuhide, name: "Áo Khoác Chạy Bộ Nữ On Running Women's Weather Jacket - Nimbus/Lilac", price: "7,060,000 VNĐ", isDiscount: 0 },
  { id: 9, image: khoacrun, imageHide: khoacrunhide, name: "Áo Khoác Chạy Bộ Nam On Running Men's Weather Jacket - Desert/Cinder", originalPrice: "7,060,000 VNĐ", price: "5,648,000 VNĐ", isDiscount: 20 },
  { id: 10, image: aotrail, imageHide: aotrailhide, name: "Áo Khoác Chống Nước Nam NNormal Trail Rain Jacket Black Men - Green", price: "6,360,000 VNĐ", originalPrice: "7,950,000 VNĐ", isDiscount: 20 },
  
];

// 👉 Tách nhóm sản phẩm
const newProducts = products.filter(p => p.isDiscount === 0);
const saleProducts = products.filter(p => p.isDiscount !== 0);

const ProductSlider = ({ title, items }) => (
  <div className="w-full flex flex-col items-center py-10 overflow-hidden">
    <h3 className="text-2xl uppercase font-semibold text-center mt-10 mb-10">{title}</h3>

    {/* --- Mobile grid --- */}
    <div className="grid grid-cols-2 gap-4 px-4 md:hidden">
      {items.map((item) => (
        <div key={item.id} className="group relative overflow-hidden">
          {item.isDiscount !== 0 && <DiscountBadge />}
          <div className="relative">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-auto object-cover group-hover:scale-0 transition-all duration-500"
            />
            <img
              src={item.imageHide}
              alt={item.name}
              className="w-full h-auto object-cover absolute top-0 right-full group-hover:right-0 transition-all duration-500"
            />
          </div>
          <div className="px-2 pb-4 mt-2 text-center">
            <a href={`/product/${item.id}`} className="line-clamp-2 font-semibold text-sm">
              {item.name}
            </a>
            {item.isDiscount !== 0 && item.originalPrice && (
              <p className="text-sm text-[#adadad] line-through">{item.originalPrice}</p>
            )}
          </div>
        </div>
      ))}
    </div>

    {/* --- Desktop Swiper carousel --- */}
    {/* --- Desktop Swiper carousel --- */}
<div className="relative w-[95%] max-w-[2000px] hidden md:block">

  {/* 👉 Nếu ít hoặc bằng 6 sản phẩm thì hiển thị canh giữa, không dùng Swiper */}
  {items.length <= 6 && (
    <div className="flex justify-center gap-6 flex-wrap">
      {items.map((item) => (
        <div key={item.id} className="group relative w-[200px] overflow-hidden">
          {item.isDiscount !== 0 && <DiscountBadge />}
          <a href={`/product/${item.id}`} className="block relative overflow-hidden">
            <div className="relative w-full aspect-[1/1.1] overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-auto object-cover group-hover:scale-0 transition-all duration-500"
              />
              <img
                src={item.imageHide}
                alt={item.name}
                className="w-full h-auto object-cover absolute top-0 right-full group-hover:right-0 transition-all duration-500"
              />
            </div>
          </a>
          <div className="px-1 pb-2 mt-2 text-center">
            <a
              href={`/product/${item.id}`}
              className="line-clamp-2 font-medium text-sm"
              title={item.name}
            >
              {item.name}
            </a>
            {item.isDiscount !== 0 && item.originalPrice && (
              <p className="text-xs text-[#adadad] line-through mt-1">
                {item.originalPrice}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )}

  {/* 👉 Nếu nhiều hơn 6 sản phẩm thì hiển thị Swiper đầy đủ + vùng mờ + nút chuyển */}
  {items.length > 6 && (
    <>
      <Swiper
        modules={[Navigation, Autoplay]}
        slidesPerView={6}
        spaceBetween={10}
        loop={true}
        navigation={{ nextEl: ".next-btn", prevEl: ".prev-btn" }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={300}
        className="mySwiper"
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="group relative overflow-hidden">
              {item.isDiscount !== 0 && <DiscountBadge />}
              <a href={`/product/${item.id}`} className="block relative overflow-hidden">
                <div className="relative w-full aspect-[1/1.1] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-auto object-cover group-hover:scale-0 transition-all duration-500"
                  />
                  <img
                    src={item.imageHide}
                    alt={item.name}
                    className="w-full h-auto object-cover absolute top-0 right-full group-hover:right-0 transition-all duration-500"
                  />
                </div>
              </a>
              <div className="px-1 pb-2 mt-2 text-center">
                <a
                  href={`/product/${item.id}`}
                  className="line-clamp-2 font-medium text-sm"
                  title={item.name}
                >
                  {item.name}
                </a>
                {item.isDiscount !== 0 && item.originalPrice && (
                  <p className="text-xs text-[#adadad] line-through mt-1">
                    {item.originalPrice}
                  </p>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ✅ Giữ vùng mờ và nút điều hướng */}
      <button className="prev-btn absolute left-[17%] top-1/3 -translate-y-1/2 bg-[#ff6a00] hover:bg-[#ff8533] text-white w-8 h-8 rounded-full shadow-md z-10">
        {"<"}
      </button>
      <button className="next-btn absolute right-[17%] top-1/3 -translate-y-1/2 bg-[#ff6a00] hover:bg-[#ff8533] text-white w-8 h-8 rounded-full shadow-md z-10">
        {">"}
      </button>

      <div className="pointer-events-none absolute top-0 left-0 h-full w-[16%] bg-white/80 z-10"></div>
      <div className="pointer-events-none absolute top-0 right-0 h-full w-[16%] bg-white/80 z-10"></div>
    </>
  )}
</div>

  </div>
);

const ProductsSection = () => {
  return (
    <>
      <ProductSlider title="Sản phẩm mới" items={newProducts} />
      <ProductSlider title="Sản phẩm sale off" items={saleProducts} />
    </>
  );
};

export default ProductsSection;
