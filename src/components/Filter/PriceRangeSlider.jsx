import { useState } from "react";
// 1. Import useSearchParams
import { useSearchParams } from "react-router-dom";

// Hàm định dạng số thành chuỗi tiền tệ
const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(price).replace('₫', 'đ');
};

export default function PriceFilter() {
  // 2. Khởi tạo useSearchParams
  const [searchParams, setSearchParams] = useSearchParams();

  const initialMin = 0;
  const initialMax = 20000000;

  // Lấy giá trị từ URL nếu có, nếu không thì dùng giá trị mặc định
  const [minPrice, setMinPrice] = useState(
    Number(searchParams.get("price")?.split(":")[0] || initialMin)
  );
  const [maxPrice, setMaxPrice] = useState(
    Number(searchParams.get("price")?.split(":")[1] || initialMax)
  );

  const setPriceValue = (newValue, type) => {
    // Chuyển về số
    console.log("max", maxPrice);
    console.log("min", minPrice);

    const value = Number(newValue);
    console.log("Valu", value);
    if (isNaN(value)) return;

    if (type === 'min') {
      // Nếu cả hai đều là 0, set mặc định
      if (Number(minPrice) === 0 && Number(maxPrice) === 0) {
        console.log("success");
        setMinPrice(String(Number(value)));
        setMaxPrice(String(Number(value + 100000)));
      }
      else if (Number(minPrice) == Number(maxPrice) && Number(maxPrice) < initialMax) {
        if (value >= initialMax) {
          setMinPrice(String(Number(initialMax)));
          setMaxPrice(String(Number(initialMax)));
        }
        else
          if (Number(value) + 100000 <= initialMax) {
            setMinPrice(String(Number(value)));
            setMaxPrice(String(Number(value + 100000)));
          }
          else {
            setMinPrice(String(Number(value)));
            setMaxPrice(String(maxPrice));
          }

      }
      else {
        const safeValue = Math.min(Math.max(initialMin, value), maxPrice);

        // Ép về string để dùng regex xóa 0 đầu
        let cleanedValue = String(safeValue).replace(/^0+(?=\d)/, '');
        // Nếu người dùng nhập toàn 0 (ví dụ "000"), thì cleanedValue sẽ thành rỗng → set về 0
        cleanedValue = cleanedValue === '' ? 0 : String(Number(cleanedValue));
        setMinPrice(cleanedValue);
      }

    } else if (type === 'max') {
      const safeValue = Math.min(Math.max(minPrice, value), initialMax);
      // Ép về string để dùng regex xóa 0 đầu
      let cleanedValue = String(safeValue).replace(/^0+(?=\d)/, '');
      // Nếu người dùng nhập toàn 0 (ví dụ "000"), thì cleanedValue sẽ thành rỗng → set về 0
      cleanedValue = cleanedValue === '' ? 0 : String(Number(cleanedValue));
      setMaxPrice(cleanedValue);

    }
  };

  const handleMinChange = (e) => setPriceValue(e.target.value, 'min');
  const handleMaxChange = (e) => setPriceValue(e.target.value, 'max');
  const handleMinChangeInput = (e) => {
    let value = e.target.value;
    // Nếu chuỗi bắt đầu bằng 0 và có thêm số phía sau → xóa 0 ở đầu
    value = value.replace(/^0+/, '');
    // console.log(minPrice);

    // Nếu người dùng xóa hết hoặc nhập rỗng → trả về 0
    if (value === '' || isNaN(value)) {
      setMinPrice(0);
      return;
    }
    console.log(value);
    // Gọi setPriceValue với giá trị đã làm sạch
    let cleanedValue = value.replace(/^0+(?=\d)/, '');
    setMinPrice(cleanedValue);
    // setMinPrice(value);
  };

  // 3. Tạo hàm cập nhật URL
  const updateUrlParams = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("price", `${minPrice}:${maxPrice}`);
    // Dùng 'replace: true' để không tạo thêm lịch sử trình duyệt mỗi khi kéo
    setSearchParams(newParams, { replace: true });
  };

  // 4. Cập nhật handleSearch để gọi hàm mới
  const handleSearch = () => {
    console.log("Khoảng giá:", minPrice, "-", maxPrice);
    updateUrlParams();
  };

  const minPercent = (minPrice / initialMax) * 100;
  const maxPercent = (maxPrice / initialMax) * 100;

  return (
    <div className="p-4 md:w-auto">

      {/* 1. Thanh trượt (Range Slider) */}
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

          {/* Input Range Min - Thêm onMouseUp và onTouchEnd */}
          <input
            type="range"
            min={initialMin}
            max={initialMax}
            step="10000"
            value={minPrice}
            onChange={handleMinChange}
            onMouseUp={updateUrlParams}
            onTouchEnd={updateUrlParams}
            className="absolute top-0 w-full h-5 appearance-none cursor-pointer bg-transparent z-30
                       pointer-events-none
                       [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-gray-200
                       [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-gray-400 [&::-webkit-slider-thumb]:rounded-sm
                       [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:mt-0
                       [&::-webkit-slider-thumb]:pointer-events-auto
                       
                       [&::-moz-range-thumb]:w-2 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:bg-gray-200
                       [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-gray-400 [&::-moz-range-thumb]:rounded-sm
                       [&::-moz-range-thumb]:appearance-none
                       [&::-moz-range-thumb]:pointer-events-auto"
          />

          {/* Input Range Max - Thêm onMouseUp và onTouchEnd */}
          <input
            type="range"
            min={initialMin}
            max={initialMax}
            step="10000"
            value={maxPrice}
            onChange={handleMaxChange}
            onMouseUp={updateUrlParams}
            onTouchEnd={updateUrlParams}
            className="absolute top-0 w-full h-5 appearance-none cursor-pointer bg-transparent z-20
                       [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-gray-200
                       [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-gray-400 [&::-webkit-slider-thumb]:rounded-sm
                       [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:mt-0
                       
                       [&::-moz-range-thumb]:w-2 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:bg-gray-200
                       [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-gray-400 [&::-moz-range-thumb]:rounded-sm
                       [&::-moz-range-thumb]:appearance-none"
          />
        </div>
      </div>

      {/* 2. Label giá động */}
      <div className="flex justify-between text-sm text-black mb-2">
        <span className="text-black"> {formatPrice(minPrice)}:</span>
        <span className="text-black">{formatPrice(maxPrice)}</span>
      </div>

      {/* 3. Input giá - Cho phép chỉnh sửa */}
      <div className="flex flex-col gap-2 mb-3">
        <input
          type="number"
          value={minPrice !== 0 ? minPrice : 0}
          onChange={(e) => setPriceValue(e.target.value, 'min')}
          min={initialMin}
          max={maxPrice}

          step="10000"
          className="border border-gray-300 rounded p-2 w-full text-black placeholder-gray-500 text-base"
        />
        <input
          type="number"
          value={maxPrice !== 0 ? maxPrice : 0}
          onChange={(e) => setPriceValue(e.target.value, 'max')}
          min={minPrice}
          max={initialMax}

          step="10000"
          className="border border-gray-300 rounded p-2 w-full text-black placeholder-gray-500 text-base"
        />
      </div>

      {/* 4. Nút Search - ĐÃ ĐỔI TỪ text-base THÀNH text-sm */}
      <button
        onClick={handleSearch}
        className="w-full border text-sm border-black bg-white text-black py-2 font-semibold hover:bg-black hover:text-white transition rounded"
      >
        SEARCH
      </button>
    </div>
  );
}