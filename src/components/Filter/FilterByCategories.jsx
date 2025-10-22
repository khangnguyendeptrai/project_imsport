import { useState } from "react";
import { GoTriangleRight } from "react-icons/go";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import CollapsibleSection from "./CollapsibleSection";
import PriceRangeSlider from "./PriceRangeSlider";
import SizeSelector from "./SizeSelector";
import BrandSelector from "./BrandSelector";

const FilterByCategories = ({ data }) => {
  const location = useLocation();
  const currentSlug = location.pathname.substring(1);

  const findDefaultOpenId = () => {
    const activeParent = data.find(item => item.slug === currentSlug);
    if (activeParent) return activeParent.id;

    const activeChildParent = data.find(item =>
      item.categories?.some(cate => cate.slug === currentSlug)
    );
    if (activeChildParent) return activeChildParent.id;
    
    return null;
  };

  const [openCategoryId, setOpenCategoryId] = useState(findDefaultOpenId());

  const toggleCategory = (id) => {
    setOpenCategoryId(openCategoryId === id ? null : id);
  };

  return (
    <div className="inline-block p-4 w-[256px] md:w-[300px]">
      <CollapsibleSection title="DANH MỤC">
        {data.map((item) => {
          const isParentActive = item.slug === currentSlug;
          const isChildOfThisParentActive = item.categories?.some(
            (cate) => cate.slug === currentSlug
          );
          const shouldHighlightParent = isParentActive || isChildOfThisParentActive;

          return (
            <div key={item.id} className="mb-3">
              <div className="flex items-center cursor-pointer select-none justify-between">
                <div className="flex items-center pr-4">
                  <GoTriangleRight
                    className={`mr-1 transition-transform duration-200 ${
                      openCategoryId === item.id ? "rotate-90" : ""
                    }`}
                  />
                  <Link to={`/${item.slug}`}>
                    {/* === CẬP NHẬT HOVER CHO MỤC CHA === */}
                    <span
                      className={`text-sm cursor-pointer transition-colors duration-150 ${
                        shouldHighlightParent
                          ? "text-[#673AB7]" // Active (giữ nguyên)
                          : "text-gray-700 hover:text-[#673AB7]" // Hover
                      }`}
                    >
                      {item.categoriesType}
                    </span>
                  </Link>
                </div>

                <MdOutlineKeyboardArrowDown
                  className="text-xl cursor-pointer"
                  onClick={() => toggleCategory(item.id)}
                />
              </div>

              {openCategoryId === item.id && (
                <ul className="list-none ml-5 text-xs ">
                  {item.categories.map((cate) => {
                    const isChildActive = cate.slug === currentSlug;

                    return (
                      <li
                        key={cate.slug}
                        className="pt-1 mt-1 flex items-center gap-1"
                      >
                        <GoTriangleRight
                          className={`text-black text-sm ${
                            isChildActive ? "rotate-90" : ""
                          }`}
                        />
                        <Link to={`/${cate.slug}`}>
                          {/* === CẬP NHẬT HOVER CHO MỤC CON === */}
                          <span
                            className={`text-sm cursor-pointer transition-colors duration-150 ${
                              isChildActive
                                ? "text-[#673AB7] " // Active (giữ nguyên)
                                : "text-gray-700 hover:text-[#673AB7] " // Hover
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
        <PriceRangeSlider />
      </CollapsibleSection>

      <CollapsibleSection title="KÍCH CỠ">
        <SizeSelector />
      </CollapsibleSection>

      <CollapsibleSection title="THƯƠG HIỆU">
        <BrandSelector />
      </CollapsibleSection>
    </div>
  );
};

export default FilterByCategories;