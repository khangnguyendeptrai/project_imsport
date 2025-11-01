import { useSearchParams } from 'react-router-dom';

const mockupSizes = [
  'M4/W6', 'T1', 'XS', 'M5/W7', 'S/M', 'S', 'M5.5/W7.5', 'M',
  'M6/W8', 'L', 'M7/W9', 'XL', 'M8/W10', 'XXL'
];

export default function SizeSelector({ data }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sizesToDisplay = data && data.length > 0 ? data : mockupSizes;

  const getSizesFromUrl = () => {
    const urlSizes = searchParams.get('size');
    return urlSizes ? urlSizes.split(',') : [];
  };

  const handleSizeClick = (size) => {
    const currentSelected = getSizesFromUrl();
    const isSelected = currentSelected.includes(size);
    let newSelected = [];

    if (isSelected) {
      newSelected = currentSelected.filter((s) => s !== size);
    } else {
      newSelected = [...currentSelected, size];
    }

    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);

      if (newSelected.length > 0) {
        newParams.set('size', newSelected.join(','));
      } else {
        newParams.delete('size');
      }
      return newParams;
    }, { replace: true });
  };

  const selectedSizes = getSizesFromUrl();

  return (
    <div className="max-h-[190px] overflow-y-auto p-2 mt-2  
    scrollbar-hide-buttons
     
">
      {/* 1. Đã quay lại layout grid 2 cột (code cũ) */}
      <div className="grid grid-cols-2 gap-2">

        {sizesToDisplay.map((size) => {
          const isSelected = selectedSizes.includes(size);

          return (
            <button
              key={size}
              onClick={() => handleSizeClick(size)}
              // === CLASSNAME ĐÃ CẬP NHẬT THEO YÊU CẦU ===
              className={`
                w-full p-2  text-sm font-medium
                outline-none 
                transition-colors duration-150
                ${isSelected
                  ? 'bg-purple-800 text-white ring-1 ring-black border border-white' // 2. Style khi ĐÃ CHỌN (Click)
                  : 'bg-white text-black border border-black ' + // 3. Style MẶC ĐỊNH
                  'hover:bg-purple-800 hover:text-white hover:ring-1 hover:ring-black hover:border-white' // 4. Style khi HOVER
                }
              `}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}