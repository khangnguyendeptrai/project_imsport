import React from "react";
import ProductCard from "./ProductCard";
import "../styles/components/RelatedProducts.scss";
const RelatedProducts = ({ relatedProducts, onProductClick }) => {
  if (!relatedProducts || relatedProducts.length === 0) return null;

  return (
    <div className="related-products container mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        SẢN PHẨM LIÊN QUAN
      </h2>

      <div className="product-grid grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">
        {relatedProducts.map((item, index) => (
          <div key={index} onClick={() => onProductClick(item)}>
            <ProductCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
