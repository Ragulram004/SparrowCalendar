import React from 'react'
import calendar from '../assets/calendar.webp'
import Navigator from './Navigator';
import dayjs from 'dayjs';
import { IoCalendar } from "react-icons/io5";

const Header = () => {
  return (
    <header className='md:grid grid-cols-3 items-start md:items-center justify-between gap-4 px-6 py-3 text-gray-800 shadow-md font-poppins border-b-1 border-primary bg-[bar-back]'>
      <div className=' hidden md:flex items-center gap-3'>
        <img src={calendar} alt="logo" className='w-10 h-10' />
        <h1 className='text-2xl font-bold tracking-wide'> Sparrow Calendar</h1>
      </div>
      <div className=''>
        <div className='text-2xl flex justify-center'> 
          <Navigator/>
        </div>
      </div>
      <div className='hidden md:flex justify-self-end flex-row items-center gap-2'>
        <div>
          <IoCalendar/>
        </div>
        <div>
           <p className='text-xs'>Today</p>
            <p className='font-light text-sm'>{dayjs().format('DD-MM-YY')}, {dayjs().format('dddd')}</p>
        </div>
      </div>
    </header>
  )
}

export default Header
