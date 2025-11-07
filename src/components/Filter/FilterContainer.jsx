import { useState, useRef, useLayoutEffect } from "react";
// BsLayoutTextSidebar không còn dùng, FaAlignRight đã được import
import FilterByCategories from "./FilterByCategories";
import Breadcrumb from "./Breadcrumb";
import { dataFilter } from "../../data/dataFilter";
import { FaAlignRight } from "react-icons/fa";
import ProductList from "../ProductList";
import ProductGridPage from "../ProductGridPage";
import ProductCategoryPage from "../../pages/ProductCategoryPage";

export default function FilterContainer(data) {

    const [isOpen, setIsOpen] = useState(false);
    const [drawerWidth, setDrawerWidth] = useState(0);
    const drawerRef = useRef(null);

    useLayoutEffect(() => {
        if (isOpen && drawerRef.current) {
            setDrawerWidth(drawerRef.current.offsetWidth);
        }
    }, [isOpen]);

    const buttonRightPosition = isOpen ? drawerWidth : 0;

    // --- Tách style chung ra cho dễ đọc ---
    const buttonStyle = "bg-[#673AB7] text-white p-2 shadow-lg text-xl w-10 h-10 flex items-center justify-center";

    return (
        <>
            {/* <Breadcrumb data={dataFilter} /> */}

            {/* --- Sidebar icon (mobile) --- */}
            <div
                className={`md:hidden fixed  top-1/3 transform -translate-y-1/2 transition-all duration-500 z-[200]`}
                style={{ right: `${buttonRightPosition}px` }}
            >

                {/* SỬA Ở ĐÂY: Quay lại 2 button riêng biệt */}
                {isOpen ? (
                    // --- Nút ĐÓNG (✕) ---
                    <button
                        onClick={() => setIsOpen(false)}
                        className={`${buttonStyle} font-black`} // Thêm style chung
                    >
                        ✕
                    </button>
                ) : (
                    // --- Nút MỞ (Icon) ---
                    <button
                        onClick={() => setIsOpen(true)}
                        className={buttonStyle} // Thêm style chung
                    >
                        <FaAlignRight />
                    </button>
                )}
            </div>

            {/* --- Sidebar filter (desktop) --- */}
            


            {/* --- Drawer (mobile) --- */}
            <div
                className={` md:hidden fixed inset-0 z-[150] transition-all duration-500 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div
                    ref={drawerRef}
                    className="absolute right-0 w-auto bg-white h-full md:hidden   border-2 border-solid z-[200]"
                >
                    <FilterByCategories data={data} />
                </div>
            </div>
            <div className="hidden md:flex inline-block w-auto bg-white h-full border-2 border-solid "> <FilterByCategories data={data} /> </div>
            </>
    );
}