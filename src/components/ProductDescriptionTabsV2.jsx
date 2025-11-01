import React, { useState } from "react";
import { chitietao, sizeao } from "../assets/ExportImage";

const componentData = {
    "Tên sản phẩm": "Áo Chạy Bộ Nam On Running Men's Pace Mesh-T - Black/Horizon",
    "Thương hiệu": "On Running",
    "Kích cỡ": ["XS", "S", "M", "L"],
    "Đặc điểm": [
        "Chất liệu CleanCloud® Polyester",
        "Siêu nhẹ và thoáng khí",
        "Co giãn linh hoạt và mềm mại",
        "Logo phản quang của On",
        "Phong cách năng động và hiện đại",
        "Đường viền không may",
        "Mắt cài số bib tích hợp",

    ],
};

const detailDescriptionHTML = `
  <div class="p-0"> 
    <h3 class="text-xl font-bold mb-3">Áo chạy bộ On Pace Mesh-T</h3>
    <p class="mb-8">
     Hiệu suất cao – Siêu nhẹ – Thoáng khí tối đa
     <br/>
     Được thiết kế dành riêng cho các vận động viên chạy bộ, Pace Mesh-T kết hợp giữa hiệu suất vượt trội và sự thoải mái tối đa.
    </p>
    <div class="mb-8">
      <img src="${chitietao}" alt="Hình ảnh chi tiết sản phẩm" class="w-full h-auto object-cover mb-3"/>
    </div>
    <h4 class="font-bold mt-4 mb-2">Tính năng nổi bật</h4>
    <ul class="list-disc list-inside ml-4 mb-4 space-y-1">
      <li>Chất liệu CleanCloud® Polyester: Sử dụng sợi polyester tái chế từ khí thải carbon, mang lại cảm giác mềm mại và co giãn tuyệt vời.</li>
      <li>Siêu nhẹ và thoáng khí: Thiết kế giúp duy trì sự mát mẻ và khô ráo trong suốt quá trình chạy.</li>
      <li>Co giãn linh hoạt và mềm mại: Tạo cảm giác thoải mái tối đa, cho phép chuyển động tự nhiên mà không bị hạn chế.</li>
      <li>Logo phản quang của On: Tăng khả năng nhận diện trong điều kiện ánh sáng yếu, đảm bảo an toàn khi chạy vào sáng sớm hoặc chiều tối.</li>
        <li>Chi tiết đồ họa lấy cảm hứng từ văn hóa chạy bộ: Mang đến phong cách năng động và hiện đại.</li>
          <li>Đường viền không may (bonded hems): Giảm thiểu ma sát, tăng cường sự thoải mái và độ bền cho sản phẩm.</li>
            <li>Mắt cài số bib tích hợp: Giúp giữ số bib chắc chắn mà không làm hỏng áo.</li>
    </ul>
    <h4 class="font-bold mt-4 mb-2">Phom dáng & chất liệu</h4>
    <ul class="list-disc list-inside ml-4 mb-4 space-y-1">
      <li>Phom dáng: Regular fit – vừa vặn với cơ thể, không quá ôm sát.</li>
      <li>Chất liệu chính: 81% Polyester, 19% Elastane.</li>
      <li>Viền cổ: 97% Polyester tái chế, 3% Elastane. </li>
    </ul>
    <h4 class="font-bold mt-4 mb-2">Hướng dẫn bảo quản</h4>
    <ul class="list-disc list-inside ml-4 mb-4 space-y-1">
      <li>Giặt tay hoặc máy ở chế độ lạnh và nhẹ nhàng</li>
      <li>Không dùng thuốc tẩy</li>
      <li>Không giặt khô</li>
      <li>Không ủi (là)</li>
      <li>Có thể sấy khô ở nhiệt độ thấp</li>
      <li>Giặt mặt trái áo.</li>
          <li>Giặt riêng với đồ khác</li>
          Pace Mesh-T là lựa chọn hoàn hảo cho những runner đề cao cảm giác nhẹ, thoáng và hiệu suất. Dù là chạy luyện tập hay ngày thi đấu, chiếc áo này sẽ giúp bạn di chuyển tự nhiên và tự tin hơn mỗi km.
    </ul>
    <h4 class="font-bold mt-6 mb-3 ">Bảng size tham khảo</h4>
    <img src="${sizeao}" alt="Bảng size giày" class="w-full h-auto object-cover mb-3"/>
  </div>
`;

const ComponentContent = ({ data }) => {
    const keys = Object.keys(data);
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <tbody>
                    {keys.map((key, index) => (
                        <tr
                            key={key}
                            className={`${index % 2 === 0 ? "bg-[#f5f5f5]" : "bg-white"
                                } border-b border-gray-200 last:border-b-0`}
                        >
                            <td className="px-6 py-4 font-medium w-2/4 text-gray-700 border-r border-gray-200">
                                {key}
                            </td>
                            <td className="px-6 py-4 whitespace-pre-wrap w-2/3 text-gray-900">
                                {Array.isArray(data[key]) ? (
                                    <ul className="list-none space-y-1">
                                        {data[key].map((item, itemIndex) => (
                                            <li key={itemIndex} className="text-sm flex items-start">
                                                <span className="mr-2 text-lg leading-none">•</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <span className="text-sm">{data[key]}</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const ProductDescriptionTabs = () => {
    const [activeTab, setActiveTab] = useState("Mô tả chi tiết");
    const tabs = ["Mô tả chi tiết", "Thành phần"];

    const renderContent = (tab) => {
        switch (tab) {
            case "Mô tả chi tiết":
                return (
                    <div
                        className="prose max-w-none text-gray-700"
                        dangerouslySetInnerHTML={{ __html: detailDescriptionHTML }}
                    />
                );
            case "Thành phần":
                return <ComponentContent data={componentData} />;
            default:
                return null;
        }
    };

    return (
        <div className="mt-10 mb-20">
            {/* --- DESKTOP VERSION --- */}
            <div className="hidden md:block">
                <div className="flex border-b border-gray-300">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 text-sm font-semibold transition-all duration-200 ease-in-out border border-gray-300 -mb-px 
                ${activeTab === tab
                                    ? "text-white bg-[#673AB7] border-b-white scale-105"
                                    : "text-gray-600 hover:bg-gray-100 bg-gray-50 border-t border-x"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="border border-gray-300 rounded-b">
                    {activeTab === "Thành phần" ? (
                        <div className="p-4 md:px-5 md:py-10">
                            <div className="border border-gray-300">
                                {renderContent(activeTab)}
                            </div>
                        </div>
                    ) : activeTab === "Mô tả chi tiết" ? (
                        <div className="p-4 md:px-40 md:py-10">
                            {renderContent(activeTab)}
                        </div>
                    ) : (
                        <div className="p-4">{renderContent(activeTab)}</div>
                    )}
                </div>
            </div>

            {/* --- MOBILE VERSION --- */}
            <div className="md:hidden">
                <div className="flex flex-col space-y-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => activeTab !== tab && setActiveTab(tab)}
                            className={`relative flex justify-between items-center text-base font-medium text-left px-3 py-2 bg-white ${activeTab === tab ? "text-[#673AB7]" : "text-gray-800"
                                }`}
                        >
                            <span>{tab}</span>
                            {activeTab !== tab && (
                                <span className="absolute right-3 text-gray-600 text-lg select-none">
                                    ⌄
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                <div className="mt-3">
                    {activeTab && (
                        <div className="border border-gray-200 p-3 bg-white">
                            {renderContent(activeTab)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDescriptionTabs;
