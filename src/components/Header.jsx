import React from 'react'
import react from '../assets/react.svg';

const Header = () => {
  return (
    <header className='flex flex-row items-start md:items-center justify-between gap-4 px-6 py-4 text-gray-800 shadow-md font-poppins border-b-1 border-primary bg-[bar-back]'>
      <div className='flex items-center gap-3'>
        <img src={react} alt="logo" className='w-10 h-10' />
        <h1 className='text-2xl font-bold tracking-wide'> Sparrow Calendar</h1>
      </div>
      <div className=''>
        <div className='text-2xl '> 
          towards the right
        </div>
      </div>
    </header>
  )
}

export default Header
