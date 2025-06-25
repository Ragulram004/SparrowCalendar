import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import  useCalendarStore  from '../Store/useCalendarStore';

const Day = ({ day, rowIdx }) => {
  const [dayEvents, setDayEvents] = useState([]);

  const setShowEventModal = useCalendarStore((state) => state.setShowEventModal);
  const setDaySelected = useCalendarStore((state) => state.setDaySelected);
  const setSelectedEvent = useCalendarStore((state) => state.setSelectedEvent);
  const filteredEvents = useCalendarStore.getState().getFilteredEvents();

  useEffect(() => {
    const events = filteredEvents.filter((event) =>
      dayjs(event.day).date() === day.date() &&
      dayjs(event.day).month() === day.month() &&
      dayjs(event.day).year() === day.year()
    );
    setDayEvents(events);
  }, [day,filteredEvents]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "border border-[#305DDD] border-t-5 text-[#305DDD]  font-bold rounded-md flex p-2 h-full "
      : "text-gray-700 font-[500] border border-primary rounded-md flex p-2 h-full";
  }

  const handleDoubleClick = () => {
    setDaySelected(day);
    setShowEventModal(true);
  };

  const handleEventClick = (evt) =>{
    setSelectedEvent(evt);
    setShowEventModal(true);
  }

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
    <div className={`flex flex-col max-h-[160px]  ${getCurrentDayClass()} `} onDoubleClick={handleDoubleClick}>
      <div className="flex flex-col items-start mb-1">
          <p className={`text-sm md:text-lg `}>
            {day.format("DD")}
          </p>
      </div>

      <div className="flex-1 overflow-y-scroll no-scrollbar">
        {dayEvents.map((evt, idx) => (
          <div
          key={idx}
            className={`${getEventBgColor(evt.label)} 
              text-[13px] px-2 py-1 m-0.5 border-l-3 rounded-e-2xl cursor-pointer transition-all duration-200
              flex flex-row items-center gap-2 whitespace-nowrap
            `}
            onClick={(e)=>{
              e.stopPropagation();
              setDaySelected(day);
              handleEventClick(evt);
            }}
          >
            <span className="font-medium">{evt.title}</span>

            {evt.description && (
              <span className="text-[10px] truncate w-full">
                {evt.description}
              </span>
            )}
          </div>

        ))}
      </div>
    </div>
  );
};

export default Day;
