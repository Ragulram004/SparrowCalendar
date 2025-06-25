import { useEffect, useState } from 'react'
import {Toaster} from 'react-hot-toast'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import MonthCalendar from './components/MonthCalendar'
import { getMonth } from './utils/helper'
import EventModel from './components/EventModel'
import  useCalendarStore from './Store/useCalendarStore'
import Footer from './components/Footer'



function App() {
  
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const showEventModal = useCalendarStore((state) => state.showEventModal);
  const monthIndex = useCalendarStore((state) => state.monthIndex);
  const currentYear = useCalendarStore((state) => state.currentYear);

  useEffect(()=>{
    const currentMonth = getMonth(monthIndex);
    setCurrentMonth(currentMonth);
  },[monthIndex])


  return (
    <div className='flex flex-col h-screen w-screen font-primary'>
      {showEventModal && <EventModel />}
      <Header />
      <div className='flex flex-1 h-full overflow-hidden'>          
        <div className='hidden md:block w-[250px] border-r border-gray-300 h-full'>
          <Sidebar />
        </div>
        <div className='flex-1 overflow-y-auto'>
          <MonthCalendar month={currentMonth} />
          <Footer />
        </div>
      </div>
      <Toaster
        toastOptions={{
          className:"",
          style:{
            fontSize:"18px",
          }
        }}
      />
    </div>

  )
}

export default App
