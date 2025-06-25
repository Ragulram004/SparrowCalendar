import React from 'react'
import react from '../assets/react.svg';
import Navigator from './Navigator';

const Header = () => {
  return (
    <header className='grid grid-cols-3 items-start md:items-center justify-between gap-4 px-6 py-3 text-gray-800 shadow-md font-poppins border-b-1 border-primary bg-[bar-back]'>
      <div className='flex items-center gap-3'>
        <img src={react} alt="logo" className='w-10 h-10' />
        <h1 className='text-2xl font-bold tracking-wide'> Sparrow Calendar</h1>
      </div>
      <div className=''>
        <div className='text-2xl flex justify-center'> 
          <Navigator/>
        </div>
      </div>
      <div className='w-10 h-10 bg-gray-300 rounded-full justify-self-end '>

      </div>
    </header>
  )
}

export default Header
