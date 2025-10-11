import React from "react";
import { Link } from "react-router-dom";
import certificate from "../assets/images/certificate.png";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaPaperPlane,
} from "react-icons/fa";
import FacebookPageCard from "./FacebookPageCard";

export default function Footer() {
  return (
    <footer className="bg-gray-400 text-white py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* GRID CHÍNH */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* --- Cột 1: Giới thiệu --- */}
          <div>
            <h3 className="text-lg font-bold mb-3">GIỚI THIỆU</h3>
            <p className="text-base leading-relaxed text-gray-100">
              IMSports chuyên giày dép, quần áo và phụ kiện chạy bộ/chạy địa hình
              chính hãng đến từ các thương hiệu hàng đầu thế giới. Đội ngũ nhân viên
              trẻ trung, nhiệt huyết, là những chân chạy có kinh nghiệm tập luyện và
              thi đấu, mang đến tinh thần phục vụ chuyên sâu cho khách hàng.
            </p>

            <div className="flex space-x-3 text-xl mt-4">
              <Link to="https://twitter.com" className="hover:text-blue-300 transition">
                <FaTwitter />
              </Link>
              <Link to="https://facebook.com" className="hover:text-blue-600 transition">
                <FaFacebook />
              </Link>
              <Link to="https://instagram.com" className="hover:text-pink-500 transition">
                <FaInstagram />
              </Link>
              <Link to="https://youtube.com" className="hover:text-red-600 transition">
                <FaYoutube />
              </Link>
            </div>

            <img
              src={certificate}
              alt="Certificate"
              className="mt-4 w-48 sm:w-64 lg:w-72 h-auto mx-auto sm:mx-0"
            />
          </div>

          {/* --- Cột 2: Địa chỉ --- */}
          <div>
            <h3 className="text-xl font-bold mb-3">ĐỊA CHỈ STORE</h3>
            <h4 className="font-semibold mt-2">HÀ NỘI</h4>
            <p className="text-base mt-1">Số 58A Ngõ 92, Thanh Nhàn, Hai Bà Trưng</p>
            <p className="text-base text-gray-200">Hotline: 0846 33 5858</p>
            <p className="text-base mt-2">B11, Imperia Sky Garden, 423 Minh Khai</p>
            <p className="text-base text-gray-200">Hotline: 0839 33 5858</p>
            <h4 className="font-semibold mt-3">TP. HỒ CHÍ MINH</h4>
            <p className="text-base mt-1">Số 285/21 CMT8, P.12, Q.10</p>
            <p className="text-base text-gray-200">Hotline: 08668 285 21</p>
          </div>

          {/* --- Cột 3: Hướng dẫn --- */}
          <div>
            <h3 className="text-lg font-bold mb-3">HƯỚNG DẪN</h3>
            <div className="flex flex-col space-y-2 text-base">
              <Link to="/" className="hover:text-orange-300 transition">Sản phẩm</Link>
              <Link to="/" className="hover:text-orange-300 transition">Chính sách thanh toán</Link>
              <Link to="/" className="hover:text-orange-300 transition">Chính sách vận chuyển</Link>
              <Link to="/" className="hover:text-orange-300 transition">Chính sách đổi trả hàng</Link>
              <Link to="/" className="hover:text-orange-300 transition">Chính sách bảo hành</Link>
              <Link to="/" className="hover:text-orange-300 transition">Chính sách bảo mật</Link>
            </div>
          </div>

          {/* --- Cột 4: Theo dõi --- */}
          <div>
            <h3 className="text-lg font-bold mb-3">THEO DÕI CHÚNG TÔI</h3>
            <FacebookPageCard />

            {/* Ô nhập email */}
            <div className="relative w-full mt-5 max-w-sm">
              <input
                type="email"
                id="email"
                placeholder=" "
                className="peer w-full bg-transparent text-white placeholder-transparent 
                focus:outline-none py-2 border-b border-gray-300"
              />
              <label
                htmlFor="email"
                className="absolute left-0 top-2 text-gray-300 text-sm transition-all
                peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm 
                peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-orange-400"
              >
                Nhập email của bạn
              </label>
              <FaPaperPlane
                className="absolute right-2 top-3 text-gray-300 transition-colors duration-300 
                peer-focus:text-orange-400 cursor-pointer"
              />
              <span className="absolute bottom-0 left-0 h-[2px] bg-orange-400 scale-x-0 
                peer-focus:scale-x-100 transition-transform duration-300 origin-left w-full"></span>
            </div>

            <p className="text-sm mt-4 leading-relaxed text-gray-100">
              Đăng ký để nhận chương trình ưu đãi! Website thuộc Công ty TNHH Thể Thao
              Thung Lũng Mặt Trời.
            </p>
          </div>
        </div>
      </div>

    
     
    </footer>
  );
}
