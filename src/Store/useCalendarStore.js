import dayjs from 'dayjs';
import { create } from 'zustand';

function savedEventsReducer(state, action) {
  switch (action.type) {
    case 'push':
      return [...state, action.payload];
    case 'update':
      return state.map((evt) => (evt.id === action.payload.id ? action.payload : evt));
    case 'delete':
      return state.filter((evt) => evt.id !== action.payload.id);
    default:
      throw new Error();
  }
}

const initEvents = () => {
  const stored = localStorage.getItem('savedEvents');
  return stored ? JSON.parse(stored) : [];
};

const useCalendarStore = create((set, get) => ({
  // Event data
  savedEvents: initEvents(),

  // Labels initialized empty, filled later
  labels: [],

  // Dispatch logic
  dispatchCalEvent: (action) => {
    const updatedEvents = savedEventsReducer(get().savedEvents, action);
    localStorage.setItem('savedEvents', JSON.stringify(updatedEvents));

    // Regenerate labels from updated events
    const uniqueLabels = [...new Set(updatedEvents.map((evt) => evt.label))];
    const updatedLabels = uniqueLabels.map((label) => {
      const existing = get().labels.find((lbl) => lbl.label === label);
      return {
        label,
        checked: existing ? existing.checked : true,
      };
    });

    set({ savedEvents: updatedEvents, labels: updatedLabels });
  },

  // Optional external setters
  setLabels: (labels) => set({ labels }),

  // Getter for filtered events
  getFilteredEvents: () => {
    const { savedEvents, labels } = get();
    const activeLabels = labels.filter((lbl) => lbl.checked).map((lbl) => lbl.label);
    if (activeLabels.length === 0) return savedEvents;
    return savedEvents.filter((evt) => activeLabels.includes(evt.label));
  },

  // Modal UI state
  showEventModal: false,
  setShowEventModal: (show) => {
    set({ showEventModal: show });
    if (!show) set({ selectedEvent: null });
  },

  selectedEvent: null,
  setSelectedEvent: (event) => set({ selectedEvent: event }),

  // Calendar navigation
  daySelected: dayjs(),
  setDaySelected: (day) => set({ daySelected: day }),
}));

export default useCalendarStore;



{/* <div className={`flex  flex-col ${getCurrentDayClass()}`}>
      
      <header className='flex flex-col items-center m-2'>
        {rowIdx === 0 && (
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 mt-1">
            {day.format("ddd").toUpperCase()}
          </p>
        )}
      </header>
      <div className="flex flex-col items-center mb-1">
          <p className={`text-sm md:text-lg `}>
            {day.format("DD")}
          </p>
      </div>

      <div className="flex-1 overflow-hidden">
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              handleEventClick(evt);
            }}
            className={`px-1 py-0.5 sm:px-2 sm:py-1 mb-1 rounded-md text-[10px] sm:text-sm text-gray-700 font-medium truncate cursor-pointer transition-all duration-200 bg-opacity-20 hover:bg-opacity-40 ${getEventBgColor(evt.label)}`}
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div> */}