import React from 'react'

const DiscountBadge = () => {
    return (
        <div className='sale-badge rounded-b-full overflow-hidden absolute top-[10%] left-[10px] z-50 w-8 h-9 bg-[#673AB7] flex items-center justify-center'>
            <p className='text-white text-[11px] mb-1 font-semibold text-center'>15%</p>
        </div>)
}

export default DiscountBadge