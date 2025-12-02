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
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-400 text-white py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* GRID CHÍNH */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* --- Cột 1: Giới thiệu --- */}
          <div>
            <h3 className="text-xl font-bold mb-3">
              {t("footer.introTitle")}
            </h3>
            <p className="text-base leading-relaxed text-gray-100">
              {t("footer.introText")}
            </p>

            <div className="flex space-x-3 text-xl mt-4">
              <Link
                to="https://twitter.com"
                className="hover:text-blue-300 transition"
              >
                <FaTwitter />
              </Link>
              <Link
                to="https://facebook.com"
                className="hover:text-blue-600 transition"
              >
                <FaFacebook />
              </Link>
              <Link
                to="https://instagram.com"
                className="hover:text-pink-500 transition"
              >
                <FaInstagram />
              </Link>
              <Link
                to="https://youtube.com"
                className="hover:text-red-600 transition"
              >
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
            <h3 className="text-xl font-bold mb-3">
              {t("footer.addressTitle")}
            </h3>
            <h4 className="font-semibold mt-2">{t("footer.addressHN")}</h4>
            <p className="text-base mt-1">{t("footer.addressHNLine1")}</p>
            <p className="text-base text-gray-200">
              {t("footer.addressHNHotline1")}
            </p>
            <p className="text-base mt-2">{t("footer.addressHNLine2")}</p>
            <p className="text-base text-gray-200">
              {t("footer.addressHNHotline2")}
            </p>
            <h4 className="font-semibold mt-3">{t("footer.addressHCM")}</h4>
            <p className="text-base mt-1">{t("footer.addressHCMLine1")}</p>
            <p className="text-base text-gray-200">
              {t("footer.addressHCMHotline1")}
            </p>
          </div>

          {/* --- Cột 3: Hướng dẫn --- */}
          <div>
            <h3 className="text-lg font-bold mb-3">
              {t("footer.guideTitle")}
            </h3>
            <div className="flex flex-col space-y-2 text-base">
              <Link to="/" className="hover:text-orange-300 transition">
                {t("footer.guideProducts")}
              </Link>
              <Link to="/" className="hover:text-orange-300 transition">
                {t("footer.guidePayment")}
              </Link>
              <Link to="/" className="hover:text-orange-300 transition">
                {t("footer.guideShipping")}
              </Link>
              <Link to="/" className="hover:text-orange-300 transition">
                {t("footer.guideReturn")}
              </Link>
              <Link to="/" className="hover:text-orange-300 transition">
                {t("footer.guideWarranty")}
              </Link>
              <Link to="/" className="hover:text-orange-300 transition">
                {t("footer.guidePrivacy")}
              </Link>
            </div>
          </div>

          {/* --- Cột 4: Theo dõi --- */}
          <div>
            <h3 className="text-lg font-bold mb-3">
              {t("footer.followTitle")}
            </h3>
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
                {t("footer.emailLabel")}
              </label>
              <FaPaperPlane
                className="absolute right-2 top-3 text-gray-300 transition-colors duration-300 
                peer-focus:text-orange-400 cursor-pointer"
              />
              <span className="absolute bottom-0 left-0 h-[2px] bg-orange-400 scale-x-0 
                peer-focus:scale-x-100 transition-transform duration-300 origin-left w-full"></span>
            </div>

            <p className="text-sm mt-4 leading-relaxed text-gray-100">
              {t("footer.subscribeNote")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
