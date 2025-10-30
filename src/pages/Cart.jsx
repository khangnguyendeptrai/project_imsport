import React, { useEffect, useState } from 'react'
import Breadcrumb from '../components/Filter/Breadcrumb'
import { dataFilter } from '../data/dataFilter'
import { Link } from 'react-router-dom';


const Cart = () => {
    const [dataCart, setDataCart] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        const cartItem = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        console.log('cartItem ', cartItem);
        setDataCart(cartItem);
    }, []);
    console.log(dataCart.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0));

    const handleQuantityChange = (id, value) => {
        const newQuantity = parseInt(value) || 1;
        setDataCart(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
        localStorage.setItem('cart', JSON.stringify(dataCart));
    };
    const formatPrice = (price) => {
        return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', 'VNĐ');
    }
    const handleDelete = (id) => {
        const cartItem = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        const newCartItem = cartItem.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(newCartItem));
        setDataCart(newCartItem);
    }
    return (
        <>
            <Breadcrumb data={dataFilter} />
            <div className="container">
                <div className="w-full">
                    <div className="col-span-1">
                        <h1 className='text-2xl font-semibold text-[#363636] my-5 uppercase '>Giỏ hàng</h1>
                        <div className="w-full">
                            <div className="col-span-1">
                                <table className='w-full border-spacing-y-3'>
                                    <thead className='border-b-[1px] border-[#ebebeb]'>
                                        <tr>
                                            <th className='text-center p-2 font-bold text-[#363636] w-[15%]'>Hình ảnh</th>
                                            <th className='text-center p-2 font-bold text-[#363636] w-[35%]'>Tên sản phẩm</th>
                                            <th className='text-center p-2 font-bold text-[#363636] w-[15%]'>Đơn giá</th>
                                            <th className='text-center p-2 font-bold text-[#363636] w-[15%]'>Số lượng</th>
                                            <th className='text-center p-2 font-bold text-[#363636] w-[15%]'>Thành tiền</th>
                                            <th className='text-center p-2 font-bold text-[#363636] w-[10%]'>Xóa</th>
                                        </tr>
                                    </thead>
                                    <tbody className='border-spacing-y-3'>
                                        {dataCart.map((item) => (
                                            <tr key={item.id} className='border-b-[1px] border-[#ebebeb]'>
                                                <td className='text-center py-2'><img src={item.image} alt={item.name} className='w-full object-cover' /></td>
                                                <td className='text-left py-2'><a href='/' className='hover:text-[#673AB7] text-[#333333]'>{item.name}</a></td>
                                                <td className='text-center py-2 text-[#858688] font-semibold text-sm'>{formatPrice(item.price)}</td>
                                                <td className='text-center py-2'>
                                                    <input type="number" min={1} className='w-20 h-10 px-2 border-[1px] border-[#ddd] rounded-full  text-[#363636] text-center outline-none' onFocus={(e) => e.target.select()} defaultValue={1} value={item.quantity}
                                                        //  onBlur={(e) => handleQuantityChange(item.id, e.target.value)} 
                                                        onChange={(e) => handleQuantityChange(item.id, e.target.value)} />
                                                </td>
                                                {/* Thành tiền = đơn giá * số lượng nhập ở trên */}
                                                <td className='text-center py-2 text-[#858688] font-semibold text-sm'>{formatPrice(item.price * (Number(item.quantity) || 1))}</td>

                                                <td className='text-center py-2 text-sm'><button onClick={() => handleDelete(item.id)} className='text-[#363636]'>Xóa</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className=''>
                                    <div className='flex gap-x-2 justify-end mt-8 text-[#ec0808] font-semibold text-lg'><span className='font-lighter text-[#1c1c1c] mr-2'>Tổng tiền:</span> {formatPrice(dataCart.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0))}</div>
                                    <div className='flex gap-x-4 justify-end mt-2'>
                                        <Link to='/' className='text-sm bg-[#f1f1f1] py-3 px-10 rounded-full text-black font-lighter'>Tiếp tục mua hàng</Link>
                                        <Link to='/' className='text-sm bg-[#673AB7] py-3 px-10 rounded-full text-white font-lighter'>Đặt hàng</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart