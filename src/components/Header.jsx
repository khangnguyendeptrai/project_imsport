import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/Header.scss';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      {/* Top Brown Bar */}
      <div className="top-bar"></div>
      
      <div className="container">
        {/* Main Header Section */}
        <div className="main-header">
          {/* Logo */}
          <Link to="/" className="logo">
            <div className="logo-container ">
              <div className="logo-container-inner flex-start">
                <div className="logo-im">IM</div>
                <div className="logo-sports">SPORTS</div>
              </div>
              <div className="logo-subtitle text-end w-100">All for running</div>

            </div>
          </Link>

          {/* Search Bar */}
          

          {/* User Actions */}
          <div className="user-actions">
          <div className="search-container">
            <div className="search-wrapper">
              <input
                type="text"
                placeholder="Tìm..."
                className="search-input"
              />
              <button className="search-btn">
                <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
            <button className="user-btn">
              <svg className="user-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            
            <button className="cart-btn">
              <svg className="cart-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              <span className="cart-count">0</span>
            </button>

            {/* Language Selector */}
            <div className="language-selector">
              <button className="language-btn">
                <span className="flag-icon">🇻🇳</span>
              </button>
              <span className="language-divider">|</span>
              <button className="language-btn">
                <span className="flag-icon">🇬🇧</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="menu-toggle"
              onClick={toggleMenu}
            >
              <svg className="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="main-navigation">
          <Link to="/about" className="nav-link">About Us</Link>
          <div className="nav-dropdown">
            <Link to="/men" className="nav-link">
              Men
              <svg className="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
          </div>
          <div className="nav-dropdown">
            <Link to="/women" className="nav-link">
              Women
              <svg className="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
          </div>
          <div className="nav-dropdown">
            <Link to="/running-gears" className="nav-link">
              Running Gears
              <svg className="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
          </div>
          <div className="nav-dropdown">
            <Link to="/triathlon" className="nav-link">
              Triathlon
              <svg className="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
          </div>
          {/* <div className="nav-dropdown">
            <Link to="/gps-watch" className="nav-link">
              GPS Watch
              <svg className="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
          </div>
          <div className="nav-dropdown">
            <Link to="/nutrition" className="nav-link">
              Nutrition
              <svg className="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
          </div>
          <div className="nav-dropdown">
            <Link to="/recovery" className="nav-link">
              Recovery - Supports
              <svg className="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
          </div> */}
          <Link to="/runner-knowledge" className="nav-link">Runner cần biết</Link>
          <div className="nav-dropdown">
            <Link to="/brands" className="nav-link">
              Brands
              <svg className="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
          </div>
          <Link to="/team" className="nav-link">IMSports Team</Link>
          <Link to="/sale" className="nav-link sale-link">SALE SHOCK CUỐI HÈ</Link>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <nav className="mobile-nav">
              <Link to="/about" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                About Us
              </Link>
              <Link to="/men" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                Men
              </Link>
              <Link to="/women" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                Women
              </Link>
              <Link to="/running-gears" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                Running Gears
              </Link>
              <Link to="/triathlon" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                Triathlon
              </Link>
              <Link to="/gps-watch" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                GPS Watch
              </Link>
              <Link to="/nutrition" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                Nutrition
              </Link>
              <Link to="/recovery" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                Recovery - Supports
              </Link>
              <Link to="/runner-knowledge" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                Runner cần biết
              </Link>
              <Link to="/brands" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                Brands
              </Link>
              <Link to="/team" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                IMSports Team
              </Link>
              <Link to="/sale" className="mobile-nav-link sale-link" onClick={() => setIsMenuOpen(false)}>
                SALE SHOCK CUỐI HÈ
              </Link>
            </nav>
            
            {/* Mobile Search */}
            <div className="mobile-search-container">
              <div className="mobile-search-wrapper">
                <input
                  type="text"
                  placeholder="Tìm..."
                  className="mobile-search-input"
                />
                <button className="mobile-search-btn">
                  <svg className="mobile-search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
