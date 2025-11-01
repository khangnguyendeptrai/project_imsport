import React from "react";
import { useParams } from "react-router-dom";
import ProductGallery from "../components/ProductGallery";
import ProductInfo from "../components/ProductInfo";
import ProductDescriptionTabs from "../components/ProductDescriptionTabs";
import ProductDescriptionTabsV2 from "../components/ProductDescriptionTabsV2";

import mafate1 from "../assets/images/aotrail.jpeg";
import mafate2 from "../assets/images/giayhokahide.jpeg";
import mafate3 from "../assets/images/aotrail.jpeg";
import mafate4 from "../assets/images/giayhokahide.jpeg";
import mafate5 from "../assets/images/aotrail.jpeg";
import mafate6 from "../assets/images/giayhokahide.jpeg";
import bg from "../assets/images/breadcrumb-bg.png";

const ProductDetailPage = () => {
  const { id } = useParams(); // 🟢 Lấy id từ URL: /product/:id

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
          {/* Ảnh bên trái */}
          <div className="md:w-1/2">
            <ProductGallery images={images} />
          </div>

          {/* Thông tin bên phải */}
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

        {/* 🟢 Hiển thị component tùy theo id */}
        {id === "2" ? (
          <ProductDescriptionTabs />
        ) : id === "4" ? (
          <ProductDescriptionTabsV2 />
        ) : (
          <ProductDescriptionTabs /> // mặc định
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
