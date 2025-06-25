import React from "react";
import Day from "./Day";
import Footer from "./Footer";
export default function Month({ month }) {
  const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return (
    <div className="flex flex-col p-1 h-[110%] mb-10 ">
      <div className="grid grid-cols-7 sticky top-0">
        {weekdays.map((day, i) => (
          <div key={i} className="text-center py-4 text-[10px] sm:text-xs font-bold text-gray-500">
            {day}
          </div>
        ))}
      </div>
      <div className="flex-1 grid grid-cols-7 grid-rows-5 ">
        {month.map((row, i) => (
          <React.Fragment key={i}>          
            {row.map((day, idx) => (
              <Day day={day} key={idx} rowIdx={i} />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
