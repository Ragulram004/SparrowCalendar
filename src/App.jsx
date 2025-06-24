import { useState } from 'react'
import {Toaster} from 'react-hot-toast'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import MonthCalendar from './components/MonthCalendar'
import { getMonth } from './utils/helper'
import EventModel from './components/EventModel'
import useStore from './Store/Store'
import Footer from './components/Footer'



function App() {

  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const showEventModal = useStore((state) => state.showEventModal);


  return (
    <div className='flex flex-col h-screen w-screen font-primary'>
        {showEventModal && <EventModel />}
        <Header />
        <div className='flex flex-1 overflow-hidden'>          
          <div className='w-[250px] border-r border-gray-300 h-full'>
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
