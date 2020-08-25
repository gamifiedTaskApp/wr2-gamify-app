import React, { useState, useEffect } from 'react';
// import DayDropdown from './DayDropdown';
import Calender from '../Calender/Calender';
// import Calendar from '../Calender/CalenderTwo';
import ChildDropdown from './ChildDropdown';
import './tasks.css';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { getAllTasks, addTask, removeTask } from '../../redux/actionCreators';

function Tasks(props) {

  console.log(props.user)

  const isChild = props.user ? props.user.isChild ? true : false : "";
  let tasks = props.tasks ? props.tasks : [];
  const [title, setTitle] = useState('');
  const [childId, setChildId] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [addTaskDate, setAddTaskDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [taskName, setTaskName] = useState('');
  const [points, setPoints] = useState(0);
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (props.user) {
      // console.log(props.user.id)
      props.getAllTasks(props.user.id)
    }
  }, [props.user]);

  useEffect(() => {
    setIsOpen(false)
  }, [selectedDate]);

  function addTask() {
    props.addTask(taskName, points, description, props.user.id, selectedDate);
  };

  function remove(taskId, userId) {
    props.removeTask(taskId, userId);
  };

  let filterByChild = tasks.filter(child => {
    return child.child_id === childId
  }).map((task, i) => {
    return (
      <div key={i}>
        <div className='task_display'>
          <input type='checkbox' />
          <h5><b>{`${task.task_name}`}</b></h5>
          <h5><b>{`${task.points_gained}`}</b></h5>
          <button onClick={() => remove(task.task_id, task.user_id)} >Remove Task</button>
        </div>
      </div>
    )
  })

  // let filterByDate = 

  return (
    <div className='tasks'>
      {selectedDate.toDateString()}
      <div className='dropdown_holder' onKeyPress={() => setIsOpen(false)}>
        <ChildDropdown isChild={isChild} userId={props.user.id} title={title} setTitle={setTitle} setChildId={setChildId} />
        {isOpen
          ? <Calender setSelectedDate={setSelectedDate} setIsOpen={setIsOpen} />
          : <p onClick={() => setIsOpen(true)}>Select Date</p>
        }
      </div>

      <div className='tasks_holder'>
        <div className='add_task_holder'>
          <b className='add_task_button' onClick={() => setAddOpen(!addOpen)}>Create New Task</b>
          {addOpen
            ? <div>
              <div>
                <label>Enter Task:</label>
                <input value={taskName} onChange={(e) => setTaskName(e.target.value)} />
              </div>
              <div>
                <label>Task Description:</label>
                <input value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>

              <div>
                <label>Points Gained:</label>
                <input type='number' value={points} onChange={(e) => setPoints(e.target.value)} />
              </div>
              {toggle
                ? <Calender setSelectedDate={setAddTaskDate} setIsOpen={setToggle} />
                : <p onClick={() => setToggle(true)}>Select Date</p>
              }

              <div>
                <button onClick={addTask}>Add Task</button>
              </div>

            </div>
            : null
          }
        </div>
      </div>
      {filterByChild}
      {/* {!tasks
        ? null
        : tasks.map((task, i) => {
          return (
            <div key={i}>
              <div className='task_display'>
                <input type='checkbox' />
                <h5><b>{`${task.task_name}`}</b></h5>
                <h5><b>{`${task.points_gained}`}</b></h5>
                <button onClick={() => remove(task.task_id, task.user_id)} >Remove Task</button>
              </div>
            </div>
          )
        })
      } */}
      {props.loggedIn ? null : <Redirect to={'/login'} />}
    </div>
  )
};

const mapDispatchToProps = {
  getAllTasks,
  addTask,
  removeTask
};

function mapStateToProps(state) {
  return {
    user: state.userReducer.user.data,
    tasks: state.taskReducer.tasks.data,
    loggedIn: state.userReducer.loggedIn
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Tasks);




// FOR DAYDROPDOWN COMPONENT
{/* <DayDropdown setTitle={setTitle} title={title} /> */ }
  // const [title, setTitle] = useState('');