import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const ProductDetailPopup = ({ isOpen, product, onClose }) => {
    const navigate = useNavigate();
    if (!isOpen) return null;
    const [quantity, setQuantity] = useState(1);
    useEffect(() => {
        setQuantity(1);
    }, [product]);
    const handleAddToCart = (product) => {
        console.log('handleAddToCart ', product);
        const cartItem = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        cartItem.push(product);
        localStorage.setItem('cart', JSON.stringify(cartItem));
        navigate('/cart');
    }
    return (
        <>
            <div onClick={() => onClose()} className="fixed inset-0 bg-black/50 z-[200]">
                <div onClick={(e) => e.stopPropagation()} className="bg-white  shadow-xl w-[1000px] top-[5%] left-1/2 -translate-x-1/2  relative ">
                    <button
                        onClick={() => onClose()}
                        className="absolute w-5 h-5 flex justify-center items-center font-bold top-3 right-3 text-white bg-[#673AB7] rounded-full text-xl"
                    >
                        &times;
                    </button>
                    <div className='grid grid-cols-1 min-[1000px]:grid-cols-2'>
                        <div className='col-span-1 px-4'>
                            <Link to={`/product/${product.id}`}>
                                <img src={product.image} alt="collection" className='w-full h-full object-cover' />
                            </Link>
                        </div>
                        <div className='col-span-1 p-4'>
                            <h3>
                                <Link to={`/product/${product.id}`} className='text-[21px] font-normal  text-[#333333] hover:text-[#673AB7] mt-4 mb-1 block '>{product.name}</Link>
                            </h3>
                            <div className='flex gap-2 divide-x-[1px] divide-[#898989] py-3'>
                                <p className='text-[#898989] text-sm'><span className='font-semibold'>Mã SP: </span> {product.id}</p>
                                <p className='text-[#898989] text-sm pl-2'><span className='font-semibold'>Thương hiệu: </span> {product.brand}</p>
                            </div>
                            <h3 className='text-[#858688] text-[22px] font-semibold mb-8'>{product.price}</h3>
                            <div className='flex gap-x-2 border-t border-gray-100 pt-4'>
                                <label className="cursor-pointer">
                                    <input
                                        type="radio"
                                        name="size"
                                        value="S"
                                        className="hidden peer"
                                    />
                                    <div className="border shadow-[0_0_0_1px_#B8B8B8] text-black h-[35px] w-[50px] text-sm flex justify-center items-center rounded peer-checked:shadow-[0_0_2px_2px_#FF7A00] hover:shadow-[0_0_2px_2px_#FF7A00] transition-colors duration-200">
                                        S
                                    </div>
                                </label>
                                <label className="cursor-pointer">
                                    <input
                                        type="radio"
                                        name="size"
                                        value="M"
                                        className="hidden peer"
                                    />
                                    <div className="border shadow-[0_0_0_1px_#B8B8B8] text-black h-[35px] w-[50px] text-sm flex justify-center items-center rounded peer-checked:shadow-[0_0_2px_2px_#FF7A00] hover:shadow-[0_0_2px_2px_#FF7A00] transition-colors duration-200">
                                        M
                                    </div>
                                </label>
                                <label className="cursor-pointer">
                                    <input
                                        type="radio"
                                        name="size"
                                        value="L"
                                        className="hidden peer"
                                    />
                                    <div className="border shadow-[0_0_0_1px_#B8B8B8] text-black h-[35px] w-[50px] text-sm flex justify-center items-center rounded peer-checked:shadow-[0_0_2px_2px_#FF7A00] hover:shadow-[0_0_2px_2px_#FF7A00] transition-colors duration-200">
                                        L
                                    </div>
                                </label>

                            </div>
                            <p className='text-[#333] font-normal text-sm mt-4'>Số lượng: </p>
                            <div className='flex gap-x-2 items-center mt-2'>
                                <div>
                                    <input className='text-[#333] font-normal text-xs border px-5 w-[130px] py-2.5 text-center rounded-full' defaultValue={quantity} onFocus={(e) => e.target.select()} type="number" />
                                </div>
                                <div>
                                    <button onClick={() => handleAddToCart(product)} className='uppercase bg-[#673AB7] p-2.5 rounded-full text-white text-xs font-normal'>Thêm vào giỏ hàng</button>
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