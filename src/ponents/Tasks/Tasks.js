import React, { useState, useEffect } from "react";
// import DayDropdown from './DayDropdown';
import Calender from "../Calender/Calender";
import TaskPopup from "./TaskPopup";
import ChildDropdown from "./ChildDropdown";
import "./tasks.css";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import SetChildTasks from "./SetChildTasks"
import { connect } from "react-redux";
import {
  getAllTasks,
  addTask,
  removeTask,
  getChildTasks,
} from "../../redux/actionCreators";
import TaskMap from "./TaskMap";

function Tasks(props) {
  const isChild = props.user ? (props.user.isChild ? true : false) : "";
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [taskName, setTaskName] = useState("");
  const [pointsGained, setPoints] = useState(0);
  const [taskDescription, setDescription] = useState("");
  const [childId, setChildId] = useState("");
  const [tasks, setTasks] = useState("");
  selectedDate.setHours(0, 0, 0, 0);

  useEffect(() => {
    setIsOpen(false);
    console.log(selectedDate);
  }, [selectedDate]);

  function addTask() {
    let date = selectedDate
    const userId = props.user.id
    console.log(childId)
    console.log(userId)
    //const body = { taskName, pointsGained, taskDescription, userId, childId, selectedDate }
    //props.getChildTasks(childId)

    Axios.post('/api/add/task', { taskName, pointsGained, taskDescription, userId, childId, date })
      .then(res => {
        console.log(res)
        Axios.post(`/api/child/tasks`, { childId, date })
          .then(newRes => {
            console.log(newRes)
            setTasks(newRes.data)
          })
          .catch(err => console.log(err))
      })
  }
  function switchTask(isTaskComplete, taskId) {
    let date = selectedDate
    Axios.put('/api/task/complete', { isTaskComplete, taskId })
      .then(res => {
        isTaskComplete = !isTaskComplete
      })
      .catch(err => {
        console.log(err)
      })
  }

  function remove(taskId, userId) {
    //props.removeTask(taskId, userId);
    //props.getChildTasks(childId)
    let date = selectedDate
    Axios.delete(`/api/remove/task?id=${taskId}&userId=${userId}`)
      .then(res => {
        Axios.post(`/api/child/tasks`, { childId, date })
          .then(newRes => {
            console.log(res)
            setTasks(newRes.data)
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))

  }

  return (
    <div className="tasks">
      {selectedDate.toDateString()}
      {isChild ?
        <div>
          <SetChildTasks setTasks={setTasks} childId={props.user.id} date={selectedDate} />
          {isOpen ? (
            <Calender
              setSelectedDate={setSelectedDate}
              setIsOpen={setIsOpen}
              childId={childId}
              setTasks={setTasks}
            />
          ) : (
              <p onClick={() => setIsOpen(true)}>Select Date</p>
            )}
        </div>
        :
        <div>
          <div className="dropdown_holder" onKeyPress={() => setIsOpen(false)}>
            {isOpen ? (
              <Calender
                setSelectedDate={setSelectedDate}
                setIsOpen={setIsOpen}
                childId={childId}
                setTasks={setTasks}
              />
            ) : (
                <p onClick={() => setIsOpen(true)}>Select Date</p>
              )}
            <ChildDropdown
              isChild={isChild}
              userId={props.user ? props.user.id : ""}
              title={title}
              setTitle={setTitle}
              setChildId={setChildId}
              setTasks={setTasks}
              selectedDate={selectedDate}
            />
          </div>
          <TaskPopup
            taskName={taskName}
            setTaskName={setTaskName}
            taskDescription={taskDescription}
            setDescription={setDescription}
            pointsGained={pointsGained}
            setPoints={setPoints}
            addTask={addTask}
          />
        </div>
      }


      {/* <div className='tasks_holder'>
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

              <Calender />

              <div>
                <button onClick={addTask}>Add Task</button>
              </div>

            </div>
            : null
          }
        </div>
      </div> */}
      {!tasks
        ? null
        : tasks.map((task, i) => {
          let isTaskComplete = task.completed;

          return (
            <TaskMap key={i} task={task} remove={remove} isTaskComplete={isTaskComplete} switchTask={switchTask} isChild={isChild} />
          );
        })}
      {props.loggedIn ? null : <Redirect to={"/login"} />}
    </div>
  );
}

const mapDispatchToProps = {
  getAllTasks,
  addTask,
  removeTask,
  getChildTasks,
};

function mapStateToProps(state) {
  return {
    user: state.userReducer.user.data,
    tasks: state.taskReducer.tasks.data,
    loggedIn: state.userReducer.loggedIn,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);

// FOR DAYDROPDOWN COMPONENT
{
  /* <DayDropdown setTitle={setTitle} title={title} /> */
}
// const [title, setTitle] = useState('');
