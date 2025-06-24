import React, { useEffect, useState } from 'react'
import useStore from '../Store/Store'
import dayjs from 'dayjs';

const Day = ({day, rowIdx}) => {

  const [dayEvents, setDayEvents] = useState([]);

  const setShowEventModal = useStore((state) => state.setShowEventModal);
  const setDaySelected = useStore((state) => state.setDaySelected);
  const getfilteredEvents = useStore((state) => state.getFilteredEvents);
  const setSelectedEvent = useStore((state) => state.setSelectedEvent);

  const filteredEvents = getfilteredEvents();

  useEffect(() => {
    const events = filteredEvents.filter(
      (event) => dayjs(event.day).format('DD-MM-YY') === day.format('DD-MM-YY')
    )
    setDayEvents(events);
  },[day])

  function getCurrentDayClass(){
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ?"border border-[#305DDD] border-t-5 text-[#305DDD] font-bold rounded-md flex p-2 h-full"
      :"text-gray-700 font-[500] border  border-primary rounded-md flex p-2 h-full";
  }

  const handleDoubleClick = () =>{
    setDaySelected(day);
    setShowEventModal(true);
  }



  return (
    <div className='flex flex-col h-full'>      
      <header className='flex flex-col items-center'>
        {rowIdx === 0 && (
          <p className='text-[10px] sm:text-xs font-bold text-gray-500 '>
            {day.format("ddd").toUpperCase()}
          </p>
        )}
      </header>
      <div className= {` ${getCurrentDayClass()}`}
        onDoubleClick={handleDoubleClick}
      >
          <p className={`text-sm md:text-lg`}>
            {day.format("DD")}
          </p>
      </div>
      <div className="flex-1 overflow-hidden">
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedEvent(evt);
              setShowEventModal(true);
            }}
            className={`px-1 py-0.5 sm:px-2 sm:py-1 mb-1 rounded-md text-[10px] sm:text-sm text-gray-700 font-medium truncate cursor-pointer transition-all duration-200
            bg-opacity-20 hover:bg-opacity-40 ${getEventBgColor(evt.label)}`}
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div>
    
  )
}

export default Day
