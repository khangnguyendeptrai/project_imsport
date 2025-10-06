import React from 'react'
import { tagGift } from '../assets/ExportImage'

const GiftBadge = () => {
    return (
        <div className='gift-badge absolute w-[30px] h-[30px] top-[10%] left-[60px] z-50'>
            <img src={tagGift} alt="gift" />
        </div>
    )
}

export default GiftBadge