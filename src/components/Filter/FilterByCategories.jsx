import { useState, useEffect } from "react";
import { GoTriangleRight } from "react-icons/go";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import CollapsibleSection from "./CollapsibleSection";
import PriceRangeSlider from "./PriceRangeSlider";
import SizeSelector from "./SizeSelector";
import BrandSelector from "./BrandSelector";
import { dataFilter } from "../../data/dataFilter";

const FilterByCategories = ({ data, products, onFilterChange }) => {
  const location = useLocation();
  //  data =  dataFilter
  // const currentSlug = location.pathname.substring(1);
  // console.log("location",location);
  console.log("Nhận data",data);
  const pathSlug = location.pathname.split('/').filter(Boolean);

  const parentSlug = pathSlug[0] || null
  const childSlug = parentSlug[1] || null
  // 🧩 Chuẩn hóa dữ liệu (tránh lỗi nếu API trả về {data: [...]})
  const normalizedData = Array.isArray(data)
    ? data
    : Array.isArray(data?.data)
      ? data.data
      : [];

  // 🧠 State cho brand và size
  const [brands, setBrands] = useState([]);
  const [sizes, setSizes] = useState([]);

  // 🧮 Khi data thay đổi → tự động trích xuất brand & size
  useEffect(() => {
    if (!normalizedData.length) return;

    const brandSet = new Set();
    const sizeSet = new Set();

    // === Lấy slug hiện tại (VD: "giay-chay-dia-hinh-nam" hoặc "do-nam") ===
    // const slug = currentSlug;

    // === Tìm danh mục phù hợp ===
    // 1️⃣ Nếu slug trùng cấp cha
    const parent = normalizedData.find((item) => item.slug === parentSlug);

    // 2️⃣ Nếu slug trùng cấp con
    let targetCategories = [];
    if (parent) {
      if (childSlug) {
        const child = parent.categories.find((c) => c.slug === childSlug)
        if (child)
          targetCategories[child]
      }
      else {
        targetCategories = parent.categories;
      }
    }
  

    // === Gom toàn bộ sản phẩm thuộc vùng đó ===
    // targetCategories.forEach((cate) => {
      products.forEach((product) => {
    if (product.brand) brandSet.add(product.brand.trim());
    if (product.variations) {
      product.variations.forEach((variation) => {
        if (variation.size) {
          sizeSet.add(variation.size.trim());
        }
      });
    }
  });
  // });
  setBrands([...brandSet]);
  setSizes([...sizeSet]);
}, [normalizedData, parentSlug, childSlug]);

// === Xác định menu nào mở mặc định ===
const findDefaultOpenId = () => {
  const activeParent = normalizedData.find((item) => item.slug === parentSlug);
  if (activeParent) return activeParent.id;

  const activeChildParent = normalizedData.find((item) =>
    item.categories?.some((cate) => cate.slug === childSlug)
  );
  if (activeChildParent) return activeChildParent.id;

  return null;
};

const [openCategoryId, setOpenCategoryId] = useState(findDefaultOpenId());
const toggleCategory = (id) => setOpenCategoryId(openCategoryId === id ? null : id);


const handleSizeChange = (sizes) => {
  onFilterChange({ sizes }); // 📤 gửi lên FilterContainer
};

const handleBrandChange = (brands) => {
  onFilterChange({ brands }); // 📤 gửi lên FilterContainer
};

const handlePriceChange = (price) => {
  onFilterChange({ price });
};
useEffect(() => {
  // 🔄 Mỗi khi đổi slug → reset filter về rỗng
  onFilterChange({
    sizes: [],
    brands: [],
    price: null,
    reset: true, // flag để cha biết cần clear params
  });
}, [parentSlug,childSlug]);
// === Render ===
return (
  <div className="inline-block p-4 w-[256px] md:w-[300px]">
    <CollapsibleSection title="DANH MỤC">
      {normalizedData.map((item) => {
        const isParentActive = item.slug === parentSlug;
        const isChildActive = item.categories?.some(
          (cate) => cate.slug === childSlug
        );
        const shouldHighlightParent = isParentActive || isChildActive;

        return (
          <div
            key={item.id ?? item.slug ?? Math.random()}
            className="mb-3"
          >
            <div className="flex items-start cursor-pointer justify-between pr-1.5">
              <div className="flex items-center" onClick={() => toggleCategory(item.id)}>
                <GoTriangleRight
                  className={`mr-1 transition-transform duration-200 ${openCategoryId === item.id ? "rotate-90" : ""
                    }`}
                />
                <Link to={`/${item.slug}`}>
                  <span
                    className={`text-sm transition-colors duration-150 ${shouldHighlightParent
                      ? "text-[#673AB7]"
                      : "text-gray-700 hover:text-[#673AB7]"
                      }`}
                  >
                    {item.categoriesType}
                  </span>
                </Link>
              </div>

              <MdOutlineKeyboardArrowDown
                className={`text-lg cursor-pointer ${shouldHighlightParent
                  ? "text-[#673AB7]"
                  : "text-gray-700 hover:text-[#673AB7]"
                  }`}
                onClick={() => toggleCategory(item.id)}
              />
            </div>

            {openCategoryId === item.id && (
              <ul className="list-none ml-5 text-xs pr-6 mt-2">
                {item.categories?.map((cate) => {
                  const isChildActive = cate.slug === childSlug;
                  return (
                    <li
                      key={cate.slug ?? cate.name ?? Math.random()}
                      className="pt-1 mt-1 flex items-start gap-1"
                    >
                      <GoTriangleRight
                        className={`text-black text-sm mt-1 ${isChildActive ? "rotate-90" : ""
                          }`}
                      />
                      <Link to={`/${item.slug}/${cate.slug}`}>
                        <span
                          className={`text-sm transition-colors duration-150 ${isChildActive
                            ? "text-[#673AB7]"
                            : "text-gray-700 hover:text-[#673AB7]"
                            }`}
                        >
                          {cate.name}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </CollapsibleSection>

    <CollapsibleSection title="GIÁ">
      <PriceRangeSlider onChange={handlePriceChange} />
    </CollapsibleSection>

    {/* 🔽 Truyền state xuống component con */}
    <CollapsibleSection title="KÍCH CỠ">
      <SizeSelector data={sizes} onChange={handleSizeChange} />
    </CollapsibleSection>

    <CollapsibleSection title="THƯƠNG HIỆU">
      <BrandSelector data={brands} onChange={handleBrandChange} />
    </CollapsibleSection>
  </div>
);
};

export default FilterByCategories;
