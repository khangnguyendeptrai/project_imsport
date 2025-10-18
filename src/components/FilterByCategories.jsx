import { useState } from "react";

import { GoTriangleRight } from "react-icons/go";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { Link } from "react-router-dom";
import CollapsibleSection from "./CollapsibleSection"

const FilterByCategories = () => {
    const datafake = [
        {
            id: 1,
            categoriesType: "Đồ Nam",
            slug: "do-nam",
            categories: [
                { name: "Giày Chạy Bộ Nam", slug: "giay-chay-bo-nam" },
                { name: "Giày Chạy Địa Hình", slug: "giay-chay-dia-hinh-nam" },
                { name: "Áo Chạy Bộ", slug: "ao-chay-bo-nam" },
                { name: "Quần Chạy Bộ Nam", slug: "quan-chay-bo-nam" },
                { name: "Dép Chạy Bộ Nam", slug: "dep-chay-bo-nam" },
                { name: "Giày Dã Ngoại - Leo Núi", slug: "giay-leo-nui-nam" },
                { name: "Giày LifeStyle Nam", slug: "giay-lifestyle-nam" },
            ],
        },
        {
            id: 2,
            categoriesType: "Đồ Nữ",
            slug: "do-nu",
            categories: [
                { name: "Giày Chạy Bộ Nữ", slug: "giay-chay-bo-nu" },
                { name: "Giày Chạy Địa Hình Nữ", slug: "giay-chay-dia-hinh-nu" },
                { name: "Áo Chạy Bộ Nữ", slug: "ao-chay-bo-nu" },
                { name: "Quần Chạy Bộ Nữ", slug: "quan-chay-bo-nu" },
                { name: "Giày Dã Ngoại - Leo Núi", slug: "giay-leo-nui-nu" },
                { name: "Áo Ngực Chạy Bộ (Bra)", slug: "ao-nguc-chay-bo" },
                { name: "Dép Chạy Bộ Nữ", slug: "dep-chay-bo-nu" },
                { name: "Giày LifeStyle Nữ", slug: "giay-lifestyle-nu" },
            ],
        },
        {
            id: 3,
            categoriesType: "Phụ Kiện",
            slug: "phu-kien",
            categories: [
                { name: "Kính Chạy Bộ", slug: "kinh-chay-bo" },
                { name: "Mũ Chạy Bộ", slug: "mu-chay-bo" },
                { name: "Bó Bắp Chân - Bắp Tay - Tất Bó Cơ", slug: "bo-bap-chan-bap-tay-tat-bo-co" },
                { name: "Tất Chạy Bộ - Tất Xỏ Ngón", slug: "tat-chay-bo-tat-xo-ngon" },
                { name: "Vest Nước Chạy Địa Hình", slug: "vest-nuoc-chay-dia-hinh" },
                { name: "Đèn Chạy Địa Hình - Pin - Sạc", slug: "den-chay-dia-hinh" },
                { name: "Khăn Ống Đa Năng", slug: "khan-ong-da-nang" },
                { name: "Đai Chạy Bộ - Bình Nước Mềm - Túi Nước", slug: "dai-chay-bo-binh-nuoc" },
                { name: "Gậy Chạy Địa Hình", slug: "gay-chay-dia-hinh" },
                { name: "Phụ Kiện Leo Núi", slug: "phu-kien-leo-nui" },
                { name: "Băng Chặn Mồ Hôi Đầu", slug: "bang-chan-mo-hoi-dau" },
                { name: "Phụ Kiện Khác", slug: "phu-kien-khac" },
            ],
        },
        {
            id: 4,
            categoriesType: "Triathlon",
            slug: "triathlon",
            categories: [
                { name: "Quần Áo Triathlon Nam", slug: "quan-ao-triathlon-nam" },
                { name: "Quần Áo Triathlon Nữ", slug: "quan-ao-triathlon-nu" },
                { name: "Giày Triathlon", slug: "giay-triathlon" },
                { name: "Tất Đạp Xe - Tất Triathlon", slug: "tat-triathlon" },
            ],
        },
        {
            id: 5,
            categoriesType: "Đồng Hồ - Tai Nghe",
            slug: "dong-ho-tai-nghe",
            categories: [
                { name: "Đai Tim - Vòng Theo Dõi Sức Khỏe", slug: "dai-tim-vong-theo-doi-suc-khoe" },
                { name: "Đồng Hồ Coros", slug: "dong-ho-coros" },
                { name: "Đồng Hồ Suunto", slug: "dong-ho-suunto" },
                { name: "Đồng Hồ Garmin", slug: "dong-ho-garmin" },
                { name: "Tai Nghe Thể Thao", slug: "tai-nghe-the-thao" },
                { name: "Phụ Kiện Đồng Hồ", slug: "phu-kien-dong-ho" },
            ],
        },
        {
            id: 6,
            categoriesType: "Dinh Dưỡng",
            slug: "dinh-duong",
            categories: [
                { name: "Gel Năng Lượng", slug: "gel-nang-luong" },
                { name: "Phục Hồi - Recovery", slug: "phuc-hoi-recovery" },
                { name: "Thanh Năng Lượng - Energy Bars, Gummies", slug: "thanh-nang-luong" },
                { name: "Bột Năng Lượng - Endurance", slug: "bot-nang-luong" },
                { name: "Muối - Electrolytes - Drinkmix", slug: "muoi-electrolytes" },
                { name: "Điện Giải - Hydration", slug: "dien-giai-hydration" },
            ],
        },
        {
            id: 7,
            categoriesType: "Chấn Thương - Phục Hồi",
            slug: "chan-thuong-phuc-hoi",
            categories: [
                { name: "Băng Dán Cơ", slug: "bang-dan-co" },
                { name: "Bó Gối Chạy Bộ Giảm Chấn Thương", slug: "bo-goi-chay-bo" },
                { name: "Dụng Cụ Bổ Trợ - Phục Hồi - Massage", slug: "dung-cu-phuc-hoi" },
                { name: "Lót Giày Hỗ Trợ Ổn Định Chân", slug: "lot-giay-on-dinh-chan" },
            ],
        },
    ];




    // const (mockupDATA, setMockupData) = useState(datafake);
    const [openCategoryId, setOpenCategoryId] = useState(null);

    const toggleCategory = (id) => {
        setOpenCategoryId(openCategoryId === id ? null : id);
    };
    return (
        
        <div className="inline-block p-4 border-2 border-solid ">
            {/* Sử dụng component CollapsibleSection cho từng mục */}
            <CollapsibleSection title="Danh Mục">
                {datafake.map((item) => (
                    <div key={item.id} className="mb-3">
                        <div
                            className="flex items-center cursor-pointer select-none justify-between"
                        >
                            <div className="flex items-center">
                                <GoTriangleRight
                                    className={`mr-1 transition-transform duration-200 ${openCategoryId === item.id ? "rotate-90" : ""
                                        }`}
                                />
                                <Link to={`/${item.slug}`}>
                                    <span className="text-sm text-gray-700">{item.categoriesType}</span>
                                </Link>
                            </div>


                            <MdOutlineKeyboardArrowDown className="text-xl cursor-pointer" onClick={() => toggleCategory(item.id)} />
                        </div>

                        {openCategoryId === item.id && (
                            <ul className="list-none mt-2 ml-5 text-xs">
                                {item.categories.map((cate) => (
                                    <li
                                        key={cate.slug} // Dùng slug làm key sẽ tốt hơn index
                                        className="pt-1 flex items-center gap-1 text-gray-400"
                                    >
                                        <GoTriangleRight className="text-black text-sm" />
                                        <Link to={`/${cate.slug}`}>
                                            <span className="text-sm text-gray-700">{cate.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </CollapsibleSection>

            <CollapsibleSection title="GIÁ">
                {/* Thêm nội dung filter giá của bạn vào đây */}
                <p className="text-sm text-gray-500">Nội dung lọc theo giá...</p>
            </CollapsibleSection>

            <CollapsibleSection title="KÍCH CỠ">
                {/* Thêm nội dung filter kích cỡ của bạn vào đây */}
                <p className="text-sm text-gray-500">Nội dung lọc theo kích cỡ...</p>
            </CollapsibleSection>

            <CollapsibleSection title="THƯƠNG HIỆU">
                {/* Thêm nội dung filter thương hiệu của bạn vào đây */}
                <p className="text-sm text-gray-500">Nội dung lọc theo thương hiệu...</p>
            </CollapsibleSection>
        </div>

    )
}


export default FilterByCategories;

