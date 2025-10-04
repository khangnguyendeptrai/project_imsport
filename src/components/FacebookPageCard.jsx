import React from "react";
import { FaFacebookF, FaShare } from "react-icons/fa";
import avatar from "../assets/images/avatarHome.jpg";
import cover from "../assets/images/backgroundCover.jpg";
import { Link } from "react-router-dom";

const FacebookPageCard = () => {
    return (
        <div className="relative w-[280px] h-[160px] overflow-hidden shadow-md mt-5">
            {/* Cover full card */}
            <Link to="/" target="_blank" rel="noopener noreferrer">

                <img
                    src={cover}
                    alt="cover"
                    className="absolute inset-0 w-full h-full object-fill"
                />

            </Link>
            {/* Overlay mờ để text dễ đọc */}
              <Link to="/" target="_blank" rel="noopener noreferrer">
                     
            <div className="absolute inset-0 bg-black/30"></div>
            </Link>

            {/* Avatar */}
            <div className="absolute top-2 left-2">
                <div className="w-12 h-12 rounded-full border-2 border-blue-400 shadow overflow-hidden p-0.5">
                    <Link to="/" target="_blank" rel="noopener noreferrer">

                        <img
                            src={avatar}
                            alt="avatar"
                            className="w-full h-full object-cover rounded-full"
                        />

                    </Link>
                </div>
            </div>


            {/* Nội dung dưới cùng */}
            <div className="absolute bottom-2 left-2 right-2 text-white">
                <Link to="/" target="_blank" rel="noopener noreferrer" >
                    <h2 className="text-lg font-semibold">IMSports</h2>
                    <p className="text-sm">32.325 người theo dõi</p>
                </Link>

                {/* Buttons */}
                <div className="mt-2 flex gap-14">
                    <button className="flex items-center px-2 py-1 bg-[#4267B2] text-xs font-medium rounded shadow hover:bg-[#365899]">
                        <Link to="/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                            <FaFacebookF className="mr-1" /> Theo dõi Trang
                        </Link>
                    </button>
                    <button className="flex items-center px-2 py-1 bg-gray-200 text-xs font-medium rounded shadow hover:bg-gray-300 text-black">
                        <Link to="/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                            <FaShare className="mr-1" /> Chia sẻ
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FacebookPageCard;
