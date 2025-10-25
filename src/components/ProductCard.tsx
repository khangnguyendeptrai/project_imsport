import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Search } from "lucide-react";
import QuickViewPopup from "./QuickViewPopup";
import "../styles/components/ProductCard.scss";

interface Product {
  id: number;
  name: string;
  image: string;
  hoverImage?: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  badge?: string;
  category?: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);

  const discountPercent =
    product.oldPrice && product.price < product.oldPrice
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : product.discount;

  return (
    <>
      <div
        className="product-card"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Ảnh sản phẩm */}
        <div className="product-image">
          {/*  Bọc ảnh bằng Link để khi click vào sẽ đi đến trang chi tiết */}
          <Link to={`/product/${product.id}`}>
            <img
              src={hovered && product.hoverImage ? product.hoverImage : product.image}
              alt={product.name}
            />
          </Link>

          {/* Icon giảm giá / badge */}
          {discountPercent && (
            <span className="badge discount">-{discountPercent}%</span>
          )}
          {product.badge && <span className="badge special">{product.badge}</span>}

          {/* Icon hover */}
          <div className={`hover-icons ${hovered ? "show" : ""}`}>
            <button
              className="icon-btn"
              onClick={() => setShowQuickView(true)}
              title="Xem nhanh"
            >
              <Search size={20} />
            </button>
            <Link to={`/product/${product.id}`} className="icon-btn" title="Xem chi tiết">
              <Eye size={20} />
            </Link>
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
         <div className="product-price">
  <span className="current-price">
    {product.price.toLocaleString("vi-VN")} VND
  </span>
  {product.oldPrice && (
    <span className="old-price">
      {product.oldPrice.toLocaleString("vi-VN")} VND 
    </span>
  )}
</div>

        </div>
      </div>

      {/* Popup Xem nhanh */}
      {showQuickView && (
        <QuickViewPopup product={product} onClose={() => setShowQuickView(false)} />
      )}
    </>
  );
};

export default ProductCard;
