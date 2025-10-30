import React, { useEffect } from "react";
import ProductGallery from "../components/ProductGallery";
import ProductInfo from "../components/ProductInfo";
import RelatedProducts from "../components/RelatedProducts"; 

// ảnh demo import từ thư mục assets
import mafate1 from "../assets/images/aotrail.jpeg";
import mafate2 from "../assets/images/giayhokahide.jpeg";
import mafate3 from "../assets/images/aotrail.jpeg";
import mafate4 from "../assets/images/giayhokahide.jpeg";
import bg from "../assets/images/breadcrumb-bg.png";

const ProductDetailPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const images = [mafate1, mafate2, mafate3, mafate4, mafate5, mafate6];

  const highlights = [
    "Đế Vibram® Megagrip 5mm",
    "Đệm hai lớp siêu êm (PEBA Foam)",
    "Công nghệ MetaRocker™ mới",
    "Upper dệt Warp knit chống rách",
    "Hỗ trợ gắn gaiter bảo vệ cổ chân",
    "Drop: 8mm",
    "Trọng lượng: 286g (Nữ), 332g (Nam)",
  ];

  const relatedProducts = [
    {
      image: mafate2,
      name: "Norda 001A | Giày Chạy Địa Hình Nam Norda 001A",
      brand: "IMSPORTS",
      price: 7300000,
      tag: "Men",
    },
    {
      image: mafate3,
      name: "Norda 001 | Giày Chạy Địa Hình Nam Glitch",
      brand: "IMSPORTS",
      price: 5907500,
      oldPrice: 6950000,
      discount: 15,
      tag: "Men",
    },
    {
      image: mafate1,
      name: "Speedgoat 6 Wide | Giày Chạy Địa Hình Nam Hoka",
      brand: "IMSPORTS",
      price: 3999000,
      tag: "Wide-2E",
    },
    {
      image: mafate4,
      name: "Tomir 2.0 | Giày Chạy Địa Hình NNormal Tomir 2.0",
      brand: "IMSPORTS",
      price: 5990000,
      tag: "Men",
    },
  ];

  const handleProductClick = (product) => {
    alert(`Đi đến chi tiết sản phẩm: ${product.name}`);
  };

  return (
    <div className="">
      {/* Breadcrumb */}
      <div
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="h-24 md:h-30 text-sm text-gray-700 mb-8 p-4 rounded-lg shadow-sm flex items-center"
      >
        <div className="container mx-auto">
          <a href="#" className="hover:text-[#673AB7]">
            Trang chủ
          </a>{" "}
          /{" "}
          <a href="#" className="hover:text-[#673AB7]">
            Đồ Nữ
          </a>{" "}
          /{" "}
          <a href="#" className="hover:text-[#673AB7]">
            Giày Chạy Địa Hình Nữ
          </a>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="container">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="md:w-1/2">
            <ProductGallery images={images} />
          </div>

          <div className="md:w-3/5 flex-1 h-full">
            <ProductInfo
              name="MAFATE 5 | GIÀY CHẠY ĐỊA HÌNH NỮ HOKA MAFATE 5 - NNR"
              brand="HOKA"
              code="SV-1168723-NNR"
              price="4,599,000 VNĐ"
              sizes={["36", "38", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3"]}
              highlights={highlights}
            />
          </div>
        </div>

        {/* SẢN PHẨM LIÊN QUAN */}
        <RelatedProducts
          relatedProducts={relatedProducts}
          onProductClick={handleProductClick}
        />
      </div>
    </div>
  );
};

export default ProductDetailPage;
