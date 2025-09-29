import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/ProductCard.scss';

const ProductCard = ({ product }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price * 1000);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="star-icon star-filled">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="star-icon star-half">
          <defs>
            <linearGradient id="half-fill">
              <stop offset="50%" stopColor="currentColor"/>
              <stop offset="50%" stopColor="transparent"/>
            </linearGradient>
          </defs>
          <path fill="url(#half-fill)" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="star-icon star-empty">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      );
    }

    return stars;
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name}
            className="product-image"
            loading="lazy"
          />
        </Link>
        
        {/* Sale Badge */}
        {product.originalPrice > product.price && (
          <div className="sale-badge">
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </div>
        )}

        {/* Stock Status */}
        {!product.inStock && (
          <div className="out-of-stock-badge">
            Hết hàng
          </div>
        )}

        {/* Quick Actions */}
        <div className="product-actions">
          <button className="action-btn wishlist-btn" title="Thêm vào yêu thích">
            <svg className="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button className="action-btn quick-view-btn" title="Xem nhanh">
            <svg className="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="product-info">
        <div className="product-category">
          {product.category}
        </div>
        
        <Link to={`/product/${product.id}`} className="product-name">
          {product.name}
        </Link>

        <div className="product-rating">
          <div className="stars">
            {renderStars(product.rating)}
          </div>
          <span className="rating-text">
            ({product.reviews} đánh giá)
          </span>
        </div>

        <div className="product-price">
          <span className="current-price">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice > product.price && (
            <span className="original-price">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        <div className="product-description">
          {product.description}
        </div>

        <div className="product-features">
          {product.features.slice(0, 2).map((feature, index) => (
            <div key={index} className="feature-item">
              <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <div className="product-actions-bottom">
          <button 
            className={`add-to-cart-btn ${!product.inStock ? 'disabled' : ''}`}
            disabled={!product.inStock}
          >
            {product.inStock ? 'Thêm vào giỏ' : 'Hết hàng'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
