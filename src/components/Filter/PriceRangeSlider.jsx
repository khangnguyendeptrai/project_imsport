import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { useTranslation } from "react-i18next";
import i18n from "../../i18next/i18next";
// === KHAI BÁO HẰNG SỐ LÊN ĐẦU ===
const INITIAL_MIN = 0;
const INITIAL_MAX = 20000000;

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  })
    .format(price)
    .replace("₫", "đ");


// ===============================================
// SỬA 1: Dùng { onChange } để nhận prop chính xác
// ===============================================
export default function PriceFilter({ onChange }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(true);
  const { t } = useTranslation();
  // Helper an toàn để lấy giá trị từ URL
  const getPriceFromUrl = () => {
    const priceParam = searchParams.get("price"); // "100:5000" or null
    const priceParts = priceParam ? priceParam.split(":") : null; // ["100", "5000"] or null
    
    const min = Number(priceParts?.[0] || INITIAL_MIN); // Dùng ?. để tránh lỗi
    const max = Number(priceParts?.[1] || INITIAL_MAX);

    return {
      min: isNaN(min) ? INITIAL_MIN : min,
      max: isNaN(max) ? INITIAL_MAX : max,
    };
  };

  // Lấy giá trị ban đầu từ URL
  const { min: urlMin, max: urlMax } = getPriceFromUrl();

  // State "chính thức" cho thanh trượt
  const [minPrice, setMinPrice] = useState(urlMin);
  const [maxPrice, setMaxPrice] = useState(urlMax);

  // State "nháp" cho ô input
  const [inputMin, setInputMin] = useState(urlMin);
  const [inputMax, setInputMax] = useState(urlMax);

  const [errors, setErrors] = useState({ min: "", max: "", general: "" });

  // ===============================================
  // SỬA 2: Gộp 2 useEffect làm 1.
  // Khi URL thay đổi (ví dụ: nhấn Back), cập nhật lại TOÀN BỘ state
  // ===============================================
  useEffect(() => {
    const { min, max } = getPriceFromUrl();
    setMinPrice(min);
    setMaxPrice(max);
    setInputMin(min);
    setInputMax(max);
  }, [searchParams]); // Chỉ phụ thuộc vào searchParams

  
  const handleInputChange = (newValue, type) => {
    // Xóa lỗi khi người dùng bắt đầu nhập
    if (type === "min") {
      setErrors((prev) => ({ ...prev, min: "", general: "" }));
    } else {
      setErrors((prev) => ({ ...prev, max: "", general: "" }));
    }

    if (newValue === "") {
      if (type === "min") setInputMin("");
      else setInputMax("");
      return;
    }

    const value = Number(newValue);
    if (isNaN(value)) return;

    if (type === "min") {
      setInputMin(value);
    } else {
      setInputMax(value);
    }
  };

  // Khi kéo thanh trượt -> cập nhật cả state "chính thức" VÀ state "nháp"
  const handleRangeChange = (newValue, type) => {
    const value = Number(newValue);
    if (isNaN(value)) return;

    setErrors({ min: "", max: "", general: "" }); // Xóa tất cả lỗi

    if (type === "min") {
      if (value > maxPrice) return; // Đảm bảo min không vượt max
      setMinPrice(value);
      setInputMin(value); // Đồng bộ với ô input
    } else {
      if (value < minPrice) return; // Đảm bảo max không nhỏ hơn min
      setMaxPrice(value);
      setInputMax(value); // Đồng bộ với ô input
    }
  };

  // ===============================================
  // SỬA 3: Gộp logic validation và gửi data vào 1 hàm
  // Hàm này sẽ được gọi bởi nút "SEARCH"
  // ===============================================
  const handleApplyFilter = () => {
    let newErrors = { min: "", max: "", general: "" };
    let hasError = false;

    // Luôn validate 2 ô INPUT
    const numMin = Number(inputMin);
    const numMax = Number(inputMax);

    // 1. Kiểm tra rỗng
    if (inputMin === "") {
      newErrors.min = "Vui lòng nhập giá nhỏ nhất.";
      hasError = true;
    }
    if (inputMax === "") {
      newErrors.max = "Vui lòng nhập giá lớn nhất.";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    // 2. Kiểm tra giá nhỏ nhất
    if (numMin < INITIAL_MIN) {
      newErrors.min = `Không nhỏ hơn ${formatPrice(INITIAL_MIN)}`;
      hasError = true;
    }

    // 3. Kiểm tra giá lớn nhất
    if (numMax > INITIAL_MAX) {
      newErrors.max = `Không vượt quá ${formatPrice(INITIAL_MAX)}`;
      hasError = true;
    }

    // 4. Kiểm tra min > max
    if (!hasError && numMin > numMax) {
      newErrors.general = "Giá nhỏ nhất không được lớn hơn giá lớn nhất!";
      hasError = true;
    }

    // 5. Cập nhật state lỗi
    setErrors(newErrors);

    // 6. Nếu KHÔNG có lỗi -> GỬI DATA LÊN CHA VÀ CẬP NHẬT URL
    if (!hasError) {
      // Cập nhật state thanh trượt
      setMinPrice(numMin);
      setMaxPrice(numMax);

      // Cập nhật URL
      const params = new URLSearchParams(searchParams);
      params.set("price", `${numMin}:${numMax}`);
      setSearchParams(params, { replace: true });

      // GỌI ONCHANGE ĐỂ GỬI DATA LÊN CHA
      if (onChange) {
        onChange({ min: numMin, max: numMax });
      }
    }
  };

  // Tính toán % cho thanh trượt
  const minPercent = (minPrice / INITIAL_MAX) * 100;
  const maxPercent = (maxPrice / INITIAL_MAX) * 100;

  return (
    <div className="p-4 md:w-auto  border-gray-200">
      {/* Header GIÁ */}
      <div
        className="flex justify-between items-center mb-4 cursor-pointer select-none"
        onClick={() => setOpen(!open)}
      >
        
      </div>

      {open && (
        <>
          {/* Thanh trượt */}
          <div className="relative mb-3">
            <div className="relative h-5 w-full">
              <div className="absolute top-2 left-0 right-0 h-1 bg-gray-200 rounded-full"></div>
              <div
                className="absolute top-2 h-1 bg-black"
                style={{
                  left: `${minPercent}%`,
                  right: `${100 - Math.max(maxPercent, minPercent + 0.2)}%`,
                }}
              ></div>

              {/* Range Min */}
              <input
                type="range"
                min={INITIAL_MIN}
                max={INITIAL_MAX}
                step="10000"
                value={minPrice}
                onChange={(e) => handleRangeChange(e.target.value, "min")}
                className="absolute top-0 w-full h-5 appearance-none cursor-pointer bg-transparent z-30
                pointer-events-none
                [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-gray-200
                [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-gray-400 [&::-webkit-slider-thumb]:rounded-sm
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto"
              />

              {/* Range Max */}
              <input
                type="range"
                min={INITIAL_MIN}
                max={INITIAL_MAX}
                step="10000"
                value={maxPrice}
                onChange={(e) => handleRangeChange(e.target.value, "max")}
                className="absolute top-0 w-full h-5 appearance-none cursor-pointer bg-transparent z-10
                [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-gray-200
                [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-gray-400 [&::-webkit-slider-thumb]:rounded-sm
                [&::-webkit-slider-thumb]:appearance-none"
              />
            </div>
          </div>

        	{/* Label giá */}
        	<div className="flex justify-between text-sm text-black mb-2">
        		<span>{formatPrice(minPrice)}</span>
        		<span>{formatPrice(maxPrice)}</span>
        	</div>

        	{/* Input giá */}
        	<div className="flex flex-col gap-2 mb-1">
        		{/* Input Min */}
        		<input
        		  type="number"
        		  value={inputMin}
        		  onChange={(e) => handleInputChange(e.target.value, "min")}
        		  onBlur={(e) => {
        		    if (e.target.value === "") setInputMin(0);
        		  }}
        		  onFocus={(e) => {
        		    if (e.target.value === "0") setInputMin("");
        		  }}
        		  onKeyDown={(e) => {
        		    if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
        		  }}
        		  min={INITIAL_MIN}
        		  max={INITIAL_MAX}
        		  step="10000"
        		  className={`border ${errors.min ? "border-red-600" : "border-gray-300"
        		    } p-2 w-full text-black placeholder-gray-500 text-base`}
        		/>
        		{errors.min && (
        		  <div className="text-red-600 text-sm -mt-1">{errors.min}</div>
        		)}

        		{/* Input Max */}
        		<input
        		  type="number"
        		  value={inputMax}
        		  onChange={(e) => handleInputChange(e.target.value, "max")}
        		  onBlur={(e) => {
        		    if (e.target.value === "") setInputMax(0);
        		  }}
        		  onFocus={(e) => {
        		    if (e.target.value === "0") setInputMax("");
T        		  }}
        		  onKeyDown={(e) => {
        		    if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
        		  }}
        		  min={INITIAL_MIN}
        		  max={INITIAL_MAX}
        		  step="10000"
        		  className={`border ${errors.max ? "border-red-600" : "border-gray-300"
        		    } p-2 w-full text-black placeholder-gray-500 text-base`}
        		/>
        		{errors.max && (
        		  <div className="text-red-600 text-sm -mt-1">{errors.max}</div>
        		)}
        	</div>

        	{errors.general && (
        	  <div className="text-red-600 text-sm mt-1 mb-3">
        	    {errors.general}
        	  </div>
      	)}

        	{/* =============================================== */}
        	{/* SỬA 4: Nút Search gọi đúng hàm handleApplyFilter */}
        	{/* =============================================== */}
        	<button
        	  onClick={handleApplyFilter}
        	  className="w-full border text-sm border-black bg-white text-black py-2 font-semibold hover:bg-black hover:text-white transition"
      	>
        	  {t("filter.search")}
      	</button>
      	</>
    	)}
  	</div>
  );
}