import React, { useState } from 'react'
import { LuChevronLeft } from "react-icons/lu";
import { LuChevronRight } from "react-icons/lu";
import { getMonth } from '../utils/helper';
import dayjs from 'dayjs';
import useCalendarStore from '../Store/useCalendarStore';

const Navigator = () => {


  const monthIndex = useCalendarStore((state) => state.monthIndex);
  const setMonthIndex = useCalendarStore((state) => state.setMonthIndex);
  const currentYear = useCalendarStore((state) => state.currentYear);
  const setCurrentYear = useCalendarStore((state) => state.setCurrentYear);


  const handlePrevMonth = () => {
    if (monthIndex === 0) {
      setMonthIndex(11);
      setCurrentYear(currentYear - 1);
    } else {
      setMonthIndex(monthIndex - 1);
    }
  };

  const handleNextMonth = () => {
    if (monthIndex === 11) {
      setMonthIndex(0);
      setCurrentYear(currentYear + 1);
    } else {
      setMonthIndex(monthIndex + 1);
    }
  };

  const handleToday = () => {
    setMonthIndex(dayjs().month());
    setCurrentYear(dayjs().year());
  }

  return (
    <div className='flex flex-row items-center gap-5'>
      <button
        className='button-primary text-sm'
        onClick={() => {
          handleToday();
        }}
      >
        Today
      </button>
      <div className='flex flex-row items-center font-bold gap-5'>
        <button
          className='hover:bg-gray-500 hover:text-white  cursor-pointer p-2 rounded-full transition-colors duration-200'
          onClick={handlePrevMonth}
        >
          <LuChevronLeft/>
        </button>
        <button
          className='hover:bg-gray-500 hover:text-white cursor-pointer p-2 rounded-full transition-colors duration-200'
          onClick={handleNextMonth}
        >
          <LuChevronRight/>
        </button>
      </div>
      <div className='text-lg'>
        {dayjs(new Date(currentYear, monthIndex)).format("MMMM YYYY")}
      </div>
    </div>
  )
}

export default Navigator
