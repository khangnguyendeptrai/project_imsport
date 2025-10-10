import React from 'react'
import { collectionImg1, collectionImg2 } from '../assets/ExportImage'
const NewColleciton = () => {
    return (
        <div className='container mx-auto'>
            <h3 className='text-2xl uppercase text-[#777] font-semibold text-center mb-10 pt-5'>New Collection</h3>
            <div className='grid grid-cols-1 md:grid-cols-2'>
                <div className='col-span-1 px-4'>
                    <a href='/'>
                        <img src={collectionImg1} alt="collection" className='w-full h-full object-cover' />
                    </a>
                </div>
                <div className='col-span-1 px-4 md:pt-0 pt-4 '>
                    <a href='/'>
                        <img src={collectionImg2} alt="collection" className='w-full h-full object-cover' />
                    </a>
                </div>
            </div>
        </div>
        
    )
}

export default NewColleciton