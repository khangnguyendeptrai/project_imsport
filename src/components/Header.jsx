import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null); // submenu nào đang mở

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveSubmenu(null); // reset submenu khi đóng mở menu
  };

  const openSubmenu = (menu) => {
    setActiveSubmenu(menu);
  };

  const closeSubmenu = () => {
    setActiveSubmenu(null);
  };

  return (
    <header className="header">
      <div className="top-bar"></div>

      <div className="container">
        <div className="main-header">
          {/* Nút mở menu mobile */}
          <button className="menu-toggle" onClick={toggleMenu}>
            <svg className="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Logo */}
          <Link to="/" className="logo">
            <div className="logo-container">
              <div className="logo-container-inner flex-start">
                <div className="logo-im">IM</div>
                <div className="logo-sports">SPORTS</div>
              </div>
              <div className="logo-subtitle text-end w-100">All for running</div>
            </div>
          </Link>

          {/* Actions */}
          <div className="user-actions">
            <div className="search-container">
              <div className="search-wrapper">
                <input type="text" placeholder="Tìm..." className="search-input" />
                <button className="search-btn">
                  <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            <button className="user-btn">
              <svg className="user-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>

            <button className="cart-btn">
              <svg className="cart-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              <span className="cart-count">0</span>
            </button>

            <div className="language-selector">
              <button className="language-btn"><span className="flag-icon">🇻🇳</span></button>
              <span className="language-divider">|</span>
              <button className="language-btn"><span className="flag-icon">🇬🇧</span></button>
            </div>
          </div>
        </div>

        {/* Navigation desktop */}
        <nav className="main-navigation">
          <Link to="/about" className="nav-link">Giới Thiệu</Link>
          <div className="nav-dropdown">
            <Link to="/men" className="nav-link">Men <span className="caret">▼</span></Link>
            <ul className="dropdown-menu">
              <li><Link to="/" className="dropdown-item">Áo</Link></li>
              <li><Link to="/m" className="dropdown-item">Quần</Link></li>
              <li><Link to="/" className="dropdown-item">Giày chạy bộ</Link></li>
              <li><Link to="/" className="dropdown-item">Giày địa hình</Link></li>
            </ul>
          </div>
          <div className="nav-dropdown">
            <Link to="/women" className="nav-link">Women <span className="caret">▼</span> </Link>
            <ul className="dropdown-menu">
              <li><Link to="/" className="dropdown-item">Áo</Link></li>
              <li><Link to="/" className="dropdown-item">Quần</Link></li>
              <li><Link to="/" className="dropdown-item">Giày chạy bộ</Link></li>
              <li><Link to="/" className="dropdown-item">Giày địa hình</Link></li>
            </ul>
          </div>
          <div className="nav-dropdown">
            <Link to="/GPS Watch" className="nav-link">GPS Watch <span className="caret">▼</span></Link>
            <ul className="dropdown-menu">
              <li><Link to="/" className="dropdown-item">Heart Rate Monitor</Link></li>
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
                <span
                  className="arrow-icon"
                  onClick={(e) => {
                    e.preventDefault(); // chặn nhảy về "/"
                    e.stopPropagation(); // chặn bubble để không gọi toggleMenu
                    openSubmenu("gps");
                  }}
                >
                  ›
                </span>
              </Link>
            </div>

            <div className="mobile-nav-item">
              <Link to="/" className="mobile-nav-link" onClick={toggleMenu}>SALE SHOCK CUỐI HÈ</Link>
            </div>
          </nav>
        </div>

        {/* Submenu cho mobile */}
        {activeSubmenu === "men" && (
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
        )}

        {activeSubmenu === "women" && (
          <div className="mobile-submenu">
            <div className="mobile-nav-header">
              <button className="back-btn" onClick={closeSubmenu}>‹</button>
              <span>Women</span>
            </div>
            <nav>
              <Link to="/" className="mobile-nav-link-child" onClick={toggleMenu}>Road Running Shoes</Link>
              <Link to="/" className="mobile-nav-link-child" onClick={toggleMenu}>Trail Running Shoes</Link>
              <Link to="/" className="mobile-nav-link-child" onClick={toggleMenu}>Sandals</Link>
              <Link to="/" className="mobile-nav-link-child" onClick={toggleMenu}>Hiking Shoes</Link>
            </nav>
          </div>
        )}

        {activeSubmenu === "gps" && (
          <div className="mobile-submenu">
            <div className="mobile-nav-header">
              <button className="back-btn" onClick={closeSubmenu}>‹</button>
              <span>GPS Watch</span>
            </div>
            <nav>
              <Link to="/" className="mobile-nav-link-child" onClick={toggleMenu}>Heart Rate Monitor</Link>
              <Link to="/" className="mobile-nav-link-child" onClick={toggleMenu}>Garmin</Link>
              <Link to="/" className="mobile-nav-link-child" onClick={toggleMenu}>Coros</Link>
              <Link to="/" className="mobile-nav-link-child" onClick={toggleMenu}>Suunto</Link>
            </nav>
          </div>
        )}

        {isMenuOpen && <div className="overlay" onClick={toggleMenu}></div>}
      </div>
    </header>
  );
};

export default Header