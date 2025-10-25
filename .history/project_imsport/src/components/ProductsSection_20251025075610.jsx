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

 

const ProductsSection = () => {
  return (
    <>
      <ProductSlider title="Sản phẩm mới" items={newProducts} />
      <ProductSlider title="Sản phẩm sale off" items={saleProducts} />
    </>
  );
};

export default ProductsSection;
