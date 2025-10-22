import { useSearchParams } from 'react-router-dom';

// Data dự phòng
const mockupBrands = [
  'Norda', 'HOKA', '2XU', 'Compressport', 'Salomon', 'District Vision',
  'On', 'Nike', 'Adidas'
];

// Component nhận prop `data`
export default function BrandSelector({ data }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Dùng data prop, nếu không có thì dùng mockup
  const brandsToDisplay = data && data.length > 0 ? data : mockupBrands;

  // Đọc trực tiếp các brand đã chọn từ URL (ví dụ: 'norda,hoka')
  const getBrandsFromUrl = () => {
    const urlBrands = searchParams.get('brand');
    return urlBrands ? urlBrands.split(',') : [];
  };

  // Logic khi click vào một thương hiệu
  const handleBrandClick = (brand) => {
    const brandAsParam = brand.toLowerCase();
    
    const currentSelected = getBrandsFromUrl();
    const isSelected = currentSelected.includes(brandAsParam);
    let newSelected = [];

    if (isSelected) {
      newSelected = currentSelected.filter((b) => b !== brandAsParam);
    } else {
      newSelected = [...currentSelected, brandAsParam];
    }

    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);
      if (newSelected.length > 0) {
        newParams.set('brand', newSelected.join(','));
      } else {
        newParams.delete('brand');
      }
      return newParams;
    }, { replace: true });
  };
  
  return (
    <div className="max-h-48 overflow-y-auto pr-2">
      <div className="flex flex-col gap-1">
        
        {brandsToDisplay.map((brand) => {
          return (
            <button
              key={brand}
              onClick={() => handleBrandClick(brand)}
              // === CLASSNAME ĐÃ XÓA FOCUS BORDER ===
              className="
                w-full p-2 text-left text-sm rounded-md
                text-gray-700 
                hover:text-black
                transition-colors duration-150
                outline-none
              "
            >
              {brand}
            </button>
          );
        })}
      </div>
    </div>
  );
}