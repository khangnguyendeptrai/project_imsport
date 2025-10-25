import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import CategoryDescription from "../components/CategoryDescription";
import "../styles/pages/ProductGridPage.scss";

const ProductGridPage = ({ category, title, description }) => {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(true);

  // === Lấy dữ liệu sản phẩm ===
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/data/products.json");
        if (!response.ok) throw new Error("Không thể tải dữ liệu sản phẩm");

        const data = await response.json();
        const filtered = data.filter(
          (item) =>
            item.category?.toLowerCase() === category.toLowerCase() ||
            item.category?.toLowerCase() === title.toLowerCase()
        );

        if (filtered.length === 0) {
          setProducts([
            {
              id: 1,
              name: "Sản phẩm thử nghiệm - Giày chạy bộ HOKA Clifton 9",
              image:
                "https://pos.nvncdn.com/be3294-43017/ps/20250903_n1EurAs95u.jpeg?v=1756891886",
              price: 3790000,
              oldPrice: 4390000,
              discount: 15,
            },
            {
              id: 2,
              name: "Áo chạy bộ ON Running",
              image:
                "https://pos.nvncdn.com/be3294-43017/ps/20230702_k2xQ9P8L.jpg",
              price: 1290000,
            },
            {
              id: 3,
              name: "Đồng hồ Garmin Forerunner 255",
              image:
                "https://pos.nvncdn.com/be3294-43017/ps/20230702_x5gY7L8v.jpg",
              price: 8490000,
              oldPrice: 9990000,
              discount: 15,
            },
          ]);
        } else {
          setProducts(filtered);
        }
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, title]);

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return b.id - a.id;
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "discount":
        return (b.discount || 0) - (a.discount || 0);
      default:
        return 0;
    }
  });

  return (
    <div className="product-grid-page container">
      {/* === HEADER === */}
      <div className="grid-header">
        <div className="grid-header__left">
          <h2 className="grid-header__title">{title}</h2>
          <span className="grid-header__count">
            ({sortedProducts.length} sản phẩm)
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

      {/* === GRID SẢN PHẨM === */}
      {loading ? (
        <p className="loading">Đang tải sản phẩm...</p>
      ) : sortedProducts.length > 0 ? (
        <div className="products-grid">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="no-products">Không tìm thấy sản phẩm nào.</p>
      )}

      {/* === MÔ TẢ DANH MỤC === */}
      <CategoryDescription description={description} />
    </div>
  );
};

export default ProductGridPage;
