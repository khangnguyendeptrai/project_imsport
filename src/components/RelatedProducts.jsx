// File: components/RelatedProducts.jsx

import React, { useState, useEffect } from 'react';
import ProductCard from "./ProductCard";
import '../styles/components/ProductCard.scss';

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

// 1. Import mảng 'product' phẳng (nguồn dữ liệu chính)
// Dùng 'as allProducts' để đổi tên, tránh trùng lặp với biến 'product' ở hàm filter
import { products as allProducts } from "../data/products";

// 2. Nhận cả 'currentProductId' và 'categoryId' từ props
const RelatedProducts = ({ currentProductId, categoryId }) => {

  const [filteredList, setFilteredList] = useState([]);

  // useEffect sẽ chạy lại mỗi khi sản phẩm chính (id) hoặc danh mục (category) thay đổi
  useEffect(() => {

    // 3. Nếu không có categoryId (ví dụ: sản phẩm không tồn tại),
    // thì set danh sách rỗng và thoát
    if (!categoryId) {
      setFilteredList([]);
      return;
    }

    // 4. Lọc trực tiếp trên mảng 'allProducts' (đã import)
    // KHÔNG cần dùng .find() nữa
    const related = allProducts.filter(product => {
      // Điều kiện 1: Phải cùng categoryId
      // (Dùng == để so sánh lỏng, an toàn cho cả string và number)
      // Điều kiện 2: Phải KHÁC sản phẩm hiện tại
      return (
        product.category_id == categoryId &&
        product.id != currentProductId
      );
    });

    // 5. Cập nhật state với danh sách đã lọc
    setFilteredList(related);

  }, [currentProductId, categoryId]); // 6. Phụ thuộc vào cả hai props


  // 7. Render: Nếu không có sản phẩm liên quan, không hiển thị gì cả
  if (!filteredList || filteredList.length === 0) {
    return null;
  }

  // 8. Hiển thị Swiper carousel
  return (
    <section className="related-products">
      <h2 className="related-products__title">
        SẢN PHẨM LIÊN QUAN
      </h2>
      <Swiper
        navigation={false}
        // Chỉ 'loop' khi số sản phẩm nhiều hơn số slide hiển thị
        loop={filteredList.length >= 4}
        spaceBetween={16}
        slidesPerView={2}
        breakpoints={{
          768: { slidesPerView: 3, spaceBetween: 24 },
          1024: { slidesPerView: 4, spaceBetween: 32 },
        }}
        className="related-products__carousel"
      >
        {filteredList.map((item) => (
          <SwiperSlide
            key={item.id}
            className="related-products__item"
          >
            <ProductCard item={item} isRelated={false} isList={true} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default RelatedProducts;