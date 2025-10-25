import React from 'react'
import BestSellerBadge from './BestSellerBadge'
import DiscountBadge from './DiscountBadge'
import GiftBadge from './GiftBadge'
import ProductAction from './ProductAction'

const ProductCard = ({ item, quickView, isList = false }) => {
  return (
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
      <div className='px-4 pb-5 md:text-end text-center'>
        <a href='/' className='line-clamp-2 font-semibold text-base text-center' title={item.name}>{item.name}</a>
        <div className='my-1 md:mr-5 '>
          <p className='text-[15px] font-bold  text-[#ff8c00] '>{item.price}</p>
          {item.originalPrice !== 0 && <p className='text-sm font-normal  text-[#adadad] line-through '>{item.originalPrice}</p>}
        </div>
        {!isList && (
          <a href='/' className='md:block hidden text-sm font-normal text-center text-[#333333] hover:text-[#673AB7] my-1'>Thêm vào giỏ hàng</a>
        )}
      </div>
    </div>
  )
}

export default ProductCard