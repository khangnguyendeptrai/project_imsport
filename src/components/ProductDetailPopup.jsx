import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

// --- THAY ĐỔI 1: Thêm prop 'onAddToCart' ---
// Component này sẽ nhận thêm một hàm 'onAddToCart' từ component cha
// để xử lý logic nghiệp vụ (Rules 4, 5)
const ProductDetailPopup = ({ isOpen, product, onClose }) => {
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
        .replace(/\u00A0/g, '')  + ' VNĐ';
    }
     useEffect(() => {
        setQuantity(1);
    }, [product]);
 
    // --- THAY ĐỔI 3: Logic cho nút "Thêm vào giỏ hàng" ---
    
    // (Rule 3): Nút bị vô hiệu hóa nếu chưa chọn size HOẶC số lượng <= 0
    const isAddToCartDisabled = !selectedSize || quantity <= 0;

    // Hàm xử lý khi nhấn nút
    const handleAddToCart = (product) => {
        // (Rule 2): Chỉ chạy khi nút không bị disabled
        if (isAddToCartDisabled) return;

        // Gửi thông tin (sản phẩm, size, số lượng) lên component cha
        // Component cha sẽ tự xử lý (Rule 4 và 5)
        console.log('handleAddToCart ', {...product, quantity: quantity });
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
                            <h3 className='text-[#858688] text-[22px] font-semibold mb-8'>{formatPrice(product.price)   }</h3>
                            <div className='flex gap-x-2 border-t border-gray-100 pt-4'>
                                <label className="cursor-pointer">
                                    <input
                                        type="radio"
                                        name="popup-size" // Đổi tên để tránh trùng lặp
                                        value="S"
                                        className="hidden peer"
                                        // Cập nhật state khi chọn
                                        onChange={(e) => setSelectedSize(e.target.value)}
                                        // Kiểm soát trạng thái checked
                                        checked={selectedSize === "S"}
                                    />
                                    <div className="border shadow-[0_0_0_1px_#B8B8B8] text-black h-[35px] w-[50px] text-sm flex justify-center items-center rounded peer-checked:shadow-[0_0_2px_2px_#FF7A00] hover:shadow-[0_0_2px_2px_#FF7A00] transition-colors duration-200">
                                        S
                                    </div>
                                </label>
                                <label className="cursor-pointer">
                                    <input
                                        type="radio"
                                        name="popup-size"
                                        value="M"
                                        className="hidden peer"
                                        onChange={(e) => setSelectedSize(e.target.value)}
                                        checked={selectedSize === "M"}
                                    />
                                    <div className="border shadow-[0_0_0_1px_#B8B8B8] text-black h-[35px] w-[50px] text-sm flex justify-center items-center rounded peer-checked:shadow-[0_0_2px_2px_#FF7A00] hover:shadow-[0_0_2px_2px_#FF7A00] transition-colors duration-200">
                                        M
                                    </div>
                                </label>
                                <label className="cursor-pointer">
                                    <input
                                        type="radio"
                                        name="popup-size"
                                        value="L"
                                        className="hidden peer"
                                        onChange={(e) => setSelectedSize(e.target.value)}
                                        checked={selectedSize === "L"}
                                    />
                                    <div className="border shadow-[0_0_0_1px_#B8B8B8] text-black h-[35px] w-[50px] text-sm flex justify-center items-center rounded peer-checked:shadow-[0_0_2px_2px_#FF7A00] hover:shadow-[0_0_2px_2px_#FF7A00] transition-colors duration-200">
                                        L
                                    </div>
                                </label>
                            </div>
                            
                            <p className='text-[#333] font-normal text-sm mt-4'>Số lượng: </p>
                            <div className='flex gap-x-2 items-center mt-2'>
                                <div>
                                    {/* --- THAY ĐỔI 5: Gán State cho Số lượng --- */}
                                    <input 
                                        className='text-[#333] font-normal text-xs border px-5 w-[130px] py-2.5 text-center rounded-full' 
                                        type="number" 
                                        min="1" // Đảm bảo số lượng luôn > 0
                                        value={quantity} // Dùng 'value' thay vì 'defaultValue'
                                        // Cập nhật state khi thay đổi, đảm bảo là số và ít nhất là 1
                                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                        onFocus={(e) => e.target.select()} 
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