import { useSearchParams } from 'react-router-dom';

// Data dự phòng


export default function BrandSelector({ data, onChange }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const brandsToDisplay = data;

  const getBrandsFromUrl = () => {
    const urlBrands = searchParams.get('brand');
    return urlBrands ? urlBrands.split(',') : [];
  };

  const handleBrandClick = (brand) => {
    const brandAsParam = brand.toLowerCase();
    const currentSelected = getBrandsFromUrl();
    const isSelected = currentSelected.includes(brandAsParam);

    let newSelected;
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
    console.log("data brands",newSelected);
    
    if (onChange) {
      onChange(newSelected);
    }
  };

  const selectedBrands = getBrandsFromUrl();

  return (
    <div className="max-h-[190px] overflow-y-auto  scrollbar-hide-buttons">
      <div className="flex flex-col gap-1">
        {brandsToDisplay.map((brand) => {
          const isSelected = selectedBrands.includes(brand.toLowerCase());
          return (
            <button
              key={brand}
              onClick={() => handleBrandClick(brand)}
              className={`w-full p-2 text-left text-sm rounded-md outline-none transition-colors duration-150
                ${isSelected
                  ? 'bg-purple-800 text-white'
                  : 'bg-white text-black hover:text-purple-800'
                }
              `}
            >
              {brand}
            </button>
          );
        })}
      </div>
    </div>
  );
}
