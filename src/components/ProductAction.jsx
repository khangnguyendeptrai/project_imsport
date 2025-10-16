import { EyeIcon, MagnifyingGlassPlusIcon } from '@heroicons/react/24/outline'
import React from 'react'

const ProductAction = ({product, quickView}) => {
    return (
        <div className='absolute top-1/2 left-[-5px] translate-y-[-50%] opacity-0 z-10 group-hover:opacity-100 transition-all duration-500 flex flex-col gap-y-1'>
            <div className='w-11 h-11 group/icon bg-white hover:bg-[#673AB7] rounded flex items-center justify-center'>
                <a title='Xem nhanh' className='w-full h-full flex items-center justify-center' href='/' onClick={(e) => {
                    e.preventDefault()
                    quickView(product.id)
                }}>
                    <MagnifyingGlassPlusIcon strokeWidth={2.5} className="h-4 w-4 text-[#333333] group-hover/icon:text-white" />

                </a>
            </div>
            <div className='w-11 h-11 group/icon bg-white hover:bg-[#673AB7] rounded flex items-center justify-center'>
                <a title='Xem chi tiết' className='w-full h-full flex items-center justify-center' href='/'>
                    <EyeIcon strokeWidth={2.5} className="h-4 w-4 text-[#333333] group-hover/icon:text-white" />
                </a>
            </div>

        </div>
    )
}

export default ProductAction