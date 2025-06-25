import { useState } from 'react';
import { MdBookmarkBorder, MdCheck, MdClose } from 'react-icons/md';
import { LuTrash, LuTimer } from 'react-icons/lu';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import  useCalendarStore  from '../Store/useCalendarStore';

const colorClasses = {
  pink: { bg: 'bg-pink-500', ring: 'hover:ring-pink-300' },
  gray: { bg: 'bg-gray-500', ring: 'hover:ring-gray-300' },
  green: { bg: 'bg-green-500', ring: 'hover:ring-green-300' },
  blue: { bg: 'bg-blue-500', ring: 'hover:ring-blue-300' },
  orange: { bg: 'bg-orange-500', ring: 'hover:ring-red-300' },
  purple: { bg: 'bg-purple-500', ring: 'hover:ring-purple-300' },
};

const labels = [
  { name: 'Company', color: 'pink' },
  { name: 'Friends/Family', color: 'gray' },
  { name: 'To-Do', color: 'green' },
  { name: 'Memories', color: 'blue' },
  { name: 'Important', color: 'orange' },
  { name: 'Personal', color: 'purple' },
];

const EventModel = () => {
  const setShowEventModal = useCalendarStore((state) => state.setShowEventModal);
  const daySelected = useCalendarStore((state) => state.daySelected);
  const dispatchCalEvent = useCalendarStore((state) => state.dispatchCalEvent);
  const selectedEvent = useCalendarStore((state) => state.selectedEvent);
  const setDaySelected = useCalendarStore((state) => state.setDaySelected);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : '');
  const [description, setDescription] = useState(selectedEvent ? selectedEvent.description : '');
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent ? selectedEvent.label : labels[0].color
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const calenderEvent = {
      id: selectedEvent ? selectedEvent.id : Date.now(),
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
    };

    if (selectedEvent) {
      dispatchCalEvent({ type: 'update', payload: calenderEvent });
      toast.success('Event Updated Successfully');
    } else {
      dispatchCalEvent({ type: 'push', payload: calenderEvent });
      toast.success('Event Created Successfully');
    }
    setDaySelected(dayjs());
    setShowEventModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50 px-2 sm:px-4">
      <form
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg overflow-hidden"
        onSubmit={handleSubmit}
      >
        {/* Header */}
        <header className="bg-[#305DDD] px-4 sm:px-5 py-3 flex justify-between items-center">
          <div className='hidden md:block'>
            <p className='text-white'>Create Event</p>
          </div>
          <div className="flex gap-3 sm:gap-4 items-center">
            {selectedEvent && (
              <LuTrash
                onClick={() => {
                  dispatchCalEvent({ type: 'delete', payload: selectedEvent });
                  setShowEventModal(false);
                  setDaySelected(dayjs());
                  toast.success('Event Deleted Successfully');
                }}
                className="hover:text-white cursor-pointer text-lg transition"
              />
            )}
            <button type="button" onClick={() => {
                setDaySelected(dayjs());
                setShowEventModal(false)
              }}>
              <MdClose className="text-white hover:text-gray-200 transition text-lg cursor-pointer" />
            </button>
          </div>
        </header>

        {/* Body */}
        <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">
          <input
            type="text"
            name="title"
            placeholder="Add title"
            value={title}
            required
            className="w-full text-lg sm:text-xl font-semibold text-gray-800 border-2 p-2 rounded-lg border-gray-200 focus:outline-none focus:border-indigo-500 placeholder-gray-400 pb-1 sm:pb-2"
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="flex items-center gap-2 sm:gap-3 text-gray-600">
            <LuTimer className="text-base sm:text-lg" />
            <p className="text-xs sm:text-sm">
              {daySelected.format('dddd, MMMM DD')}
            </p>
          </div>

          <div className="flex items-start gap-2 sm:gap-3">
            <textarea
              name="description"
              rows="3"
              placeholder="Add a description"
              value={description}
              required
              className="w-full border-2 p-2 rounded-lg border-gray-200 focus:outline-none focus:border-indigo-500 text-gray-700 placeholder-gray-400 text-sm sm:text-base resize-none"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Label Reference */}
          <div className="text-xs sm:text-sm text-gray-500 mb-1 font-medium">
            <p className="mb-1">Label Color Reference:</p>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-1">
              {labels.map((lbl, i) => (
                <li key={i}>
                  <span
                    className={`inline-block w-3 h-3 ${colorClasses[lbl.color].bg} rounded-full mr-2`}
                  ></span>
                  {lbl.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Label Selection */}
          <div className="flex items-center gap-2 sm:gap-3">
            <MdBookmarkBorder className="text-gray-500 text-base" />
            <div className="flex gap-2 sm:gap-3">
              {labels.map((lbl, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lbl.color)}
                  className={`
                    w-6 h-6 sm:w-7 sm:h-7 rounded-full cursor-pointer flex items-center justify-center
                    transition ring-offset-1 hover:ring-2
                    ${colorClasses[lbl.color].bg} ${colorClasses[lbl.color].ring}
                  `}
                >
                  {selectedLabel === lbl.color && (
                    <MdCheck className="text-white text-xs sm:text-sm" />
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="flex justify-end border-t p-2 sm:p-4">
          <button type="submit" className="button-primary text-sm">
            Save
          </button>
        </footer>
      </form>
    </div>
  );
};

export default EventModel;
