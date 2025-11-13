import React, { useState, useEffect } from 'react';
import ProductCard from "./ProductCard";
import '../styles/components/ProductCard.scss';

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { dataNew } from "../data/dataNew";
// console.log(dataNew);

const RelatedProducts = ({ currentProductId }) => { // <-- Chỉ nhận 1 prop
  
  const [filteredList, setFilteredList] = useState([]);

  // useEffect này sẽ chạy lại MỖI KHI 'currentProductId' thay đổi
  useEffect(() => {
    
    let parentCategoryOfProduct = null;

  for (const parentCat of dataNew) {
    if (parentCat.categories) {
      for (const subCat of parentCat.categories) {
        if (subCat.products) {
        
          // --- THAY THẾ .some() BẰNG for...of ---
          let found = false; // 1. Tạo biến cờ
          for (const p of subCat.products) { // 2. Lặp qua mảng
            // Sửa: Dùng == để so sánh lỏng (hoặc Number()) nếu có lỗi kiểu dữ liệu
            if (p.id == currentProductId) { 
              found = true; // 3. Đặt cờ là true
              break; // 4. Thoát lặp ngay lập tức
            }
          }
          // --- Hết phần thay thế ---

          if (found) { // 5. Sử dụng biến cờ
            parentCategoryOfProduct = parentCat; 
            break;
          }
        }
      }
    }
    if (parentCategoryOfProduct) break;
  }

    // --- 2. LẤY SẢN PHẨM LIÊN QUAN TỪ CHA ---
    if (parentCategoryOfProduct) {
      
      // Lấy TẤT CẢ sản phẩm từ các danh mục con của cha đó
      const allProducts = parentCategoryOfProduct.categories.flatMap(subCat => 
        subCat.products || []
      );

      
      // Lọc bỏ chính sản phẩm hiện tại
      const related = allProducts.filter(product => 
        product && product.id !== currentProductId
      );
      console.log(related);
      

      
      // 3. Cập nhật state
      setFilteredList(related);

    } else {
      setFilteredList([]); // Không tìm thấy sản phẩm
    }


  }, [currentProductId]); // <-- Chỉ phụ thuộc vào currentProductId


  // 4. Render
  if (!filteredList || filteredList.length === 0) {
    return null;
  }

  return (
    <section className="related-products">
      <h2 className="related-products__title">
        SẢN PHẨM LIÊN QUAN
      </h2>

      <Swiper
        navigation={false}
        loop={true} 
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

export default RelatedProducts