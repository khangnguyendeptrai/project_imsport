import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { productVariationData, productSkusData, productVariationOptionsData, productSkuOptionsData } from '../data/ProductVariation';
// --- THAY ĐỔI 1: Thêm prop 'onAddToCart' ---
// Component này sẽ nhận thêm một hàm 'onAddToCart' từ component cha
// để xử lý logic nghiệp vụ (Rules 4, 5)
const ProductDetailPopup = ({ isOpen, product, onClose }) => {
    const [selectedOptions, setSelectedOptions] = useState({});

    
    console.log('product', product);


    function getProductVariations(productId) {
        return productVariationData.filter(v => v.product_id == productId);
    }

    function getVariationOptions(variationId) {
        return productVariationOptionsData.filter(o => o.variation_id == variationId);
    }

    function getProductSkus(productId) {
        return productSkusData.filter(sku => sku.product_id == productId);
    }

    function getSkuOptions(skuId) {
        return productSkuOptionsData
            .filter(so => so.sku_id == skuId)
            .map(so => {
                const option = productVariationOptionsData.find(o => o.id == so.option_id);
                return option;
            });	
    }

    function getProductAttributes(productId) {
        const variations = getProductVariations(productId); // Màu sắc, kích cỡ

        const variationWithOptions = variations.map(variation => ({
            ...variation,
            options: getVariationOptions(variation.id)
        }));

        const skus = getProductSkus(productId).map(sku => ({
            ...sku,
            options: getSkuOptions(sku.id)
        }));

        return {
            product_id: productId,
            variations: variationWithOptions,
            skus
        };
    }

    

    console.log('productAttributes', getProductAttributes(product.id));
    const data = getProductAttributes(product.id);

    function getDisabledOptions(data) {
        // Lấy tất cả SKU hết hàng
        const outOfStockSkus = data.skus.filter(sku => sku.quantity === 0);
      
        // Tạo Set để tránh trùng option
        const disabledOptions = new Set();
      
        outOfStockSkus.forEach(sku => {
          sku.options.forEach(option => {
            disabledOptions.add(option.value);  
          });
        });
      
        return disabledOptions; // Trả về dạng Set để FE dùng nhanh
      }
      const disabledOptions = getDisabledOptions(data);

    if (!isOpen) return null;
    const { addToCart } = useCart();
    // --- THAY ĐỔI 2: Quản lý State ---
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(null); // State mới để lưu size đã chọn
    const navigate = useNavigate();

    // Reset state mỗi khi mở popup (hoặc khi sản phẩm thay đổi)
    useEffect(() => {
        setQuantity(1);
        setSelectedSize(null);
    }, [product, isOpen]); // Thêm 'isOpen' để reset mỗi khi mở lại

    const formatPrice = (price) => {
        return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', '')
            .replace(/\s/g, '')         // xóa toàn bộ khoảng trắng bình thường
            .replace(/\u00A0/g, '') + ' VNĐ';
    }
    useEffect(() => {
        setQuantity(1);
        setSelectedOptions({});
    }, [product]);

    // --- THAY ĐỔI 3: Logic cho nút "Thêm vào giỏ hàng" ---
    console.log('selectedOptions', Object.values(selectedOptions).length === 0);
    // (Rule 3): Nút bị vô hiệu hóa nếu chưa chọn size HOẶC số lượng <= 0
    const isAddToCartDisabled = Object.values(selectedOptions).length === 0 || quantity <= 0;

    // Hàm xử lý khi nhấn nút
    const handleAddToCart = (product) => {
        // (Rule 2): Chỉ chạy khi nút không bị disabled
        if (isAddToCartDisabled) return;

        // Gửi thông tin (sản phẩm, size, số lượng) lên component cha
        // Component cha sẽ tự xử lý (Rule 4 và 5)
        console.log('handleAddToCart ', { ...product, quantity: quantity });
        addToCart({ ...product, quantity: quantity, selectedSize: selectedSize });
        navigate('/cart');
        // Đóng popup sau khi thêm
        onClose();
    };

    return (
        <>
            <div onClick={onClose} className="fixed inset-0 bg-black/50 z-[200]">
                <div onClick={(e) => e.stopPropagation()} className="bg-white shadow-xl w-[1000px] top-[5%] left-1/2 -translate-x-1/2 relative ">
                    <button
                        onClick={onClose}
                        className="absolute w-5 h-5 flex justify-center items-center font-bold top-3 right-3 text-white bg-[#673AB7] rounded-full text-xl"
                    >
                        &times;
                    </button>
                    <div className='grid grid-cols-1 min-[1000px]:grid-cols-2'>
                        {/* ... (Phần ảnh sản phẩm giữ nguyên) ... */}
                        <div className='col-span-1 px-4'>
                            <Link to={`/product/${product.id}`}>
                                <img src={product.image} alt="collection" className='w-full h-full object-cover' />
                            </Link>
                        </div>

                        {/* ... (Phần thông tin sản phẩm) ... */}
                        <div className='col-span-1 p-4'>
                            <h3>
                                <Link to={`/product/${product.id}`} className='text-[21px] font-normal text-[#333333] hover:text-[#673AB7] mt-4 mb-1 block '>{product.name}</Link>
                            </h3>
                            <div className='flex gap-2 divide-x-[1px] divide-[#898989] py-3'>
                                <p className='text-[#898989] text-sm'><span className='font-semibold'>Mã SP: </span> {product.id}</p>
                                <p className='text-[#898989] text-sm pl-2'><span className='font-semibold'>Thương hiệu: </span> {product.brand}</p>
                            </div>
                            <h3 className='text-[#858688] text-[22px] font-semibold mb-8'>{formatPrice(product.price)}</h3>
                            {data.variations.map(variation => (
                                <div key={variation.id} className='border-t border-gray-100 pt-4'>
                                    <p className='text-[#333] font-normal text-sm mb-0'>{variation.name}:</p>

                                    <div className='flex gap-x-2'>
                                        {variation.options.map(option => (
                                            <label className="cursor-pointer" key={option.id}>
                                                <input
                                                    type="radio"
                                                    name={`popup-variation-${variation.id}`}
                                                    value={option.value}
                                                    disabled={disabledOptions.has(option.value)}
                                                    className="hidden peer"
                                                    checked={selectedOptions[variation.id] === option.value}
                                                    onChange={() =>
                                                        setSelectedOptions(prev => ({
                                                            ...prev,
                                                            [variation.id]: option.value
                                                        }))
                                                    }
                                                />

                                                <div className={`border shadow-[0_0_0_1px_#B8B8B8] h-[35px] w-[50px]
                                                    text-sm flex justify-center items-center rounded
                                                    peer-checked:shadow-[0_0_2px_2px_#FF7A00]
                                                    hover:shadow-[0_0_2px_2px_#FF7A00] transition-all duration-200`
                                                    + (disabledOptions.has(option.value)
                                                    ? "opacity-50 cursor-not-allowed bg-gray-200"
                                                    : "hover:shadow-[0_0_2px_2px_#FF7A00]")}>
                                                    {option.value}
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <p className='text-[#333] font-normal text-sm mt-4'>Số lượng: </p>
                            <div className='flex gap-x-2 items-center mt-2'>
                                <div>
                                    {/* --- THAY ĐỔI 5: Gán State cho Số lượng --- */}
                                    <input
                                        className='text-[#333] font-normal text-xs border px-5 w-[130px] py-2.5 text-center rounded-full'
                                        type="number" // Đảm bảo số lượng luôn > 0
                                        value={quantity} // Dùng 'value' thay vì 'defaultValue'
                                        // Cập nhật state khi thay đổi, đảm bảo là số và ít nhất là 1
                                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                                        onFocus={(e) => e.target.select()}
                                        onBlur={(e) => {
                                            if (e.target.value === '' || e.target.value <= 0)
                                                setQuantity(1);
                                        }}
                                    />
                                </div>
                                <div>
                                    {/* --- THAY ĐỔI 6: Áp dụng Logic cho Nút --- */}
                                    <button
                                        className='uppercase bg-[#673AB7] p-2.5 rounded-full text-white text-xs font-normal disabled:opacity-50 disabled:cursor-not-allowed'
                                        onClick={() => handleAddToCart(product)} // (Rule 2)
                                        disabled={isAddToCartDisabled} // (Rule 3)
                                    >
                                        Thêm vào giỏ hàng
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetailPopup
