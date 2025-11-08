import { EyeIcon, MagnifyingGlassPlusIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { Link } from 'react-router-dom'

const ProductAction = ({product, quickView}) => {
    return (
        <div className='absolute top-1/2 left-[-5px] translate-y-[-50%] hidden -z-10 md:group-hover:z-50 md:group-hover:flex transition-all duration-500  flex-col gap-y-1'>
            
            <div className='w-11 h-11 relative group/icon bg-white hover:bg-[#673AB7] rounded flex items-center justify-center'>
                <a  className='w-full h-full flex items-center justify-center' href='/' onClick={(e) => {
                    e.preventDefault()
                    quickView(product.id)
                }}>
                    <MagnifyingGlassPlusIcon strokeWidth={2.5} className="h-4 w-4 text-[#333333] group-hover/icon:text-white" />

                </a>
                <span className=" z-50 absolute left-1/2 bottom-[-40px] ml-2 -translate-y-1/2 px-2 py-1 text-sm bg-black text-white rounded hidden group-hover/icon:block transition-opacity duration-100 whitespace-nowrap ">
                    Xem nhanh
                </span>
            </div>
            <div className='w-11 h-11 relative group/icon bg-white hover:bg-[#673AB7] rounded flex items-center justify-center'>
                <Link  className='w-full h-full flex items-center justify-center' to = {`/product/${product.id}`}>
                    <EyeIcon strokeWidth={2.5} className="h-4 w-4 text-[#333333] group-hover/icon:text-white" />
                </Link>
                  <span className="z-50 absolute left-1/2 bottom-[-40px] ml-2 -translate-y-1/2 px-2 py-1 text-sm bg-black text-white rounded hidden group-hover/icon:block transition-opacity duration-100 whitespace-nowrap">
                    Xem chi tiết
                </span>
            </div>

        </div>
    )
}

export default ProductAction