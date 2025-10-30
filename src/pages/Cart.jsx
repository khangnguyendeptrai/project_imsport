import React, { useEffect, useState } from 'react'
import Breadcrumb from '../components/Filter/Breadcrumb'
import { dataFilter } from '../data/dataFilter'


const Cart = () => {
    const [dataCart, setDataCart] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        const cartItem = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        setDataCart(cartItem);
    }, []);

    const handleQuantityChange = (id, value) => {
        const newQuantity = parseInt(value) || 1;
        setDataCart(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };
    const formatPrice = (price) => {
        return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', 'VNĐ');
    }
    const handleDelete = (id) => {
        setDataCart(prev => prev.filter(item => item.id !== id));
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
                                                    <input type="number" min={1} className='w-20 h-10 px-2 border-[1px] border-[#ddd] rounded-full  text-[#363636] text-center outline-none' onFocus={(e) => e.target.select()} defaultValue={1} value={item.quantity} onChange={(e) => handleQuantityChange(item.id, e.target.value)} />
                                                </td>
                                                {/* Thành tiền = đơn giá * số lượng nhập ở trên */}
                                                <td className='text-center py-2 text-[#858688] font-semibold text-sm'>{formatPrice(item.price * (Number(item.quantity) || 1))}</td>

                                                <td className='text-center py-2 text-sm'><button onClick={() => handleDelete(item.id)} className='text-[#363636]'>Xóa</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart