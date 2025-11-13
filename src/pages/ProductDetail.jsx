import React, { useEffect, useState } from "react";
;

// ẢNH SẢN PHẨM CHÍNH (MAFATE 5)
import { useParams } from "react-router-dom";
import ProductGallery from "../components/ProductGallery";
import ProductInfo from "../components/ProductInfo";
import ProductDescriptionTabs from "../components/ProductDescriptionTabs";
import ProductDescriptionTabsV2 from "../components/ProductDescriptionTabsV2";
import RelatedProducts from "../components/RelatedProducts";

import mafate1 from "../assets/images/aotrail.jpeg";
import mafate2 from "../assets/images/giayhokahide.jpeg";
import mafate3 from "../assets/images/aotrail.jpeg";
import mafate4 from "../assets/images/giayhokahide.jpeg";
import bg from "../assets/images/breadcrumb-bg.png";
import { dataFilter } from "../data/dataFilter";
import { dataNew } from "../data/dataNew";

// === 5 ẢNH MỚI CHO SẢN PHẨM LIÊN QUAN ===
const relatedImg1 = "https://pos.nvncdn.com/be3294-43017/ps/20250904_nM1TbYwBHu.jpeg?v=1756982968";
const relatedImg2 = "https://pos.nvncdn.com/be3294-43017/ps/20251020_QBU4IkPQnR.jpeg?v=1760931464";
const relatedImg3 = "https://pos.nvncdn.com/be3294-43017/ps/20251018_AxzvnupPy1.jpeg?v=1760756722";
const relatedImg4 = "https://pos.nvncdn.com/be3294-43017/ps/20251016_EdLLZPLSr1.jpeg?v=1760608492";
const relatedImg5 = "https://pos.nvncdn.com/be3294-43017/ps/20251006_Wqwz5ZVGeP.jpeg?v=1759724603";

// const navigate = useNavigate(); // <-- XÓA DÒNG LỖI Ở ĐÂY

const ProductDetailPage = () => {
  const [product, setProduct] = useState();
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState('');
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log('dataNew', dataNew[0].categories[0].products.find(product => product.id === Number(id)));
    setProduct(dataNew[0].categories[0].products.find(product => product.id === Number(id)));
    setImages(dataNew[0].categories[0].products.find(product => product.id === Number(id)).thumbnail);
    setDescription(dataNew[0].categories[0].products.find(product => product.id === Number(id)).description);
  }, []);

  // Dữ liệu cho sản phẩm chính (MAFATE 5)
  // const images = [mafate1, mafate2, mafate3, mafate4,];
  const currentProductId = "SV-1168723-NNR"; // ID sản phẩm chính
  const currentProductCategory = "Giày"; // (Vì đang xem "MAFATE 5 | GIÀY...")

const handleRealAddToCart = (productData) => {
    console.log("Sản phẩm cần thêm vào giỏ hàng:", productData);
    // productData sẽ là: { code: "...", name: "...", price: "...", selectedSize: "M", quantity: 1 }
    
    // TẠI ĐÂY, bạn sẽ implement logic (Rule 4 và 5):
    // 1. Kiểm tra xem sản phẩm (dựa vào 'code' và 'selectedSize') đã có trong giỏ hàng chưa.
    // 2. Nếu chưa (Rule 4) => Thêm item mới vào cart.
    // 3. Nếu đã có (Rule 5) => Cập nhật (cộng dồn) số lượng cho item đó.
};

  const highlights = [
    "Đế Vibram® Megagrip 5mm",
    "Đệm hai lớp siêu êm (PEBA Foam)",
    "Công nghệ MetaRocker™ mới",
    "Upper dệt Warp knit chống rách",
    "Hỗ trợ gắn gaiter bảo vệ cổ chân",
     "Drop: 8mm",
    "Trọng lượng: 286g (Nữ), 332g (Nam)",
  ];

  // === DỮ LIỆU SẢN PHẨM LIÊN QUAN ===
  const relatedProducts = [
    {
      id: "NORDA-001A",
      image: relatedImg1,
      imageHide: relatedImg2,
      name: "Norda 001A | Giày Chạy Địa Hình Nam Norda 001A",
      price: 7300000,
      originalPrice: 6950000,
      category: "Giày",
    },
    {
      id: "NORDA-001",
      image: relatedImg2,
      imageHide: relatedImg3,
      name: "Norda 001 | Giày Chạy Địa Hình Nam Glitch",
      price: 5907500,
      originalPrice: 6950000,
      category: "Giày",
    },
    {
      id: "SV-1168723-NNR",
      image: mafate1,
      imageHide: mafate2,
      name: "MAFATE 5 | GIÀY CHẠY ĐỊA HÌNH NỮ HOKA MAFATE 5 - NNR",
      price: 4599000,
      originalPrice: 6950000,
      category: "Giày",
    },
    {
      id: "SPEEDGOAT-6",
      image: relatedImg3,
      imageHide: relatedImg4,
      name: "Speedgoat 6 Wide | Giày Chạy Địa Hình Nam Hoka",
      price: 3999000,
      originalPrice: 6950000,
      category: "Giày",
    },
    {
      id: "TOMIR-2.0",
      image: relatedImg4,
      imageHide: relatedImg5,
      name: "Tomir 2.0 | Giày Chạy Địa Hình NNormal Tomir 2.0",
      price: 5990000,
      originalPrice: 6950000,
      category: "Giày",
    },
    {
      id: "NEW-PRODUCT-5",
      image: relatedImg5,
      imageHide: relatedImg1,
      name: "Sản Phẩm Mới | Giày Chạy Bộ Nam Nhanh Nhất",
      price: 3500000,
      originalPrice: 0,
      category: "Giày",
    },
    {
      id: "NEW-PRODUCT-6",
      image: relatedImg1,
      imageHide: relatedImg3,
      name: "Sản Phẩm Khác | Áo Khoác Chạy Mưa Siêu Nhẹ",
      price: 2100000,
      originalPrice: 0,
      category: "Áo",
    },
  ];


  return (
    <div className="">
      {/* Breadcrumb (giữ nguyên) */}
      <div
        style={{ backgroundImage: `url(${bg})` }}
        className="h-24 md:h-30 text-sm text-gray-700 mb-8 p-4 rounded-lg shadow-sm flex items-center"
      >
        <div className="container mx-auto">
          <a href="#" className="hover:text-[#673AB7]">Trang chủ</a> /
          <a href="#" className="hover:text-[#673AB7]"> Đồ Nữ</a> /
          <a href="#" className="hover:text-[#673AB7]"> Giày Chạy Địa Hình Nữ</a>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="container">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="md:w-1/2">
            <ProductGallery images={images || []} />
          </div>

          <div className="md:w-3/5 flex-1 h-full">
            <ProductInfo
              product={product}
              sizes={["36", "38", "38 2/3", "39 1/3", "40", "40 2/3", "41 1/3"]}
              highlights={highlights}
              onAddToCart={handleRealAddToCart}
            />
          </div>
        </div>

        {/* 🟢 Hiển thị component tùy theo id */}
        {/* {id === "2" ? (
          <ProductDescriptionTabs />
        ) : id === "4" ? (
          <ProductDescriptionTabsV2 />
        ) : (
          <ProductDescriptionTabs /> // mặc định
        )} */}
        <ProductDescriptionTabs description={description} />

        {/* Props (giữ nguyên) */}
        <RelatedProducts
          currentProductId={id}
          
        />
      </div>
    </div>
  );
};

export default ProductDetailPage;