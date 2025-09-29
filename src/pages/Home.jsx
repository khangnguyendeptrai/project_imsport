import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';
import '../styles/pages/Home.scss';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter products based on category and search term
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Khám phá những sản phẩm tuyệt vời
            </h1>
            <p className="hero-subtitle">
              Tìm kiếm và mua sắm những sản phẩm chất lượng cao với giá cả hợp lý
            </p>
            <div className="hero-search">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="hero-search-input"
                />
                <button className="hero-search-btn">
                  <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Danh mục sản phẩm</h2>
          <div className="categories-grid">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-card ${selectedCategory === category.slug ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.slug)}
              >
                <div className="category-icon">
                  <svg className="category-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <span className="category-name">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <div className="container">
          <div className="products-header">
            <h2 className="section-title">
              {selectedCategory === 'all' ? 'Tất cả sản phẩm' : `Sản phẩm ${categories.find(c => c.slug === selectedCategory)?.name}`}
              <span className="products-count">({sortedProducts.length} sản phẩm)</span>
            </h2>
            
            <div className="products-controls">
              <div className="sort-controls">
                <label htmlFor="sort-select" className="sort-label">Sắp xếp theo:</label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="default">Mặc định</option>
                  <option value="price-low">Giá thấp đến cao</option>
                  <option value="price-high">Giá cao đến thấp</option>
                  <option value="rating">Đánh giá cao nhất</option>
                  <option value="name">Tên A-Z</option>
                </select>
              </div>
            </div>
          </div>

          {sortedProducts.length > 0 ? (
            <div className="products-grid">
              {sortedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-products">
              <div className="no-products-content">
                <svg className="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 className="no-products-title">Không tìm thấy sản phẩm</h3>
                <p className="no-products-text">
                  Không có sản phẩm nào phù hợp với tiêu chí tìm kiếm của bạn.
                </p>
                <button 
                  className="reset-filters-btn"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchTerm('');
                    setSortBy('default');
                  }}
                >
                  Đặt lại bộ lọc
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2 className="newsletter-title">Đăng ký nhận tin</h2>
            <p className="newsletter-subtitle">
              Nhận thông tin về các sản phẩm mới và ưu đãi đặc biệt
            </p>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Nhập email của bạn..."
                className="newsletter-input"
              />
              <button className="newsletter-btn">
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
