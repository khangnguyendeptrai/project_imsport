import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import DiscountBadge from "./DiscountBadge";
import { EyeIcon, MagnifyingGlassPlusIcon } from "@heroicons/react/24/outline";
import ProductAction from './ProductAction'

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
  { id: 9, image: khoacrun, imageHide: khoacrunhide, name: "Áo Khoác Chạy Bộ Nam On Running Men's Weather Jacket - Desert/Cinder", originalPrice: "7,060,000 VNĐ", price: "5,648,000 VNĐ", isDiscount: 20 },
  { id: 10, image: aotrail, imageHide: aotrailhide, name: "Áo Khoác Chống Nước Nam NNormal Trail Rain Jacket Black Men - Green", price: "6,360,000 VNĐ", originalPrice: "7,950,000 VNĐ", isDiscount: 20 },
  
];

// 👉 Tách nhóm sản phẩm
const newProducts = products.filter(p => p.isDiscount === 0);
const saleProducts = products.filter(p => p.isDiscount !== 0);

const ProductSlider = ({ title, items }) => {
  const [modalOpen, setModalOpen] = useState(false)

  const quickView = (id) => {
    console.log('quickView ', id)
    setModalOpen(true)
  }
  return (
    <>
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
        <div className="relative w-[95%] max-w-[2000px] hidden md:block">
          <Swiper
            modules={[Navigation, Autoplay]}
            slidesPerView={6}
            spaceBetween={10}
            loop={items.length > 6} // chỉ loop nếu >6 sản phẩm
            navigation={items.length > 6 ? { nextEl: ".next-btn", prevEl: ".prev-btn" } : false}
            autoplay={
              items.length > 6
                ? {
                  delay: 2500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
                : false
            }
            speed={300}
            allowTouchMove={items.length > 6}
            className="mySwiper"
          >
            {items.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="group relative overflow-hidden">
                  {item.isDiscount !== 0 && <DiscountBadge />}
                  <ProductAction product={item} quickView={quickView} />
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

          {/* ✅ Chỉ hiện navigation và che hai bên nếu có hơn 6 sản phẩm */}
          {items.length > 6 && (
            <>
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
      {modalOpen &&
        <>
          <div onClick={() => setModalOpen(false)} className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div onClick={(e) => e.stopPropagation()} className="bg-white  shadow-xl w-[90%] max-w-4xl -top-20  relative ">
              {/* Nút đóng */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute w-5 h-5 flex justify-center items-center font-bold top-3 right-3 text-white bg-[#673AB7] rounded-full text-xl"
              >
                &times;
              </button>
              <div className='grid grid-cols-1 min-[1000px]:grid-cols-2'>
                <div className='col-span-1 px-4'>
                  <a href='/'>
                    <img src={buckethat} alt="collection" className='w-full h-full object-cover' />
                  </a>
                </div>
                <div className='col-span-1 p-4'>
                  <h3>
                    <a href='/' className='text-[21px] font-normal text-center text-[#333333] hover:text-[#673AB7] my-1'>Áo Chạy Địa Hình Nam Raidlight Maillot de trail R-Light - KAKI</a>
                  </h3>
                  <div className='flex gap-2 divide-x-[1px] divide-[#898989] py-3'>
                    <p className='text-[#898989] text-sm'><span className='font-semibold'>Mã SP: </span> 39112612</p>
                    <p className='text-[#898989] text-sm pl-2'><span className='font-semibold'>Thương hiệu: </span> Raidlight</p>
                  </div>
                  <h3 className='text-[#858688] text-[22px] font-semibold mb-8'>1,850,000 VNĐ</h3>
                  <div className='flex gap-x-2 border-t border-gray-100 pt-4'>
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name="size"
                        value="S"
                        className="hidden peer"
                      />
                      <div className="border shadow-[0_0_0_1px_#B8B8B8] text-black h-[35px] w-[50px] text-sm flex justify-center items-center rounded peer-checked:shadow-[0_0_2px_2px_#FF7A00] hover:shadow-[0_0_2px_2px_#FF7A00] transition-colors duration-200">
                        S
                      </div>
                    </label>
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name="size"
                        value="M"
                        className="hidden peer"
                      />
                      <div className="border shadow-[0_0_0_1px_#B8B8B8] text-black h-[35px] w-[50px] text-sm flex justify-center items-center rounded peer-checked:shadow-[0_0_2px_2px_#FF7A00] hover:shadow-[0_0_2px_2px_#FF7A00] transition-colors duration-200">
                        M
                      </div>
                    </label>
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name="size"
                        value="L"
                        className="hidden peer"
                      />
                      <div className="border shadow-[0_0_0_1px_#B8B8B8] text-black h-[35px] w-[50px] text-sm flex justify-center items-center rounded peer-checked:shadow-[0_0_2px_2px_#FF7A00] hover:shadow-[0_0_2px_2px_#FF7A00] transition-colors duration-200">
                        L
                      </div>
                    </label>

                  </div>
                  <p className='text-[#333] font-normal text-sm mt-4'>Số lượng: </p>
                  <div className='flex gap-x-2 items-center mt-2'>
                    <div>
                      <input name='a' className='text-[#333] font-normal text-xs border px-5 w-[130px] py-2.5 text-center rounded-full' value="1" type="number" />
                    </div>
                    <div>
                      <button className='uppercase bg-[#673AB7] p-2.5 rounded-full text-white text-xs font-normal'>Thêm vào giỏ hàng</button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </>
      }
    </>
  );
}

const ProductsSection = () => {
  return (
    <>
      <ProductSlider title="Sản phẩm mới" items={newProducts} />
      <ProductSlider title="Sản phẩm sale off" items={saleProducts} />
    </>
  );
};

export default ProductsSection;
