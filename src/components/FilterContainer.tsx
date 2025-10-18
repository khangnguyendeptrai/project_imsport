import { useState } from "react";
import { BsLayoutTextSidebar } from "react-icons/bs";
import FilterByCategories from "./FilterByCategories";

export default function FilterContainer() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* --- Sidebar icon (mobile) --- */}
            <div
                className={`md:hidden fixed top-1/3 z-50 transform -translate-y-1/2 transition-all duration-500 ${isOpen ? "right-[60%]" : "right-0"
                    }`}
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
            <div className="hidden md:block w-64 border-r p-4">
                <FilterByCategories />
            </div>

            {/* --- Drawer (mobile) --- */}
            <div
                className={`fixed inset-0 z-40 transition-all duration-500 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="absolute right-0 max-w-xs bg-white h-full ">
                    <FilterByCategories />
                </div>
            </div>
        </>
    );
}
