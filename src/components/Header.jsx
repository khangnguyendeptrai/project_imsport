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
    <header className="w-full shadow-sm border-b bg-white">
      <div className="flex items-center justify-between px-4 md:px-8 h-16">
        {/* Mobile menu toggle */}
        <button className="menu-toggle" onClick={toggleMenu}>
          <svg className="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo */}
        <div className="items-center justify-between relative">
          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="Logo" className="h-10 w-auto object-contain" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between relative">
          <ul className="flex items-center justify-between gap-4 w-full">
            {/* Search */}
            <li className="flex items-center md:border overflow-hidden">
              <div className="hidden md:flex flex-1">
                <input
                  type="text"
                  placeholder="Tìm..."
                  className="px-4 py-1 outline-none w-full"
                />
              </div>
              <button className="hidden md:flex p-2 text-gray-500 hover:text-orange-500 outline-none">
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                className="md:hidden p-2 text-gray-500 hover:text-orange-500"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </li>

            {/* User */}
            <li className="hidden md:flex items-center">
              <Link to="/user" className="hover:text-orange-500">
                <UserIcon className="h-5 w-5 text-gray-500" />
              </Link>
            </li>

            {/* Cart */}
            <li className="relative flex items-center">
              <Link to="/cart" className="hover:text-orange-500 relative flex">
                <ShoppingBagIcon className="h-5 w-5 text-gray-600 hidden md:flex" />
                <ShoppingCartIcon className="h-5 w-5 text-gray-600 md:hidden" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              </Link>
            </li>

            {/* Language */}
            <li className="flex items-center gap-2">
              <img
                src={vnFlag}
                alt="Vietnamese"
                className="h-5 w-5 cursor-pointer"
              />
              <span className="h-5 border-l border-gray-400"></span>
              <img
                src={ukFlag}
                alt="English"
                className="h-5 w-5 cursor-pointer"
              />
            </li>
          </ul>
        </div>

      </div>
      <nav className="main-navigation container">
        <Link to="/about" className="nav-link">Giới Thiệu</Link>
        <div className="nav-dropdown">
          <Link to="/do-nam" className="nav-link">Men <span className="caret"><ChevronDownIcon className="h-4 w-4 ml-1 text-gray-500" />
          </span></Link>
          <ul className="dropdown-menu">
            <li><Link to="/" className="dropdown-item">Áo</Link></li>
            <li><Link to="/" className="dropdown-item">Quần</Link></li>
            <li><Link to="/" className="dropdown-item">Giày chạy bộ</Link></li>
            <li><Link to="/" className="dropdown-item">Giày địa hình</Link></li>
          </ul>
        </div>
        <div className="nav-dropdown">
          <Link to="/do-nu" className="nav-link">Women <span className="caret"><ChevronDownIcon className="h-4 w-4 ml-1 text-gray-500" />
          </span> </Link>
          <ul className="dropdown-menu">
            <li><Link to="/" className="dropdown-item">Áo</Link></li>
            <li><Link to="/" className="dropdown-item">Quần</Link></li>
            <li><Link to="/" className="dropdown-item">Giày chạy bộ</Link></li>
            <li><Link to="/" className="dropdown-item">Giày địa hình</Link></li>
          </ul>
        </div>
        <div className="nav-dropdown">
          <Link to="/dong-ho-tai-nghe" className="nav-link">GPS Watch <span className="caret"><ChevronDownIcon className="h-4 w-4 ml-1 text-gray-500" />
          </span></Link>
          <ul className="dropdown-menu">
            <li><Link to="/" className="dropdown-item">Coros</Link></li>
            <li><Link to="/" className="dropdown-item">Garmin</Link></li>
            <li><Link to="/" className="dropdown-item">Coros</Link></li>
          </ul>
        </div>
        <Link to="/sale" className="nav-link sale-link">SALE SHOCK CUỐI HÈ</Link>
      </nav>

      {/* Navigation mobile */}
      <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
        <div className="mobile-nav-header"><p>Menu</p></div>

        <nav className="mobile-nav">
          <div className="mobile-nav-item">
            <Link to="/about" className="mobile-nav-link" onClick={toggleMenu}>Giới Thiệu</Link>
          </div>

          {/* Men có submenu */}
          <div className="mobile-nav-item">
            <Link to="/" className="mobile-nav-link" onClick={toggleMenu}>
              <span className="label">Men</span>
              <span
                className="arrow-icon"
                onClick={(e) => {
                  e.preventDefault(); // chặn nhảy về "/"
                  e.stopPropagation(); // chặn bubble để không gọi toggleMenu
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

          {/* Women có submenu */}
          <div className="mobile-nav-item">
            <Link to="/" className="mobile-nav-link" onClick={toggleMenu}>
              <span className="label">Women</span>
              <span
                className="arrow-icon"
                onClick={(e) => {
                  e.preventDefault(); // chặn nhảy về "/"
                  e.stopPropagation(); // chặn bubble để không gọi toggleMenu
                  openSubmenu("women");
                }}
              >
                ›
              </span>
            </Link>
          </div>

          {/* GPS Watch có submenu */}
          <div className="mobile-nav-item">
            <Link to="/" className="mobile-nav-link" onClick={toggleMenu}>
              <span className="label">Gps Watch</span>
              <div
                className="arrow-icon"
                onClick={(e) => {
                  e.preventDefault(); // chặn nhảy về "/"
                  e.stopPropagation(); // chặn bubble để không gọi toggleMenu
                  openSubmenu("gps");
                }}
              >
                <div>›</div>
              </div>
            </Link>
          </div>

          <div className="mobile-nav-item">
            <Link to="/" className="mobile-nav-link" onClick={toggleMenu}>SALE SHOCK CUỐI HÈ</Link>
          </div>
        </nav>
        {/* Submenu cho mobile */}
        {activeSubmenu === "men" && (
          <>
            <div className="mobile-submenu">
              <div className="mobile-nav-header">
                <button className="back-btn" onClick={closeSubmenu}>‹</button>
                <span>Men</span>
              </div>
              <nav>
                <Link to="/" className="mobile-nav-link-child" onClick={toggleMenu}>Road Running Shoes</Link>
                <Link to="/" className="mobile-nav-link-child" onClick={toggleMenu}>Trail Running Shoes</Link>
                <Link to="/" className="mobile-nav-link-child" onClick={toggleMenu}>Sandals</Link>
                <Link to="/" className="mobile-nav-link-child" onClick={toggleMenu}>Hiking Shoes</Link>
              </nav>
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
          </>
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



      {
        isMenuOpen &&

        <div className="overlay" onClick={toggleMenu}>
          123123

        </div>
      }

      {/* Mobile search */}
      <div
        className={`md:hidden absolute top-16 right-0 w-2/3 bg-gray-100 border border-gray-300 flex items-center p-2 rounded-l-md shadow-md z-50 overflow-hidden transition-all duration-500 ease-linear ${showMobileSearch ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="flex-1 outline-none rounded-md px-3 py-2 bg-white text-gray-700"
        />
        <button className="ml-2 text-gray-600 hover:text-orange-500">
          <MagnifyingGlassIcon className="h-5 w-5" />
        </button>
      </div>





    </header >
  );
}
