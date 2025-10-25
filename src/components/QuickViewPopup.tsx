import React from "react";
import { X } from "lucide-react";
import "../styles/components/QuickViewPopup.scss";

interface Product {
  id: number;
  name: string;
  image: string;
  hoverImage?: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  category?: string;
}

interface QuickViewPopupProps {
  product: Product;
  onClose: () => void;
}

const QuickViewPopup: React.FC<QuickViewPopupProps> = ({ product, onClose }) => {
  return (
    <div className="quickview-overlay" onClick={onClose}>
      <div className="quickview-popup" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <X size={22} />
        </button>
        <div className="quickview-content">
          <div className="quickview-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="quickview-details">
            <h2>{product.name}</h2>
            <p className="quickview-price">
              {product.oldPrice && (
                <span className="old-price">
                  {product.oldPrice.toLocaleString("vi-VN")}₫
                </span>
              )}
              <span className="current-price">
                {product.price.toLocaleString("vi-VN")}₫
              </span>
            </p>
            <p className="desc">
              Đây là phần mô tả nhanh của sản phẩm. Bạn có thể thay thế bằng nội dung thật
              từ dữ liệu JSON.
            </p>
            <button className="btn-view">Xem chi tiết sản phẩm</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewPopup;
