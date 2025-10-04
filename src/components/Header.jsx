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
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

export default function Header() {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null); // submenu mobile
  const [cartCount] = useState(3);
  const navigate = useNavigate();

  const openSubmenu = (menu) => setActiveSubmenu(menu);
  const closeSubmenu = () => setActiveSubmenu(null);

  return (
    <header className="w-full shadow-sm border-b bg-white items-center justify-between">
      <div className="mx-4 px-4 flex flex-row items-center justify-between h-16">
        {/* Mobile menu toggle */}
        <button
          onClick={() => {
            setShowMobileMenu(!showMobileMenu);
            setActiveSubmenu(null);
          }}
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
            <img
              src={logo}
              alt="Logo"
              className="h-auto max-h-10 w-auto object-contain"
            />
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
              <Link
                to={"/user"}
                className="hover:text-orange-500 cursor-pointer"
              >
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

      {/* Submenu Desktop */}
      <nav className="hidden md:flex justify-center space-x-8 py-2 border-t">
        <Link to="/about" className="hover:text-orange-500">Giới Thiệu</Link>

        <div className="relative group">
          <Link to="/men" className="hover:text-orange-500">
            Men ▼
          </Link>
          <ul className="absolute hidden group-hover:block bg-white shadow-lg p-2 space-y-2">
            <li><Link to="/" className="hover:text-orange-500">Áo</Link></li>
            <li><Link to="/" className="hover:text-orange-500">Quần</Link></li>
            <li><Link to="/" className="hover:text-orange-500">Giày chạy bộ</Link></li>
            <li><Link to="/" className="hover:text-orange-500">Giày địa hình</Link></li>
          </ul>
        </div>

        <div className="relative group">
          <Link to="/women" className="hover:text-orange-500">
            Women ▼
          </Link>
          <ul className="absolute hidden group-hover:block bg-white shadow-lg p-2 space-y-2">
            <li><Link to="/" className="hover:text-orange-500">Áo</Link></li>
            <li><Link to="/" className="hover:text-orange-500">Quần</Link></li>
            <li><Link to="/" className="hover:text-orange-500">Giày chạy bộ</Link></li>
            <li><Link to="/" className="hover:text-orange-500">Giày địa hình</Link></li>
          </ul>
        </div>

        <div className="relative group">
          <Link to="/gps" className="hover:text-orange-500">
            GPS Watch ▼
          </Link>
          <ul className="absolute hidden group-hover:block bg-white shadow-lg p-2 space-y-2">
            <li><Link to="/" className="hover:text-orange-500">Heart Rate Monitor</Link></li>
            <li><Link to="/" className="hover:text-orange-500">Garmin</Link></li>
            <li><Link to="/" className="hover:text-orange-500">Coros</Link></li>
            <li><Link to="/" className="hover:text-orange-500">Suunto</Link></li>
          </ul>
        </div>

        <Link to="/sale" className="text-red-500 font-bold">
          SALE SHOCK CUỐI HÈ
        </Link>
      </nav>

      {/* Mobile Search */}
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

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white border-t shadow-md">
          <ul className="flex flex-col p-4 space-y-4">
            <li>
              <Link to="/about" className="block hover:text-orange-500">
                Giới Thiệu
              </Link>
            </li>

            {/* Men submenu */}
            <li>
              <button
                onClick={() => openSubmenu("men")}
                className="flex justify-between w-full hover:text-orange-500"
              >
                Men <span>›</span>
              </button>
            </li>

            {/* Women submenu */}
            <li>
              <button
                onClick={() => openSubmenu("women")}
                className="flex justify-between w-full hover:text-orange-500"
              >
                Women <span>›</span>
              </button>
            </li>

            {/* GPS submenu */}
            <li>
              <button
                onClick={() => openSubmenu("gps")}
                className="flex justify-between w-full hover:text-orange-500"
              >
                GPS Watch <span>›</span>
              </button>
            </li>

            <li>
              <Link to="/sale" className="block text-red-500 font-bold">
                SALE SHOCK CUỐI HÈ
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* Submenu Mobile */}
      {activeSubmenu === "men" && (
        <div className="md:hidden bg-white shadow-md p-4">
          <button onClick={closeSubmenu} className="mb-2 text-orange-500">
            ‹ Back
          </button>
          <ul className="space-y-2">
            <li><Link to="/" onClick={() => setShowMobileMenu(false)}>Áo</Link></li>
            <li><Link to="/" onClick={() => setShowMobileMenu(false)}>Quần</Link></li>
            <li><Link to="/" onClick={() => setShowMobileMenu(false)}>Giày chạy bộ</Link></li>
            <li><Link to="/" onClick={() => setShowMobileMenu(false)}>Giày địa hình</Link></li>
          </ul>
        </div>
      )}

      {activeSubmenu === "women" && (
        <div className="md:hidden bg-white shadow-md p-4">
          <button onClick={closeSubmenu} className="mb-2 text-orange-500">
            ‹ Back
          </button>
          <ul className="space-y-2">
            <li><Link to="/" onClick={() => setShowMobileMenu(false)}>Áo</Link></li>
            <li><Link to="/" onClick={() => setShowMobileMenu(false)}>Quần</Link></li>
            <li><Link to="/" onClick={() => setShowMobileMenu(false)}>Giày chạy bộ</Link></li>
            <li><Link to="/" onClick={() => setShowMobileMenu(false)}>Giày địa hình</Link></li>
          </ul>
        </div>
      )}

      {activeSubmenu === "gps" && (
        <div className="md:hidden bg-white shadow-md p-4">
          <button onClick={closeSubmenu} className="mb-2 text-orange-500">
            ‹ Back
          </button>
          <ul className="space-y-2">
            <li><Link to="/" onClick={() => setShowMobileMenu(false)}>Heart Rate Monitor</Link></li>
            <li><Link to="/" onClick={() => setShowMobileMenu(false)}>Garmin</Link></li>
            <li><Link to="/" onClick={() => setShowMobileMenu(false)}>Coros</Link></li>
            <li><Link to="/" onClick={() => setShowMobileMenu(false)}>Suunto</Link></li>
          </ul>
        </div>
      )}
    </header>
  );
}
