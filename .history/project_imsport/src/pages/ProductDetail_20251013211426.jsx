import React from "react";
import ProductGallery from "../components/";
import ProductInfo from "./ProductInfo";

// ảnh demo import từ thư mục assets
import mafate1 from "../assets/mafate1.png";
import mafate2 from "../assets/mafate2.png";
import mafate3 from "../assets/mafate3.png";

const ProductDetailPage = () => {
  const images = [mafate1, mafate2, mafate3];

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
    <div className="px-4 md:px-12 py-8 text-gray-800">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
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

      <div className="flex flex-col md:flex-row gap-10">
        {/* Ảnh bên trái */}
        <div className="md:w-1/2">
          <ProductGallery images={images} />
        </div>

        {/* Thông tin bên phải */}
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
  );
};

export default ProductDetailPage;
