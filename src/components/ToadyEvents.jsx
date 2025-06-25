import { useState, useEffect } from 'react'
import useCalendarStore from '../Store/useCalendarStore';
import dayjs from 'dayjs';
import { BiTask } from "react-icons/bi";

const TodayEvents = () => {

  const [todayEvents, setTodayEvents] = useState([]); 
  const filteredEvents = useCalendarStore.getState().getFilteredEvents();

  useEffect(() => {
    const events = filteredEvents.filter((event) =>
      dayjs(event.day).date() === dayjs().date()
    );
    setTodayEvents(events);
  }, [filteredEvents]);

  function getEventBgColor(label) {
    const colorMap = {
      orange: "bg-orange-100 hover:bg-orange-200 text-red-800",
      pink: "bg-pink-100 hover:bg-pink-200 text-pink-800",
      green: "bg-green-100 hover:bg-green-200 text-green-800",
      purple: "bg-purple-100 hover:bg-purple-200 text-purple-800",
      blue: "bg-blue-100 hover:bg-blue-200 text-blue-800",
      gray: "bg-gray-100 hover:bg-gray-200 text-gray-800",
    };
    return colorMap[label] || "bg-gray-100 hover:bg-gray-200 text-gray-800";
  }

  return (
    <div className=''>
      <div className='text-center text-sm font-semibold mb-2'>
        <p>Today's Events</p>
      </div>   
      {todayEvents.length > 0 ? (
        todayEvents.map((event, i) => (
          <div
            key={i}
            className={`${getEventBgColor(event.label)} px-3 py-2 mb-2 border rounded-md shadow-sm bg-gray-100 `}
          >
            <div className="text-sm flex items-center gap-1">
              <BiTask/>
              {event.title}
            </div>
            {event.description && (
              <p className="text-xs text-gray-600">{event.description}</p>
            )}
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500">No events for today</p>
      )}
    </div>
  )
}

export default TodayEvents
