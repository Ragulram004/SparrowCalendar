import React from 'react'
import { LuChevronLeft } from "react-icons/lu";
import { LuChevronRight } from "react-icons/lu";
import dayjs from 'dayjs';

const Navigator = () => {
  return (
    <div className='flex flex-row items-center gap-5'>
      <button
        className='button-primary text-sm'
        onClick={() => {
          // today login
        }}
      >
        Today
      </button>
      <div className='flex flex-row items-center font-bold gap-5'>
        <button
          className='hover:bg-gray-500 hover:text-white  cursor-pointer p-2 rounded-full transition-colors duration-200'
        >
          <LuChevronLeft/>
        </button>
        <button
          className='hover:bg-gray-500 hover:text-white cursor-pointer p-2 rounded-full transition-colors duration-200'
        >
          <LuChevronRight/>
        </button>
      </div>
      <div className=''>
        {dayjs(new Date()).format("MMMM YYYY")}
      </div>
    </div>
  )
}

export default Navigator
