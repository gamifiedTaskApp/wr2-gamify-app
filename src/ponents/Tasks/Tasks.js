import React, { useState, useEffect } from 'react';
// import DayDropdown from './DayDropdown';
import Calender from '../Calender/Calender';
import ChildDropdown from './ChildDropdown';
import './tasks.css';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { getAllTasks, addTask, removeTask , getChildTasks} from '../../redux/actionCreators';

function Tasks(props) {

  const isChild = props.user ? props.user.isChild ? true : false : "";
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [taskName, setTaskName] = useState('');
  const [points, setPoints] = useState(0);
  const [description, setDescription] = useState('');
  const [childId, setChildId] = useState('');
  const [tasks, setTasks] = useState('');
  selectedDate.setHours(0, 0, 0 ,0);

  useEffect(() => {
    setIsOpen(false)
    console.log(selectedDate)
  }, [selectedDate]);

  function addTask() {
    props.addTask(taskName, points, description, props.user.id, childId, selectedDate);
    props.getChildTasks(childId)
  };

  function remove(taskId, userId) {
    props.removeTask(taskId, userId);
  };

  return (
    <div className='tasks'>
      {selectedDate.toDateString()}
      <div className='dropdown_holder' onKeyPress={() => setIsOpen(false)}>
        <ChildDropdown isChild={isChild} userId={props.user ? props.user.id : ""} title={title} setTitle={setTitle} setChildId={setChildId} setTasks={setTasks} selectedDate={selectedDate}/>
        {isOpen
          ? <Calender setSelectedDate={setSelectedDate} setIsOpen={setIsOpen} childId={childId} setTasks={setTasks} />
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

              {/* <Calender /> */}

              <div>
                <button onClick={addTask}>Add Task</button>
              </div>

            </div>
            : null
          }
        </div>
      </div>
      {!tasks
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
      }
      {props.loggedIn ? null : <Redirect to={'/login'} />}
    </div>
  )
};

const mapDispatchToProps = {
  getAllTasks,
  addTask,
  removeTask,
  getChildTasks
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