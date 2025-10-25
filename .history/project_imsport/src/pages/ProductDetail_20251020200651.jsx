import React from "react";
import ProductGallery from "../components/ProductGallery";
import ProductInfo from "../components/ProductInfo";

// ảnh demo import từ thư mục assets
import mafate1 from "../assets/images/aotrail.jpeg";
import mafate2 from "../assets/images/giayhokahide.jpeg";
import mafate3 from "../assets/images/aotrail.jpeg";
import mafate4 from "../assets/images/giayhokahide.jpeg";
import mafate5 from "../assets/images/aotrail.jpeg";
import mafate6 from "../assets/images/giayhokahide.jpeg";
import bg from "../assets/images/breadcrumb-bg.png";

const ProductDetailPage = () => {
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
      <div
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="h-30 md:h-30 text-sm text-gray-700 mb-8 p-4 rounded-lg shadow-sm flex items-center"
      >
        <div className="container mx-auto mb">
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
      <div className="container mx-auto">
        {/* Breadcrumb */}


        {/* Nội dung chính */}
        <div className="flex flex-col md:flex-row gap-10">
          {/* Ảnh bên trái */}
          <div className="md:w-1/2">
            <ProductGallery images={images} />
          </div>

          {/* Thông tin bên phải */}
          <div className="md:w-1/2">
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
      </div>
    </div>
  );
};

export default ProductDetailPage;
