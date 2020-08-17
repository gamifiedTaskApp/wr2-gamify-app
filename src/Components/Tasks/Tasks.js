import React, { useState, useEffect } from 'react';
// import DayDropdown from './DayDropdown';
import Calender from '../Calender/Calender';
import ChildDropdown from './ChildDropdown';
import './tasks.css';
import { connect } from 'react-redux';
import { getAllTasks } from '../../redux/actionCreators';

function Tasks(props) {

  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    if (props.user) {
      props.getAllTasks(props.user.id)
    }
  }, [props.user]);

  useEffect(() => {
    setIsOpen(false)
  }, [selectedDate]);

  return (
    <div className='tasks'>
      {selectedDate.toDateString()}
      <div className='dropdown_holder'>
        <ChildDropdown />
        {isOpen
          ? <Calender setSelectedDate={setSelectedDate} setIsOpen={setIsOpen} />
          : <p onClick={() => setIsOpen(true)}>Select Date</p>
        }
      </div>

      <div className='task_holder'>

      </div>
    </div>
  )
};

const mapDispatchToProps = {
  getAllTasks
};

function mapStateToProps(state) {
  return {
    user: state.userReducer.user.data
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Tasks);




// FOR DAYDROPDOWN COMPONENT
{/* <DayDropdown setTitle={setTitle} title={title} /> */ }
  // const [title, setTitle] = useState('');