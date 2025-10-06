import React from 'react'
import { imgCategoryCollection1, productImg1, productImg1Hide, productImg2, productImg2Hide, productImg3, productImg3Hide, productImg4, productImg4Hide, productImg5, productImg5Hide, productImg6, productImg6Hide, tagGift } from '../assets/ExportImage'
import BestSellerBadge from './BestSellerBadge'
import DiscountBadge from './DiscountBadge'
import GiftBadge from './GiftBadge'
import { EyeIcon, MagnifyingGlassPlusIcon } from '@heroicons/react/24/outline'
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
    return (
        <div className='container mx-auto !pt-10'>
            <h3 className='text-[28px] uppercase text-center mb-10'>
                <a className='text-[#333333] hover:text-[#673AB7] font-semibold' href='/'>{data.title}</a>
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2'>
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
                                    <div className='absolute top-1/2 left-[-5px] translate-y-[-50%] opacity-0 z-10 group-hover:opacity-100 transition-all duration-500 flex flex-col gap-y-1'>
                                        <div className='w-11 h-11 group/icon bg-white hover:bg-[#673AB7] rounded flex items-center justify-center'>
                                            <a title='Xem nhanh' className='w-full h-full flex items-center justify-center' href='/'>
                                            <MagnifyingGlassPlusIcon strokeWidth={2.5} class="h-4 w-4 text-[#333333] group-hover/icon:text-white" />

                                            </a>
                                        </div>
                                        <div className='w-11 h-11 group/icon bg-white hover:bg-[#673AB7] rounded flex items-center justify-center'>
                                            <a title='Xem chi tiết' className='w-full h-full flex items-center justify-center' href='/'>
                                                <EyeIcon strokeWidth={2.5} class="h-4 w-4 text-[#333333] group-hover/icon:text-white" />
                                            </a>
                                        </div>

                                    </div>


                                    <a className='' href='/'>
                                        <img src={item.image} alt="collection" className='w-full h-full object-cover group-hover:scale-0 transition-all duration-500' />
                                        <img src={item.imageHide} alt="collection" className='w-full h-full object-cover absolute top-0 right-full group-hover:right-0 transition-all duration-500' />
                                    </a>
                                </div>
                                <div className='px-4 pb-5'>
                                    <a href='/' className='line-clamp-2 font-semibold text-base text-center' title={item.name}>{item.name}</a>
                                    <div className='my-1 mr-5'>
                                        <p className='text-[15px] font-bold  text-[#ff8c00] text-end'>{item.price}</p>
                                        {item.originalPrice !== 0 && <p className='text-sm font-normal text-end text-[#adadad] line-through '>{item.originalPrice}</p>}
                                    </div>
                                    <a href='/' className='text-sm font-normal text-center text-[#333333] hover:text-[#673AB7] my-1'>Thêm vào giỏ hàng</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CollectionProduct