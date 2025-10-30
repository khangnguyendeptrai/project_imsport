import React, { useState } from 'react'
import BestSellerBadge from './BestSellerBadge'
import DiscountBadge from './DiscountBadge'
import GiftBadge from './GiftBadge'
import ProductAction from './ProductAction'
import ProductDetailPopup from './ProductDetailPopup'
import { Link } from 'react-router-dom'

const ProductCard = ({ item, isList = false }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const quickView = (id) => {
    console.log('quickView ', id)
    setModalOpen(true)
  }
  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', '');
  }
  return (
    <div key={item.id} className='col-span-1 group'>
      <div className='relative overflow-hidden'>
        {item.isBestSeller && <BestSellerBadge />}
        {item.isDiscount !== 0 && <DiscountBadge />}
        {item.isGift && <GiftBadge />}
        <ProductAction product={item} quickView={quickView} />


        <Link to={`/product/${item.id}`} className=''>
          <img src={item.image} alt="collection" className='w-full h-full object-cover group-hover:scale-0 transition-all duration-500' />
          <img src={item.imageHide} alt="collection" className='w-full h-full object-cover absolute top-0 right-full group-hover:right-0 transition-all duration-500' />
        </Link>
      </div>
      <div className='px-4 pb-5 md:text-end text-center'>
        <Link to={`/product/${item.id}`} className='line-clamp-2 font-semibold text-base text-center' title={item.name}>{item.name}</Link>
        <div className='my-1 text-center md:mr-3 '>
          <p className='text-[15px] font-bold  text-[#ff8c00] '>{formatPrice(item.price)} VNĐ</p>
          {item.originalPrice !== 0 && <p className='text-sm font-normal  text-[#adadad] line-through '>{formatPrice(item.originalPrice)}</p>}
        </div>
        {!isList && (
          <button onClick={() => quickView(item.id)} className='md:block hidden w-full text-sm font-normal text-center text-[#333333] hover:text-[#673AB7] my-1'>Thêm vào giỏ hàng</button>
        )}
      </div>
      {modalOpen &&
        <ProductDetailPopup product={item} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      }
    </div>
  )
}

export default ProductCard