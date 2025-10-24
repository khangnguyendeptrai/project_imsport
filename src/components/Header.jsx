import { useState } from "react";
import "../styles/components/Header.scss";
import { Link, useNavigate, useLocation } from "react-router-dom";

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
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

export default function Header() {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [cartCount] = useState(3);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const location = useLocation();
  const hideMenu = ["/men", "/women", "/watch"].includes(location.pathname);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveSubmenu(null);
  };

  const openSubmenu = (menu) => {
    setActiveSubmenu(menu);
  };

  const closeSubmenu = () => {
    setActiveSubmenu(null);
  };

  return (
    <header className="w-full shadow-sm border-b bg-white items-center justify-between">
      <div className="mx-4 px-4 flex flex-row items-center justify-between h-16">
        {/* Mobile menu toggle */}
        <button className="menu-toggle" onClick={toggleMenu}>
          <svg
            className="menu-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
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
                <MagnifyingGlassIcon className="h-4 w-4 ml-1" />
              </button>
              <button
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                className="md:hidden p-2 text-gray-500 hover:text-orange-500 relative"
              >
                <MagnifyingGlassIcon className="h-4 w-4 ml-1" />
              </button>
            </li>

            {/* User */}
            <li className="hidden md:flex">
              <Link
                to={"/user"}
                className="hover:text-orange-500 cursor-pointer"
              >
                <UserIcon className="h-4 w-4 ml-1 text-gray-500" />
              </Link>
            </li>

            {/* Cart */}
            <li className="relative">
              <Link to={"/cart"} className="hover:text-orange-500">
                <ShoppingBagIcon className="h-4 w-4 ml-1 text-gray-600 relative hidden md:flex" />
                <ShoppingCartIcon className="h-4 w-4 ml-1 text-gray-600 relative md:hidden" />
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

      {/* === MAIN NAVIGATION (Ẩn ở trang men, women, watch) === */}
      {!hideMenu && (
        <nav className="main-navigation container">
          <Link to="/about" className="nav-link">
            Giới Thiệu
          </Link>
          <div className="nav-dropdown">
            <Link to="/men" className="nav-link">
              Men{" "}
              <span className="caret">
                <ChevronDownIcon className="h-4 w-4 ml-1 text-gray-500" />
              </span>
            </Link>
            <ul className="dropdown-menu">
              <li>
                <Link to="/" className="dropdown-item">
                  Áo
                </Link>
              </li>
              <li>
                <Link to="/m" className="dropdown-item">
                  Quần
                </Link>
              </li>
              <li>
                <Link to="/" className="dropdown-item">
                  Giày chạy bộ
                </Link>
              </li>
              <li>
                <Link to="/" className="dropdown-item">
                  Giày địa hình
                </Link>
              </li>
            </ul>
          </div>
          <div className="nav-dropdown">
            <Link to="/women" className="nav-link">
              Women{" "}
              <span className="caret">
                <ChevronDownIcon className="h-4 w-4 ml-1 text-gray-500" />
              </span>
            </Link>
            <ul className="dropdown-menu">
              <li>
                <Link to="/" className="dropdown-item">
                  Áo
                </Link>
              </li>
              <li>
                <Link to="/" className="dropdown-item">
                  Quần
                </Link>
              </li>
              <li>
                <Link to="/" className="dropdown-item">
                  Giày chạy bộ
                </Link>
              </li>
              <li>
                <Link to="/" className="dropdown-item">
                  Giày địa hình
                </Link>
              </li>
            </ul>
          </div>
          <div className="nav-dropdown">
            <Link to="/watch" className="nav-link">
              GPS Watch{" "}
              <span className="caret">
                <ChevronDownIcon className="h-4 w-4 ml-1 text-gray-500" />
              </span>
            </Link>
            <ul className="dropdown-menu">
              <li>
                <Link to="/" className="dropdown-item">
                  Coros
                </Link>
              </li>
              <li>
                <Link to="/" className="dropdown-item">
                  Garmin
                </Link>
              </li>
              <li>
                <Link to="/" className="dropdown-item">
                  Suunto
                </Link>
              </li>
            </ul>
          </div>
          <Link to="/sale" className="nav-link sale-link">
            SALE SHOCK CUỐI HÈ
          </Link>
        </nav>
      )}

      {/* Mobile menu */}
      <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
        <div className="mobile-nav-header">
          <p>Menu</p>
        </div>

        <nav className="mobile-nav">
          <div className="mobile-nav-item">
            <Link to="/about" className="mobile-nav-link" onClick={toggleMenu}>
              Giới Thiệu
            </Link>
          </div>

          <div className="mobile-nav-item">
            <Link to="/men" className="mobile-nav-link" onClick={toggleMenu}>
              <span className="label">Men</span>
              <span
                className="arrow-icon"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openSubmenu("men");
                }}
              >
                ›
              </span>
            </Link>
          </div>

          <div className="mobile-nav-item">
            <Link to="/women" className="mobile-nav-link" onClick={toggleMenu}>
              <span className="label">Women</span>
              <span
                className="arrow-icon"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openSubmenu("women");
                }}
              >
                ›
              </span>
            </Link>
          </div>

          <div className="mobile-nav-item">
            <Link to="/watch" className="mobile-nav-link" onClick={toggleMenu}>
              <span className="label">GPS Watch</span>
              <span
                className="arrow-icon"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openSubmenu("gps");
                }}
              >
                ›
              </span>
            </Link>
          </div>

          <div className="mobile-nav-item">
            <Link to="/" className="mobile-nav-link" onClick={toggleMenu}>
              SALE SHOCK CUỐI HÈ
            </Link>
          </div>
        </nav>

        {/* Submenu cho mobile */}
        {activeSubmenu === "men" && (
          <div className="mobile-submenu">
            <div className="mobile-nav-header">
              <button className="back-btn" onClick={closeSubmenu}>
                ‹
              </button>
              <span>Men</span>
            </div>
            <nav>
              <Link to="/" className="mobile-nav-link-child" onClick={toggleMenu}>
                Road Running Shoes
              </Link>
              <Link to="/" className="mobile-nav-link-child" onClick={toggleMenu}>
                Trail Running Shoes
              </Link>
              <Link to="/" className="mobile-nav-link-child" onClick={toggleMenu}>
                Sandals
              </Link>
              <Link to="/" className="mobile-nav-link-child" onClick={toggleMenu}>
                Hiking Shoes
              </Link>
            </nav>
          </div>
        )}

        {activeSubmenu === "women" && (
          <div className="mobile-submenu">
            <div className="mobile-nav-header">
              <button className="back-btn" onClick={closeSubmenu}>
                ‹
              </button>
              <span>Women</span>
            </div>
            <nav>
              <Link to="/" className="mobile-nav-link-child" onClick={toggleMenu}>
                Road Running Shoes
              </Link>
              <Link to="/" className="mobile-nav-link-child" onClick={toggleMenu}>
                Trail Running Shoes
              </Link>
              <Link to="/" className="mobile-nav-link-child" onClick={toggleMenu}>
                Sandals
              </Link>
              <Link to="/" className="mobile-nav-link-child" onClick={toggleMenu}>
                Hiking Shoes
              </Link>
            </nav>
          </div>
        )}

        {activeSubmenu === "gps" && (
          <div className="mobile-submenu">
            <div className="mobile-nav-header">
              <button className="back-btn" onClick={closeSubmenu}>
                ‹
              </button>
              <span>GPS Watch</span>
            </div>
            <nav>
              <Link to="/" className="mobile-nav-link-child" onClick={toggleMenu}>
                Garmin
              </Link>
              <Link to="/" className="mobile-nav-link-child" onClick={toggleMenu}>
                Coros
              </Link>
              <Link to="/" className="mobile-nav-link-child" onClick={toggleMenu}>
                Suunto
              </Link>
            </nav>
          </div>
        )}
      </div>

      {isMenuOpen && <div className="overlay" onClick={toggleMenu}></div>}

      {/* Mobile search */}
      {showMobileSearch && (
        <div className="md:hidden absolute top-16 right-0 mx-auto w-3/4 bg-white border-2 border-gray-700 flex items-center justify-center p-2 rounded-md shadow-md">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="flex-1 outline-none rounded-md"
          />
          <button className="ml-2 text-gray-500 hover:text-orange-500">
            <MagnifyingGlassIcon className="h-4 w-4 ml-1" />
          </button>
        </div>
      )}
    </header>
  );
}
