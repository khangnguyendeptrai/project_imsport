import React, { useEffect, useState, useRef } from "react";
import ProductCard from "../components/ProductCard";
import "../styles/pages/ProductGridPage.scss";

interface ProductGridPageProps {
  category: string;
  title: string;
  description?: string;
}

const ProductGridPage: React.FC<ProductGridPageProps> = ({
  category,
  title,
  description,
}) => {
  const [products, setProducts] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(true);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [showReadMoreButton, setShowReadMoreButton] = useState(false);
  const descRef = useRef<HTMLDivElement>(null);

  // === Lấy dữ liệu sản phẩm ===
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await fetch("/data/products.json");
        if (!response.ok) throw new Error("Không thể tải dữ liệu sản phẩm");

        const data = await response.json();

        const filtered = data.filter(
          (item: any) =>
            item.category?.toLowerCase() === category.toLowerCase() ||
            item.category?.toLowerCase() === title.toLowerCase()
        );

        if (filtered.length === 0) {
          // Nếu không có dữ liệu thật → hiển thị sản phẩm mẫu
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
        // Hiển thị sản phẩm mẫu nếu fetch lỗi
        setProducts([
          {
            id: 1,
            name: "Sản phẩm mẫu - Giày chạy bộ HOKA Clifton 9",
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
              "https://pos.nvncdn.com/be3294-43017/ps/20250609_rmhy0z22Wk.jpeg?v=1749466077",
            price: 1290000,
          },
            {
              id: 3,
              name: "Đồng hồ Garmin Forerunner 255",
              image:
                "https://pos.nvncdn.com/be3294-43017/ps/20231130_9lWgd5JLu4.jpeg?v=1701342891",
              price: 8490000,
              oldPrice: 9990000,
              discount: 15,
            },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, title]);

  // === Kiểm tra có cần nút đọc thêm (desktop) ===
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      if (descRef.current) {
        if (isMobile) {
          setIsOverflowing(false);
          setShowFullDesc(true);
        } else {
          setIsOverflowing(descRef.current.scrollHeight > 400);
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [description]);

  // === Hiển thị nút đọc thêm khi scroll xuống khoảng 400px ===
  useEffect(() => {
    const handleScroll = () => {
      setShowReadMoreButton(window.scrollY >= 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDesc = () => setShowFullDesc(!showFullDesc);

  // === Sắp xếp sản phẩm ===
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
      {description && (
        <div
          className={`category-description ${
            showFullDesc ? "expanded" : "collapsed"
          }`}
        >
          <div
            ref={descRef}
            className="category-description__content"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          {isOverflowing && showReadMoreButton && (
            <div className="read-more">
              <button onClick={toggleDesc}>
                {showFullDesc ? "Thu gọn ▲" : "Đọc thêm ▼"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductGridPage;
