import React, {useContext} from 'react'
import { LuPlus } from 'react-icons/lu';
import  useCalendarStore  from '../Store/useCalendarStore';


const CreateButton = () => {

  const setShowEventModal = useCalendarStore((state) => state.setShowEventModal);

  return (
    <button
      onClick={() => {
        setShowEventModal(true);
      }}
      className='button-primary'
    >
      <LuPlus size={24} /> Create Event
    </button>
  )
}

export default CreateButton
