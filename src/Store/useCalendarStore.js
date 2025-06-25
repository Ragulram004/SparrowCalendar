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
  
  labels: [],
  setLabels: (labels) => set({ labels }),

  getFilteredEvents: () => {
    const { savedEvents, labels } = get();
    const activeLabels = labels.filter((lbl) => lbl.checked).map((lbl) => lbl.label);
    if (activeLabels.length === 0) return savedEvents;
    return savedEvents.filter((evt) => activeLabels.includes(evt.label));
  },

  showEventModal: false,
  setShowEventModal: (show) => {
    set({ showEventModal: show });
    if (!show) set({ selectedEvent: null });
  },

  MiniCalendarMonth: dayjs().month(),
  setMiniCalendarMonth: (month) => set({ MiniCalendarMonth: month }), 

  selectedEvent: null,
  setSelectedEvent: (event) => set({ selectedEvent: event }),

  monthIndex: dayjs().month(),
  setMonthIndex: (index) => set({ monthIndex: index }),

  currentYear: dayjs().year(),
  setCurrentYear: (year) => set({ currentYear: year }),

  daySelected: dayjs(),
  setDaySelected: (day) => set({ daySelected: day }),
}));

export default useCalendarStore;
