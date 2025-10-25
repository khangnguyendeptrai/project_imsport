import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import '../styles/pages/ProductDetail.scss';

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="product-not-found">
        <div className="container">
          <h1 className="not-found-title">Sản phẩm không tồn tại</h1>
          <p className="not-found-text">Sản phẩm bạn đang tìm kiếm không có trong hệ thống.</p>
          <Link to="/" className="btn-primary">
            Quay về trang chủ
          </Link>
        </div>
      </div>
    );
  }

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

  const productImages = [
    product.image,
    product.image, // In real app, you'd have multiple images
    product.image,
    product.image
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['Đen', 'Trắng', 'Xanh', 'Đỏ', 'Vàng'];

  return (
    <div className="product-detail-page">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-link">Trang chủ</Link>
          <span className="breadcrumb-separator">/</span>
          <Link to="/products" className="breadcrumb-link">Sản phẩm</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{product.name}</span>
        </nav>

        <div className="product-detail-content">
        {/* Product Images */}
<div className="product-images">
  <div className="thumbnail-nav">
    <button
      className="arrow-btn up"
      onClick={() => setSelectedImage(prev => Math.max(0, prev - 1))}
      disabled={selectedImage === 0}
    >
      ▲
    </button>

    <div className="thumbnail-list">
      {productImages.map((image, index) => (
        <button
          key={index}
          className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
          onClick={() => setSelectedImage(index)}
        >
          <img src={image} alt={`${product.name} ${index + 1}`} />
        </button>
      ))}
    </div>

    <button
      className="arrow-btn down"
      onClick={() => setSelectedImage(prev => Math.min(productImages.length - 1, prev + 1))}
      disabled={selectedImage === productImages.length - 1}
    >
      ▼
    </button>
  </div>

  <div className="main-image">
    <img
      src={productImages[selectedImage]}
      alt={product.name}
      className="main-image-img"
    />
  </div>
</div>


          {/* Product Info */}
          <div className="product-info">
            <div className="product-header">
              <div className="product-category">{product.category}</div>
              <h1 className="product-title">{product.name}</h1>
              <div className="product-rating">
                <div className="stars">
                  {renderStars(product.rating)}
                </div>
                <span className="rating-text">
                  {product.rating} ({product.reviews} đánh giá)
                </span>
              </div>
            </div>

            <div className="product-price">
              <span className="current-price">{formatPrice(product.price)}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="original-price">{formatPrice(product.originalPrice)}</span>
                  <span className="discount-badge">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            <div className="product-description">
              <p>{product.description}</p>
            </div>

            {/* Product Options */}
            <div className="product-options">
              {/* Size Selection */}
              <div className="option-group">
                <label className="option-label">Kích thước:</label>
                <div className="size-options">
                  {sizes.map(size => (
                    <button
                      key={size}
                      className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="option-group">
                <label className="option-label">Màu sắc:</label>
                <div className="color-options">
                  {colors.map(color => (
                    <button
                      key={color}
                      className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selection */}
              <div className="option-group">
                <label className="option-label">Số lượng:</label>
                <div className="quantity-selector">
                  <button 
                    className="quantity-btn"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Product Actions */}
            <div className="product-actions">
              <button 
                className={`add-to-cart-btn ${!product.inStock ? 'disabled' : ''}`}
                disabled={!product.inStock}
              >
                {product.inStock ? 'Thêm vào giỏ hàng' : 'Hết hàng'}
              </button>
              <button className="buy-now-btn">
                Mua ngay
              </button>
              <button className="wishlist-btn">
                <svg className="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {/* Product Features */}
            <div className="product-features">
              <h3 className="features-title">Tính năng nổi bật</h3>
              <ul className="features-list">
                {product.features.map((feature, index) => (
                  <li key={index} className="feature-item">
                    <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Product Details */}
            <div className="product-details">
              <h3 className="details-title">Thông tin chi tiết</h3>
              <div className="details-content">
                <div className="detail-item">
                  <span className="detail-label">Thương hiệu:</span>
                  <span className="detail-value">Apple</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Mã sản phẩm:</span>
                  <span className="detail-value">SP-{product.id.toString().padStart(3, '0')}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Tình trạng:</span>
                  <span className={`detail-value ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                    {product.inStock ? 'Còn hàng' : 'Hết hàng'}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Bảo hành:</span> 
                  <span className="detail-value">12 tháng</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
