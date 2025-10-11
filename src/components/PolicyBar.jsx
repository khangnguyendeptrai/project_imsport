// Import React để dùng JSX
import React from 'react';

// Import file CSS (SCSS) riêng cho PolicyBar
import "../styles/components/PolicyBar.scss";

// Import các icon cần dùng từ thư viện react-icons
import { FaCar, FaSyncAlt, FaHeadset } from 'react-icons/fa';

// =========================
// DỮ LIỆU CÁC CHÍNH SÁCH
// =========================
// Mỗi phần tử là một object chứa icon và dòng chữ hiển thị
const policies = [
  {
    icon: FaCar, // Icon xe tải
    line1: 'MIỄN PHÍ VẬN CHUYỂN (BILL > 1M)', // Nội dung chính sách
  },
  {
    icon: FaSyncAlt, // Icon mũi tên xoay (đổi trả)
    line1: 'ĐỔI TRẢ TRONG VÒNG 7 NGÀY',
  },
  {
    icon: FaHeadset, // Icon tai nghe (hỗ trợ)
    line1: 'SẢN PHẨM TRẢI NGHIỆM SẴN TẠI STORE',
  },
];

// =========================
// COMPONENT CHÍNH: PolicyBar
// =========================
const PolicyBar = () => {
  return (
    // Container bao toàn bộ thanh chính sách
    <div className="policy-bar-container">
      
      {/* Duyệt qua mảng policies để render từng phần tử */}
      {policies.map((policy, index) => {
        const Icon = policy.icon; // Lấy icon component động tương ứng
        
        return (
          // Mỗi chính sách là một "item"
          <div key={index} className="policy-item">

            {/* Phần icon hiển thị bên trái (hoặc trên khi mobile) */}
            <div className="policy-icon">
              <Icon /> {/* Gọi icon tương ứng */}
            </div>

            {/* Phần text mô tả chính sách */}
            <div className="policy-text">
              <span className="text-line1">{policy.line1}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Xuất component để dùng ở nơi khác (Home.jsx, Footer, v.v.)
export default PolicyBar;
