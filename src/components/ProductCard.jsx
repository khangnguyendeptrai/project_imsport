import React, { useState } from 'react'
import BestSellerBadge from './BestSellerBadge'
import DiscountBadge from './DiscountBadge'
import GiftBadge from './GiftBadge'
import ProductAction from './ProductAction'
import ProductDetailPopup from './ProductDetailPopup'
import { Link } from 'react-router-dom'

const ProductCard = ({ item, isList = false, isRelated = true }) => {

  const [modalOpen, setModalOpen] = useState(false)
  const quickView = (id) => {
    console.log('quickView ', id)
    setModalOpen(true)
  }
  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', 'VNĐ');
  }
  const handleRealAddToCart = (productToAdd) => {
    console.log("Sản phẩm cần thêm vào giỏ hàng:", productToAdd);
    // productToAdd sẽ là: { id: "...", name: "...", price: "...", selectedSize: "M", quantity: 2 }

    // TẠI ĐÂY, bạn sẽ implement logic (Rule 4 và 5):
    // 1. Kiểm tra xem sản phẩm với size này đã có trong giỏ hàng (cart) chưa.
    // 2. Nếu chưa (Rule 4) => Thêm item mới vào cart.
    // 3. Nếu đã có (Rule 5) => Cập nhật (cộng dồn) số lượng cho item đó.
  };
  return (
    <div key={item.id} className='col-span-1 group'>
      <div className='relative overflow-hidden'>
        {item.isBestSeller && <BestSellerBadge />}
        {item.isDiscount !== 0 && <DiscountBadge />}
        {item.isGift && <GiftBadge />}
        {isRelated && <ProductAction product={item} quickView={quickView} />}


        <Link to={`/product/${item.id}`} className=''>
          <img src={item.image} alt="collection" className='w-full h-full object-cover group-hover:scale-0 transition-all duration-500' />
          <img src={item.imageHide} alt="collection" className='w-full h-full object-cover absolute top-0 right-full group-hover:right-0 transition-all duration-500' />
        </Link>
      </div>
      <div className='px-4 pb-5 md:text-end text-center'>
        <Link to={`/product/${item.id}`} className='line-clamp-2 font-semibold text-base text-center' title={item.name}>{item.name}</Link>
        <div className='my-1 md:mr-5 '>
          <p className='text-[15px] font-bold  text-[#ff8c00] '>{formatPrice(item.price)}</p>
          {item.originalPrice !== 0 && <p className='text-sm font-normal  text-[#adadad] line-through '>{item.originalPrice}</p>}
        </div>
        {!isList && (
          <a href='/' className='md:block hidden text-sm font-normal text-center text-[#333333] hover:text-[#673AB7] my-1'>Thêm vào giỏ hàng</a>
        )}
      </div>
      {modalOpen &&
        <ProductDetailPopup product={item} isOpen={modalOpen} onClose={() => setModalOpen(false)} onAddToCart={handleRealAddToCart} />
      }
    </div>
  )
}

export default ProductCard