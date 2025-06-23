import React from 'react'
import CreateButton from './CreateButton'
import MiniCalendar from './MiniCalendar'

const Sidebar = () => {
  return (
    <div className='flex flex-col items-center gap-8 p-5 w-64 border-r-1 border-primary bg-[bar-back]'>
      <CreateButton/>
      <MiniCalendar/>
    </div>
  )
}

export default Sidebar
