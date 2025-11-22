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
import { product2 } from "../data/product2";
import ProductAPI from "../service/ProductAPI";

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
  const [thumbnail, setThumbnail] = useState([]);
  const [description, setDescription] = useState('');
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      const response = await ProductAPI.getProductDetail(id)
      console.log('Product detail', response);
      setProduct(response)
    }
    // fetchProduct()
    setProduct(product2.find(p => p.id == id))
  }, [id]);

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
            <ProductGallery images={product?.thumbnail || []} />
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
        <ProductDescriptionTabs description={product?.description} />

        {/* Props (giữ nguyên) */}
        <RelatedProducts
          currentProductId={id}
          categoryId={product?.category_id}
        />
      </div>
    </div>
  );
};

export default ProductDetailPage;