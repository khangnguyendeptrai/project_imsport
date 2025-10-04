import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Assets
import logo from "../assets/images/logo.png";
import vnFlag from "../assets/images/vn.png";
import ukFlag from "../assets/images/eng.png";

// Heroicons
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
  ShoppingCartIcon ,
} from "@heroicons/react/24/outline";

export default function Header() {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [cartCount] = useState(3);
  const navigate = useNavigate();

  return (
    <header className="w-full shadow-sm border-b bg-white items-center justify-between">
      <div className="mx-4 px-4 flex flex-row items-center justify-between h-16">
        {/* Mobile menu toggle */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="md:hidden py-2 text-gray-600 hover:text-orange-500"
        >
          {showMobileMenu ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>

        {/* Logo */}
        <div className="items-center justify-between relative">
          <div
            className="flex-shrink-0 mr-0 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="Logo" className="h-auto max-h-10 w-auto object-contain" />
          </div>
        </div>

        {/* Actions */}
        <div className="items-center justify-between relative">
          <ul className="flex space-x-4 items-center">
            {/* Search */}
            <li className="flex items-center md:border overflow-hidden">
              <div className="hidden md:flex flex-1">
                <input
                  type="text"
                  placeholder="Tìm..."
                  className="px-6 py-1 outline-none w-full"
                />
              </div>
              <button className="hidden md:flex p-2 text-gray-500 hover:text-orange-500 outline-none">
                <MagnifyingGlassIcon className="h-6 w-6" />
              </button>
              <button
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                className="md:hidden p-2 text-gray-500 hover:text-orange-500 relative"
              >
                <MagnifyingGlassIcon className="h-6 w-6" />
              </button>
            </li>

            {/* User */}
            <li className="hidden md:flex">
              <Link to={"/user"} className="hover:text-orange-500 cursor-pointer">
                <UserIcon className="h-6 w-6 text-gray-500" />
              </Link>
            </li>

            {/* Cart */}
            <li className="relative">
              <Link to={"/cart"} className="hover:text-orange-500">
                <ShoppingBagIcon className="h-6 w-6 text-gray-600 relative hidden md:flex" />
                <ShoppingCartIcon className="h-6 w-6 text-gray-600 relative md:hidden" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              </Link>
            </li>

            {/* Language */}
            <li className="hidden md:flex">
              <span>
                <img
                  src={vnFlag}
                  alt="Vietnamese"
                  className="h-5 w-auto inline mr-2 cursor-pointer"
                />
                <img
                  src={ukFlag}
                  alt="English"
                  className="h-5 w-auto inline cursor-pointer"
                />
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile search */}
      {showMobileSearch && (
        <div className="md:hidden absolute top-16 right-0 mx-auto w-3/4 bg-white border-2 border-gray-700 flex items-center justify-center p-2 rounded-md shadow-md">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="flex-1 outline-none rounded-md"
          />
          <button className="ml-2 text-gray-500 hover:text-orange-500">
            <MagnifyingGlassIcon className="h-6 w-6" />
          </button>
        </div>
      )}

      {/* Mobile menu */}
      {/* {showMobileMenu && (
        <div className="md:hidden bg-white border-t shadow-md">
          <ul className="flex flex-col p-4 space-y-4">
            <li>
              <Link to="/" className="block hover:text-orange-500">
                Trang chủ
              </Link>
            </li>
            <li>
              <Link to="/user" className="block hover:text-orange-500">
                Tài khoản
              </Link>
            </li>
            <li>
              <Link to="/cart" className="block hover:text-orange-500">
                Giỏ hàng
              </Link>
            </li>
            <li className="flex space-x-2">
              <img src={vnFlag} alt="VN" className="h-5 w-auto cursor-pointer" />
              <img src={ukFlag} alt="EN" className="h-5 w-auto cursor-pointer" />
            </li>
          </ul>
        </div>
      )} */}
    </header>
  );
}
