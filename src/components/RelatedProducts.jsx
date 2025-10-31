import React from "react";
import ProductCard from "./ProductCard";
import '../styles/components/ProductCard.scss';

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

// === 1. GỠ BỎ 'onProductClick' KHỎI PROPS ===
const RelatedProducts = ({ relatedProducts, currentProductId, currentProductCategory }) => {

  const filteredList = relatedProducts.filter(item => 
    item.id !== currentProductId && 
    item.category === currentProductCategory
  );

  if (!filteredList || filteredList.length === 0) return null;

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
            // === 2. GỠ BỎ 'onClick' KHỎI SLIDE ===
            // onClick={() => onProductClick(item)} // <-- XÓA DÒNG NÀY
          >
            {/* Bây giờ, SwiperSlide sẽ không xử lý click nữa.
              Nó sẽ để cho <ProductCard> bên trong tự xử lý.
            */}
            <ProductCard item={item} isRelated={false}  isList={true} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default RelatedProducts;