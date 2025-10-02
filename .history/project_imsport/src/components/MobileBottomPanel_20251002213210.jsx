import React from "react";
import { Link } from "react-router-dom";
import { FaTags, FaShoppingCart, FaGift } from "react-icons/fa6"; // đổi FaStar -> FaGift
import "../styles/components/MobileBottomPanel.scss";

const MobileBottomPanel = () => {
  return (
    <div className="mobile-bottom-panel">
      <Link to="/new" className="panel-btn">
        <FaGift className="panel-icon" />   {/* icon hộp quà */}
        <span>Hàng mới</span>
      </Link>
      <Link to="/promotions" className="panel-btn">
        <FaTags className="panel-icon" />
        <span>Khuyến mãi</span>
      </Link>
      <Link to="/cart" className="panel-btn">
        <FaShoppingCart className="panel-icon" />
        <span>Giỏ hàng</span>
      </Link>
    </div>
  );
};

export default MobileBottomPanel;
