import React, { useState } from 'react'
import { imgCategoryCollection1, productImg1, productImg1Hide, productImg2, productImg2Hide, productImg3, productImg3Hide, productImg4, productImg4Hide, productImg5, productImg5Hide, productImg6, productImg6Hide, tagGift } from '../assets/ExportImage'
import BestSellerBadge from './BestSellerBadge'
import DiscountBadge from './DiscountBadge'
import GiftBadge from './GiftBadge'
import { EyeIcon, MagnifyingGlassPlusIcon } from '@heroicons/react/24/outline'
import ProductAction from './ProductAction'
const data =
{
    title: 'Đồ Nam',
    data: [
        {
            id: 1,
            image: productImg1,
            imageHide: productImg1Hide,
            name: 'Áo Chạy Địa Hình Nam Raidlight Maillot de trail R-Light - KAKI',
            price: '1,850,000 VNĐ',
            originalPrice: 0,
            isBestSeller: false,
            isDiscount: 0,
            isGift: false,
        },
        {
            id: 2,
            image: productImg2,
            imageHide: productImg2Hide,
            name: 'Norda 001 | Giày Chạy Địa Hình Nam Norda 001 - Glitch',
            price: "5,907,500 VNĐ",
            originalPrice: "6,950,000 VNĐ",
            isBestSeller: false,
            isDiscount: 15,
            isGift: false,
        },
        {
            id: 3,
            image: productImg3,
            imageHide: productImg3Hide,
            name: 'Bondi 9 Wide | Giày Chạy Bộ Nam Hoka Bondi 9 Wide - BBLC',
            price: "3,999,000 VNĐ",
            originalPrice: 0,
            isBestSeller: false,
            isDiscount: 0,
            isGift: true,
        },
        {
            id: 4,
            image: productImg4,
            imageHide: productImg4Hide,
            name: 'Oso Flaco (Winged)| Dép Chạy Nam LUNA Sandals Oso Flaco Winged Ed. Mountain Crystal',
            price: "2,065,000 VNĐ",
            originalPrice: "2,950,000 VNĐ",
            isBestSeller: false,
            isDiscount: 30,
            isGift: false,
        },
        {
            id: 5,
            image: productImg5,
            imageHide: productImg5Hide,
            name: 'Light Speed Compression | Quần Bó Cơ Nam 2XU Light Speed Compression Shorts Mens - BLK/BRF',
            price: "1,691,500 VNĐ",
            originalPrice: "1,990,000 VNĐ",
            isBestSeller: true,
            isDiscount: 14,
            isGift: false,
        },
        {
            id: 6,
            image: productImg6,
            imageHide: productImg6Hide,
            name: 'Mono 2.0 (Winged)| Dép Chạy Nam LUNA Sandals Mono 2.0 Winged Ed - Desert Canyon',
            price: "2,065,000 VNĐ",
            originalPrice: "2,950,000 VNĐ",
            isBestSeller: false,
            isDiscount: 30,
            isGift: false,
        },
    ]
}

const CollectionProduct = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const quickView = (id) => {
        console.log('quickView ', id)
        setModalOpen(true)
    }
    return (
        <>
            <div className='container mx-auto !pt-10'>
                <h3 className='text-[28px] uppercase text-center mb-10'>
                    <a className='text-[#333333] hover:text-[#673AB7] font-semibold' href='/'>{data.title}</a>
                </h3>
                <div className='grid grid-cols-1 min-[1000px]:grid-cols-2'>
                    <div className='col-span-1 px-4'>
                        <a href='/'>
                            <img src={imgCategoryCollection1} alt="collection" className='w-full h-full object-cover' />
                        </a>
                    </div>
                    <div className='col-span-1 px-4'>
                        <div className='grid grid-cols-2 md:grid-cols-3 gap-x-1 gap-y-4'>
                            {data.data.map((item) => (
                                <div key={item.id} className='col-span-1 group'>
                                    <div className='relative overflow-hidden'>
                                        {item.isBestSeller && <BestSellerBadge />}
                                        {item.isDiscount !== 0 && <DiscountBadge />}
                                        {item.isGift && <GiftBadge />}
                                        <ProductAction product={item} quickView={quickView} />


                                        <a className='' href='/'>
                                            <img src={item.image} alt="collection" className='w-full h-full object-cover group-hover:scale-0 transition-all duration-500' />
                                            <img src={item.imageHide} alt="collection" className='w-full h-full object-cover absolute top-0 right-full group-hover:right-0 transition-all duration-500' />
                                        </a>
                                    </div>
                                    <div className='px-4 pb-5'>
                                        <a href='/' className='line-clamp-2 font-semibold text-base text-center' title={item.name}>{item.name}</a>
                                        <div className='my-1 md:mr-5 text-end'>
                                            <p className='text-[15px] font-bold  text-[#ff8c00] '>{item.price}</p>
                                            {item.originalPrice !== 0 && <p className='text-sm font-normal  text-[#adadad] line-through '>{item.originalPrice}</p>}
                                        </div>
                                        <a href='/' className='md:block hidden text-sm font-normal text-center text-[#333333] hover:text-[#673AB7] my-1'>Thêm vào giỏ hàng</a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
            {modalOpen &&
                <>
                    <div onClick={() => setModalOpen(false)} className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                        <div onClick={(e) => e.stopPropagation()} className="bg-white  shadow-xl w-[90%] max-w-4xl -top-20  relative ">
                            {/* Nút đóng */}
                            <button
                                onClick={() => setModalOpen(false)}
                                className="absolute w-5 h-5 flex justify-center items-center font-bold top-3 right-3 text-white bg-[#673AB7] rounded-full text-xl"
                            >
                                &times;
                            </button>
                            <div className='grid grid-cols-1 min-[1000px]:grid-cols-2'>
                                <div className='col-span-1 px-4'>
                                    <a href='/'>
                                        <img src={productImg1} alt="collection" className='w-full h-full object-cover' />
                                    </a>
                                </div>
                                <div className='col-span-1 p-4'>
                                    <h3>
                                        <a href='/' className='text-[21px] font-normal text-center text-[#333333] hover:text-[#673AB7] my-1'>Áo Chạy Địa Hình Nam Raidlight Maillot de trail R-Light - KAKI</a>
                                    </h3>
                                    <div className='flex gap-2 divide-x-[1px] divide-[#898989] py-3'>
                                        <p className='text-[#898989] text-sm'><span className='font-semibold'>Mã SP: </span> 39112612</p>
                                        <p className='text-[#898989] text-sm pl-2'><span className='font-semibold'>Thương hiệu: </span> Raidlight</p>
                                    </div>
                                    <h3 className='text-[#858688] text-[22px] font-semibold mb-8'>1,850,000 VNĐ</h3>
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
                                            <input name='a' className='text-[#333] font-normal text-xs border px-5 w-[130px] py-2.5 text-center rounded-full' value="1" type="number" />
                                        </div>
                                        <div>
                                            <button className='uppercase bg-[#673AB7] p-2.5 rounded-full text-white text-xs font-normal'>Thêm vào giỏ hàng</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default CollectionProduct