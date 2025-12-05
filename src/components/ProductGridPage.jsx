import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import CategoryDescription from "./CategoryDescription";
import "../styles/pages/ProductGridPage.scss";
import ProductList from "./ProductList";
import { useTranslation } from "react-i18next";
import i18n from "../i18next/i18next";

const ProductGridPage = ({ category, title, description, productData }) => {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

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
            ({products.length} {t("products.products")})
          </span>
        </div>

        <div className="grid-header__right">
          <select
            id="sortSelect"
            onChange={(e) => setSortBy(e.target.value)}
            value={sortBy}
          >
            <option value="">--{t("products.sortByDefault")}--</option>
            <option value="newest">{t("products.newest")}</option>
            <option value="price-asc">{t("products.priceLowToHigh")}</option>
            <option value="price-desc">{t("products.priceHighToLow")}</option>
            <option value="discount">{t("products.discount")}</option>
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
        <p className="no-products">{t("products.noProducts")}</p>
      )}

      {/* === MÔ TẢ DANH MỤC === */}
      <CategoryDescription description={description} />
    </div>
  );
};

export default ProductGridPage;
