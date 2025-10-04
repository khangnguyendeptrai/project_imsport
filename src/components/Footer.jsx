import React from 'react';
import { Link } from 'react-router-dom';
import certificate from '../assets/images/certificate.png';
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaPaperPlane } from "react-icons/fa";
import FacebookPageCard from './FacebookPageCard';

const Footer = () => {
  return (
    <footer className="footer bg-gray-400 text-white py-10">
      <div className="container">
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 justify-between'>
          <div className="footer-section">
            <h3 className='text-lg font-bold'>GIỚI THIỆU</h3>
            <p className='mt-4 text-lg'>IMSports chuyên giày dép, quần áo và phụ kiện chạy bộ/chạy địa hình chính hãng đến từ các thương hiệu hàng đầu thế giới. Chúng tôi luôn có sẵn những dòng sản phẩm mới nhất, tối ưu và hiệu suất cao dành cho runners. Đội ngũ nhân viên trẻ trung, nhiệt huyết, là những chân chạy đã được tích luỹ nhiều kinh nghiệm tập luyện và thi đấu sẽ mang đến tinh thần phục vụ chuyên nghiệp và chuyên sâu nhất cho khách hàng.</p>
            <div className="flex space-x-4 text-2xl text-gray-600 mt-4 ">
              <Link to="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="rounded-full p-2 bg-white/20 border border-transparent text-white/60 flex items-center justify-center hover:bg-white/20 transition"
              >
                <FaTwitter className="hover:text-blue-600 text-while" />
              </Link>
              <Link to="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="rounded-full p-2 bg-white/20 border border-transparent  text-white/60 flex items-center justify-center hover:bg-white/20 transition"
              >
                <FaFacebook className="hover:text-blue-600" />
              </Link>
              <Link to="https://instagram.com" target="_blank" rel="noopener noreferrer" className="rounded-full p-2 bg-white/20 border border-transparent  text-white/60 flex items-center justify-center hover:bg-white/20 transition"
              >
                <FaInstagram className="hover:text-pink-500" />
              </Link>
              <Link to="https://youtube.com" target="_blank" rel="noopener noreferrer" className="rounded-full p-2 bg-white/20 border border-transparent  text-white/60 flex items-center justify-center hover:bg-white/20 transition"
              >
                <FaYoutube className="hover:text-red-600" />
              </Link>

            </div>
            <img src={certificate} alt="Certificate" className="mt-4 w-80 h-auto" />
          </div>
          <div className="footer-section">
            <h3 className='text-lg font-bold'>ĐỊA CHỈ STORE</h3>
            <h3 className='text-lg font-bold mt-6' > HÀ NỘI</h3>
            <p className='mt-2 text-lg'>-Số 58A Ngõ 92, Thanh Nhàn, Hai Bà Trưng</p>
            <p className='mt-2 text-lg'>Hotline/Zalo: 0846 33 5858 </p>
            <p className='mt-2 text-lg'>- B11, Imperia Sky Garden, 423 Minh Khai, Hai Bà Trưng</p>
            <p className='mt-2 text-lg'>Hotline/Zalo: 0839 33 5858 </p>
            <p className='mt-2 text-lg'>-0105, Tòa Luxury Park Views, Trương Công Giai, Cầu Giấy</p>
            <p className='mt-2 text-lg'>Hotline/Zalo Tư vấn: 0879 33 5858</p>
            <h3 className='text-lg font-bold mt-2' > Đại lý ủy quyền tại Tp.HCM.</h3>
            <p className='mt-2 text-lg'>Số 285/21 CMT8, Phường 12, Quận 10</p>
            <p className='mt-2 text-lg'>Hotline/Zalo Tư vấn: 08668 285 21</p>
          </div>
          <div className="footer-section">
            <h3 className='text-lg font-bold'>HƯỚNG DẪN</h3>
            <Link to="/"><p className='mt-4 text-lg'>Sản phẩm</p></Link>
            <Link to="/"><p className='mt-2 text-lg'>Bản đồ</p></Link>
            <Link to="/"><p className='mt-2 text-lg'>Chính sách thanh toán</p></Link>
            <Link to="/"><p className='mt-2 text-lg'>Chính sách vận chuyển</p></Link>
            <Link to="/"><p className='mt-2 text-lg'>Chính sách đổi trả hàng</p></Link>
            <Link to="/"><p className='mt-2 text-lg'>Chính sách bảo hành</p></Link>
            <Link to="/"><p className='mt-2 text-lg'>Chính sách bảo mật</p></Link>
          </div>
          <div className="footer-section">
            <h3 className='text-lg font-bold'>THEO DÕI CHÚNG TÔI</h3>
            <FacebookPageCard />
            {/* input */}
            <div className="relative w-80 mt-5">
              <input
                type="email"
                id="email"
                placeholder=" "
                className="peer w-full bg-transparent text-white placeholder-transparent 
               focus:outline-none py-2 border-b border-gray-400"
              />

              {/* Label */}
              <label
                htmlFor="email"
                className="absolute left-0 top-2 text-gray-300 text-base transition-all
               peer-placeholder-shown:top-2 peer-placeholder-shown:text-base 
               peer-placeholder-shown:text-gray-400
               peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-orange-400
               peer-not-placeholder-shown:top-[-10px] peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-orange-400"
              >
                Nhập email của bạn
              </label>

              {/* Icon */}
              <FaPaperPlane
                className="absolute right-2 top-3 text-gray-400 transition-colors duration-500 
               peer-focus:text-orange-400 peer-not-placeholder-shown:text-orange-400 cursor-pointer"
              />

              {/* Border trái (từ giữa sang trái) */}
              <span
                className="absolute bottom-0 left-1/2 h-[2px] w-1/2 bg-orange-400
               transform scale-x-0 transition-transform duration-500 origin-left
               peer-focus:scale-x-100 peer-not-placeholder-shown:scale-x-100"
              ></span>

              {/* Border phải (từ giữa sang phải) */}
              <span
                className="absolute bottom-0 right-1/2 h-[2px] w-1/2 bg-orange-400
               transform scale-x-0 transition-transform duration-500 origin-right
               peer-focus:scale-x-100 peer-not-placeholder-shown:scale-x-100"
              ></span>
            </div>

            <p className='mt-4 text-lg'>Đăng ký để nhận chương trình ưu đãi! Website được sở hữu bởi Công ty TNHH Thể Thao Thung Lũng Mặt Trời, GPĐK: 0109685009. Liên hệ CSKH: sales@imsports.vn</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
