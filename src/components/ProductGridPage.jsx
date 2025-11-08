import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import CategoryDescription from "./CategoryDescription";
import "../styles/pages/ProductGridPage.scss";
import ProductList from "./ProductList";
import { imgCategoryCollection1, productImg1, productImg1Hide, productImg2, productImg2Hide, productImg3, productImg3Hide, productImg4, productImg4Hide, productImg5, productImg5Hide, productImg6, productImg6Hide, tagGift } from '../assets/ExportImage'

// const ProductData =
//   [
//     {
//       id: 1,
//       image: productImg1,
//       imageHide: productImg1Hide,
//       name: 'Áo Chạy Địa Hình Nam Raidlight Maillot de trail R-Light - KAKI',
//       price: 1850000,
//       brand: "Adidas",
//       originalPrice: 0,
//       isBestSeller: false,
//       isDiscount: 0,
//       isGift: false,
//     },
//     {
//       id: 2,
//       image: productImg2,
//       imageHide: productImg2Hide,
//       name: 'Norda 001 | Giày Chạy Địa Hình Nam Norda 001 - Glitch',
//       price: 5907500,
//       brand: "Nike",
//       originalPrice: "6,950,000 VNĐ",
//       isBestSeller: false,
//       isDiscount: 15,
//       isGift: false,
//     },
//     {
//       id: 3,
//       image: productImg3,
//       imageHide: productImg3Hide,
//       name: 'Bondi 9 Wide | Giày Chạy Bộ Nam Hoka Bondi 9 Wide - BBLC',
//       price: 3999000,
//       brand: "Hoka",
//       originalPrice: 0,
//       isBestSeller: false,
//       isDiscount: 0,
//       isGift: true,
//     },
//     {
//       id: 4,
//       image: productImg4,
//       imageHide: productImg4Hide,
//       name: 'Oso Flaco (Winged)| Dép Chạy Nam LUNA Sandals Oso Flaco Winged Ed. Mountain Crystal',
//       price: 2065000,
//       brand: "LUNA",
//       originalPrice: "2,950,000 VNĐ",
//       isBestSeller: false,
//       isDiscount: 30,
//       isGift: false,
//     },
//     {
//       id: 5,
//       image: productImg5,
//       imageHide: productImg5Hide,
//       name: 'Light Speed Compression | Quần Bó Cơ Nam 2XU Light Speed Compression Shorts Mens - BLK/BRF',
//       price: 1691500,
//       brand: "2XU",
//       originalPrice: "1,990,000 VNĐ",
//       isBestSeller: true,
//       isDiscount: 14,
//       isGift: false,
//     },
//     {
//       id: 6,
//       image: productImg6,
//       imageHide: productImg6Hide,
//       name: 'Mono 2.0 (Winged)| Dép Chạy Nam LUNA Sandals Mono 2.0 Winged Ed - Desert Canyon',
//       price: 2065000,
//       brand: "LUNA",
//       originalPrice: "2,950,000 VNĐ",
//       isBestSeller: false,
//       isDiscount: 30,
//       isGift: false,
//     },
//     {
//       id: 7,
//       image: productImg3,
//       imageHide: productImg3Hide,
//       name: 'Bondi 9 Wide | Giày Chạy Bộ Nam Hoka Bondi 9 Wide - BBLC',
//       price: 3999000,
//       brand: "Hoka",
//       originalPrice: 0,
//       isBestSeller: false,
//       isDiscount: 0,
//       isGift: true,
//     },
//     {
//       id: 8,
//       image: productImg4,
//       imageHide: productImg4Hide,
//       name: 'Oso Flaco (Winged)| Dép Chạy Nam LUNA Sandals Oso Flaco Winged Ed. Mountain Crystal',
//       price: 2065000,
//       brand: "LUNA",
//       originalPrice: "2,950,000 VNĐ",
//       isBestSeller: false,
//       isDiscount: 30,
//       isGift: false,
//     },
//     {
//       id: 9,
//       image: productImg5,
//       imageHide: productImg5Hide,
//       name: 'Light Speed Compression | Quần Bó Cơ Nam 2XU Light Speed Compression Shorts Mens - BLK/BRF',
//       price: 1691500,
//       brand: "2XU",
//       originalPrice: "1,990,000 VNĐ",
//       isBestSeller: true,
//       isDiscount: 14,
//       isGift: false,
//     },
//   ]

const ProductGridPage = ({ category, title, description, productData }) => {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(true);
  console.log('productData', productData);
  // === Lấy dữ liệu sản phẩm ===
  useEffect(() => {
    // setProducts(ProductData);
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
  }, [category, sortBy]);




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
      <ProductList products={products} />

      {/* === MÔ TẢ DANH MỤC === */}
      <CategoryDescription description={description} />
    </div>
  );
};

export default ProductGridPage;
