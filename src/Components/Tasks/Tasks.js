import React from 'react';
import DayDropdown from './DayDropdown';
import ChildDropdown from './ChildDropdown';
import './tasks.css';


function Tasks(props) {
  return (
    <div className='tasks'>
      <div className='dropdown_holder'>
        <ChildDropdown />
        <DayDropdown />
      </div>

      <div className='task_holder'>

      </div>
    </div>
  )
};
export default Tasks;