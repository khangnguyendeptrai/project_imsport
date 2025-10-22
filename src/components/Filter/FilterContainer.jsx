import { useState, useRef, useLayoutEffect } from "react"; // 1. Import thêm hooks
import { BsLayoutTextSidebar } from "react-icons/bs";
import FilterByCategories from "./FilterByCategories";
import Breadcrumb from "./Breadcrumb";
import { dataFilter } from "../../data/dataFilter";

export default function FilterContainer() {

    const [isOpen, setIsOpen] = useState(false);
    const [drawerWidth, setDrawerWidth] = useState(0); // 2. State để lưu chiều rộng
    const drawerRef = useRef(null); // 3. Ref để "đánh dấu" ngăn kéo

    // 4. Đo chiều rộng
    // Dùng useLayoutEffect để đo trước khi trình duyệt kịp "vẽ", tránh giật (flicker)
    useLayoutEffect(() => {
        if (drawerRef.current) {
            // Lấy chiều rộng thực tế của phần tử
            setDrawerWidth(drawerRef.current.offsetWidth);
        }
    }, []); // Chỉ chạy 1 lần lúc component mount

    // 5. Tính toán vị trí cho nút bấm
    const buttonRightPosition = isOpen ? drawerWidth : 0;

    return (
        <>  
        <Breadcrumb data={dataFilter}/>

            {/* --- Sidebar icon (mobile) --- */}
            <div
                className={`md:hidden absolute top-1/3 transform -translate-y-1/2 transition-all duration-500 z-50`}
                // 6. Gán vị trí động bằng style
                style={{ right: `${buttonRightPosition}px` }}
            >
                {isOpen ? (
                    <button
                        onClick={() => setIsOpen(false)}
                        className="bg-white p-2 rounded-full shadow-lg border text-xl"
                    >
                        ✕
                    </button>
                ) : (
                    <button
                        onClick={() => setIsOpen(true)}
                        className="bg-white p-2 rounded-full shadow-lg border text-xl"
                    >
                        <BsLayoutTextSidebar />
                    </button>
                )}
            </div>

            {/* --- Sidebar filter (desktop) --- */}
            <div className=" inline-block w-auto bg-white h-full border-2 border-solid ">
                <FilterByCategories  data={dataFilter}/>
            </div>

            {/* --- Drawer (mobile) --- */}
            <div
                className={` md:hidden fixed inset-0 z-40 transition-all duration-500 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div
                    ref={drawerRef} // 7. Gắn ref vào đây để đo
                    className="absolute right-0 w-auto bg-white h-full md:hidden   border-2 border-solid z-99" // Dùng w-auto
                >
                    <FilterByCategories data={dataFilter} />
                </div>
            </div>
        </>
    );
}