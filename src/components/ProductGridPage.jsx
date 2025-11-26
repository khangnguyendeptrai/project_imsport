import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import CategoryDescription from "./CategoryDescription";
import "../styles/pages/ProductGridPage.scss";
import ProductList from "./ProductList";


const ProductGridPage = ({ category, title, description, productData }) => {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(true);
  console.log('productData', productData);
  // === Lấy dữ liệu sản phẩm ===
  useEffect(() => {
    setProducts(productData);

    if (!sortBy) {
      setProducts(productData);
    } else {
      const sortedProducts = [...products].sort((a, b) => {
        switch (sortBy) {
          case "newest":
            return b.id - a.id;
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "discount":
            return (b.isDiscount || 0) - (a.isDiscount || 0);
          default:
            return 0;
        }
      });
      setProducts(sortedProducts);
    };

    // fetchProducts();
  }, [category, sortBy, productData]);




  return (
    <div className="product-grid-page">
      {/* === HEADER === */}
      <div className="grid-header">
        <div className="grid-header__left">
          <h2 className="grid-header__title">{title}</h2>
          <span className="grid-header__count">
            ({products.length} sản phẩm)
          </span>
        </div>

        <div className="grid-header__right">
          <select
            id="sortSelect"
            onChange={(e) => setSortBy(e.target.value)}
            value={sortBy}
          >
            <option value="">--Sắp xếp theo--</option>
            <option value="newest">Sản phẩm mới nhất</option>
            <option value="price-asc">Giá thấp đến cao</option>
            <option value="price-desc">Giá cao đến thấp</option>
            <option value="discount">Đang giảm giá</option>
          </select>
        </div>
      </div>

      {/* {loading ? (
        <p className="loading">Đang tải sản phẩm...</p>
      ) : sortedProducts.length > 0 ? (
        <div className="products-grid">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="no-products">Không tìm thấy sản phẩm nào.</p>
      )} */}
      {products.length > 0 ? (
        <ProductList products={products} />
      ) : (
        <p className="no-products">Không tìm thấy sản phẩm nào.</p>
      )}

      {/* === MÔ TẢ DANH MỤC === */}
      <CategoryDescription description={description} />
    </div>
  );
};

export default ProductGridPage;
