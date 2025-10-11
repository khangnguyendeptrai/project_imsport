import React from "react";
import { FaFacebookF, FaShare } from "react-icons/fa";
import avatar from "../assets/images/avatarHome.jpg";
import cover from "../assets/images/backgroundCover.jpg";
import { Link } from "react-router-dom";

const FacebookPageCard = () => {
  return (
    <div className="relative w-full max-w-[280px] h-[160px] sm:h-[180px] overflow-hidden rounded-xl shadow-md transition-transform duration-300 hover:scale-[1.02]">
      {/* Cover */}
      <Link to="/" target="_blank" rel="noopener noreferrer">
        <img
          src={cover}
          alt="cover"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 hover:bg-black/30 transition-all"></div>
      </Link>

      {/* Avatar */}
      <div className="absolute top-3 left-3">
        <Link to="/" target="_blank" rel="noopener noreferrer">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-blue-500 overflow-hidden shadow-md">
            <img
              src={avatar}
              alt="avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </Link>
      </div>

      {/* Nội dung */}
      <div className="absolute bottom-3 left-3 right-3 text-white">
        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:text-blue-300 transition"
        >
          <h2 className="text-base sm:text-lg font-semibold">IMSports</h2>
          <p className="text-xs sm:text-sm text-gray-200">32.325 người theo dõi</p>
        </Link>

        {/* Buttons */}
        <div className="mt-2 flex gap-3">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2 py-1 bg-[#4267B2] text-xs sm:text-sm font-medium rounded hover:bg-[#365899] transition"
          >
            <FaFacebookF /> Theo dõi
          </Link>
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2 py-1 bg-gray-200 text-black text-xs sm:text-sm font-medium rounded hover:bg-gray-300 transition"
          >
            <FaShare /> Chia sẻ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FacebookPageCard;
