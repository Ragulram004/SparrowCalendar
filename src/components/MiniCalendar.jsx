import React, { useState, useEffect, useContext } from "react";
import dayjs from "dayjs";
import { getMonth } from "../utils/helper.js";
import { LuChevronLeft } from "react-icons/lu";
import { LuChevronRight } from "react-icons/lu";
import useCalendarStore from "../Store/useCalendarStore.js";


const MiniCalendar = () => {

  const setMiniCalendarMonth = useCalendarStore((state) => state.setMiniCalendarMonth);
  const setDaySelected = useCalendarStore((state) => state.setDaySelected);
  const daySelected = useCalendarStore((state) => state.daySelected);

  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const [currentYear, setCurrentYear] = useState(dayjs().year());
  const [currentMonth, setCurrentMonth] = useState(
    getMonth(currentMonthIdx, currentYear)
  );

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx, currentYear));
  }, [currentMonthIdx, currentYear]);

  const handlePrevMonth = () => {
    if (currentMonthIdx === 0) {
      setCurrentMonthIdx(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonthIdx((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonthIdx === 11) {
      setCurrentMonthIdx(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonthIdx((prev) => prev + 1);
    }
  };

  const getDayClass = (day) => {
    const format = "DD-MM-YY";
    const now = dayjs().format(format);
    const curr = day.format(format);
    const selected = daySelected && daySelected.format(format);

    if (curr === now) return "bg-blue-500 text-white font-semibold";
    if (curr === selected) return "bg-blue-100 text-blue-700 font-semibold";
    return "text-gray-900";
  };

  const monthYearLabel = dayjs(new Date(currentYear, currentMonthIdx)).format(
    "MMMM YYYY"
  );

  return (
    <div className="mt-2 text-sm w-full">
      {/* Header */}
      <header className="flex items-center justify-between mb-2 px-2">
        <button onClick={handlePrevMonth} className=" hover:bg-gray-200 rounded-full px-2 py-2  text-lg  cursor-pointer transition-colors duration-300">
          <LuChevronLeft />
        </button>
        <h2 className="text-md font-semibold ">
          {monthYearLabel}
        </h2>
        <button onClick={handleNextMonth} className="hover:bg-gray-200 rounded-full px-2 py-2  text-lg  cursor-pointer transition-colors duration-300">
          <LuChevronRight />
        </button>
      </header>

      {/* Week Days */}
      <div className="grid grid-cols-7 text-center text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
        {currentMonth[0].map((day, i) => (
          <div key={i}>{day.format("dd").charAt(0)}</div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 gap-y-1">
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (  
              <div key={idx}>
                <button
                  onClick={() => {
                    setMiniCalendarMonth(currentMonthIdx);
                    setDaySelected(day);
                  }}
                  className={`h-8 w-8 mx-auto rounded-full hover:bg-gray-500 hover:text-gray-200 flex items-center transition-colors duration-100 justify-center  ${getDayClass(
                    day
                  )}`}
                >
                  {day.format("D")}
                </button>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}


export default MiniCalendar