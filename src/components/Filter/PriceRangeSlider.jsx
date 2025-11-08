import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  })
    .format(price)
    .replace("₫", "đ");

export default function PriceFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialMin = 0;
  const initialMax = 20000000;

  const [open, setOpen] = useState(true);

  const [minPrice, setMinPrice] = useState(
    Number(searchParams.get("price")?.split(":")[0] || initialMin)
  );
  const [maxPrice, setMaxPrice] = useState(
    Number(searchParams.get("price")?.split(":")[1] || initialMax)
  );

  const [error, setError] = useState("");

  const setPriceValue = (newValue, type) => {
    if (newValue === "") {
      if (type === "min") setMinPrice("");
      else setMaxPrice("");
      setError("");
      return;
    }

    const value = Number(newValue);
    if (isNaN(value)) return;

    // Kiểm tra giới hạn
    if (type === "min") {
      if (value < initialMin) {
        setError(`Giá nhỏ nhất không thể nhỏ hơn ${formatPrice(initialMin)}`);
        return;
      }
      if (value > maxPrice) {
        setError(`Giá nhỏ nhất không thể lớn hơn giá cao nhất (${formatPrice(maxPrice)})`);
        return;
      }

      setMinPrice(value);
      setError("");
    } else {
      if (value > initialMax) {
        setError(`Giá lớn nhất không thể vượt quá ${formatPrice(initialMax)}`);
        return;
      }
      // if (value < minPrice) {
      //   setError(`Giá lớn nhất không thể nhỏ hơn giá nhỏ nhất (${formatPrice(minPrice)})`);
      //   return;
      // }

      setMaxPrice(value);
      setError("");
    }
  };

  const updateUrlParams = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("price", `${minPrice || 0}:${maxPrice || initialMax}`);
    setSearchParams(newParams, { replace: true });
  };

  const handleSearch = () => {
    if (minPrice === "" || maxPrice === "") {
      setError("Vui lòng nhập đầy đủ khoảng giá!");
      return;
    }

    if (Number(minPrice) > Number(maxPrice)) {
      setError("Giá nhỏ nhất không được lớn hơn giá lớn nhất!");
      return;
    }

    setError("");
    updateUrlParams();
  };

  const minPercent = ((minPrice || 0) / initialMax) * 100;
  const maxPercent = ((maxPrice || initialMax) / initialMax) * 100;

  return (
    <div className="p-4 md:w-auto border-t border-gray-200">
      {/* Header GIÁ */}
      <div
        className="flex justify-between items-center mb-4 cursor-pointer select-none"
        onClick={() => setOpen(!open)}
      >
        <h3 className="text-black font-bold text-base">GIÁ</h3>
        {open ? (
          <MdKeyboardArrowUp className="text-black text-xl" />
        ) : (
          <MdKeyboardArrowDown className="text-black text-xl" />
        )}
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
                  right: `${100 - maxPercent}%`,
                }}
              ></div>

              {/* Range Min */}
              <input
                type="range"
                min={initialMin}
                max={initialMax}
                step="10000"
                value={minPrice || 0}
                onChange={(e) => setPriceValue(e.target.value, "min")}
                onMouseUp={updateUrlParams}
                onTouchEnd={updateUrlParams}
                className="absolute top-0 w-full h-5 appearance-none cursor-pointer bg-transparent z-30
                pointer-events-none
                [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-gray-200
                [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-gray-400 [&::-webkit-slider-thumb]:rounded-sm
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto"
              />

              {/* Range Max */}
              <input
                type="range"
                min={initialMin}
                max={initialMax}
                step="10000"
                value={maxPrice || initialMax}
                onChange={(e) => setPriceValue(e.target.value, "max")}
                onMouseUp={updateUrlParams}
                onTouchEnd={updateUrlParams}
                className="absolute top-0 w-full h-5 appearance-none cursor-pointer bg-transparent z-20
                [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-gray-200
                [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-gray-400 [&::-webkit-slider-thumb]:rounded-sm
                [&::-webkit-slider-thumb]:appearance-none"
              />
            </div>
          </div>

          {/* Label giá */}
          <div className="flex justify-between text-sm text-black mb-2">
            <span>{formatPrice(minPrice || 0)}</span>
            <span>{formatPrice(maxPrice || initialMax)}</span>
          </div>

          {/* Input giá */}
          <div className="flex flex-col gap-2 mb-1">
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setPriceValue(e.target.value, "min")}
              onBlur={(e) => {
                if (e.target.value === "") setMinPrice(0);
              }}
              onFocus={(e) => {
                if (e.target.value === "0") setMinPrice("");
              }}
              onKeyDown={(e) => {
                if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
              }}
              min={initialMin}
              max={maxPrice || initialMax}
              step="10000"
              className="border border-gray-300 p-2 w-full text-black placeholder-gray-500 text-base"
            />

            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setPriceValue(e.target.value, "max")}
              onBlur={(e) => {
                if (e.target.value === "") setMaxPrice(0);
              }}
              onFocus={(e) => {
                if (e.target.value === "0") setMaxPrice("");
              }}
              onKeyDown={(e) => {
                if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
              }}
              min={minPrice || 0}
              max={initialMax}
              step="10000"
              className="border border-gray-300 p-2 w-full text-black placeholder-gray-500 text-base"
            />
          </div>

          {/* Thông báo lỗi */}
          {error && (
            <div className="text-red-600 text-sm mt-1 mb-3">{error}</div>
          )}

          {/* Nút Search */}
          <button
            onClick={handleSearch}
            className="w-full border text-sm border-black bg-white text-black py-2 font-semibold hover:bg-black hover:text-white transition"
          >
            SEARCH
          </button>
        </>
      )}
    </div>
  );
}
