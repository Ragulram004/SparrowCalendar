import React from 'react'
import CreateButton from './CreateButton'
import MiniCalendar from './MiniCalendar'
import MyLabels from './ToadyEvents'

const Sidebar = () => {
  return (
    <div className='flex flex-col items-center gap-3 p-5 w-64  bg-[bar-back]'>
      <CreateButton/>
      <MiniCalendar/>
      <MyLabels/>
    </div>
  )
}

export default Sidebar
