import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { div } from 'framer-motion/client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

// const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const Pagination = ({totalPage, currentPage, handlePage}) => {
    // const [currentPage, setCurrentPage] = useState(searchParams.get("page") || 1)
    const [inputPage, setInputPage] = useState(currentPage)
    const totalPages = totalPage
    const visibleCount = 4
    const data = Array.from({ length: totalPages }, (_, index) => index + 1)
        console.log(data);
        

    
    
    let start = 1;
    let end = visibleCount
    if (currentPage > 2) {
        start = currentPage - 1
        end = currentPage + 2
    }
    if (end > totalPages) {
        end = totalPages
        start = totalPages - visibleCount + 1
    }
    if(data.length < visibleCount) {
        start = 1
        end = data.length
    }
    const visiblePages = data.slice(start - 1, end)


    return (
        <div className='flex md:flex-row flex-col justify-center items-center gap-4'>
            <div className='flex justify-center items-center'>
                <button onClick={() => handlePage(currentPage - 1)} className={`${currentPage === 1 ? 'hidden' : 'block'} flex justify-center items-center duration-500 w-10 h-9 bg-white rounded-l-md border border-gray-300 hover:bg-[#eee] hover:text-[#23527c]`}><ChevronLeftIcon className="h-4 w-4 text-gray-500" />
                </button>
                {visiblePages.map((item, index) => (
                    <button disabled={currentPage == item ? 'disabled' : ''} key={index} className={`w-10 h-9 
                        ${data.length == 1 ? 'rounded-md' : ''}
                        ${currentPage == item ? 'bg-[#222] border-[#222] text-white cursor-default hover:!bg-[#222] hover:border-[#222] hover:text-white ' : 'bg-white border border-gray-300'} 
                        ${currentPage == 1 && item == 1 ? 'rounded-l-md' : item == data.length && currentPage == data.length ? 'rounded-r-md' : 'rounded-none'} 
                        hover:bg-[#eee] hover:text-[#23527c] font-light ml-[-1px]`}
                        onClick={() => {handlePage(item); setInputPage(item)}}>{item}</button>
                ))}
                <button onClick={() => handlePage(currentPage + 1)} className=
                    {`${currentPage == data.length ? 'hidden' : 'block'} 
                    flex justify-center items-center duration-300 w-10 h-9 bg-white rounded-r-md border ml-[-1px] border-gray-300 hover:bg-[#eee] hover:text-[#23527c]`} >
                    <ChevronRightIcon className="h-4 w-4 text-gray-500" />
                </button>
            </div>
            <form className='flex justify-center items-center' onSubmit={(e) => {
                e.preventDefault()
                handlePage(Number(inputPage))
            }}>
                <input type="text" placeholder='Page' className='h-9 w-24 md:w-auto border-[#ddd] border-[1px] rounded-md text-center' value={inputPage} onChange={(e) => {(Number(e.target.value) > 0 && Number(e.target.value)) <= totalPages && setInputPage(e.target.value)}} />
                <button type='submit' className='w-12 h-9 ml-3 bg-[#222] border-[#222] text-white cursor-pointer hover:bg-[#222] hover:border-[#222] hover:text-white rounded-md '>Go</button>
            </form>
        </div>
    )
}

export default Pagination