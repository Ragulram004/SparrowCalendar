import React, {useContext} from 'react'
import { LuPlus } from 'react-icons/lu';

const CreateButton = () => {

  // const {setShowModel} = useContext();

  return (
    <button
      onClick={() => {
        // setShowModel(true)
      }}
      className='button-primary'
    >
      <LuPlus size={24} /> Create Event
    </button>
  )
}

export default CreateButton
