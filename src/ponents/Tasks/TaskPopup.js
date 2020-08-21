import React, {useState} from "react";
import Calender from '../Calender/Calender';
// import onClickOutside from 'react-onclickoutside';
import Popup from "reactjs-popup";
 
function TaskPopup(props){

    // const [taskName, setTaskName] = useState('');
    // const [description, setDescription] = useState('');
    // const [points, setPoints] = useState(0);

    // function addTask() {
    //     props.addTask(taskName, points, description, props.user.parent, props.user.id, selectedDate);
    //   };

    // TasksPopup.handleClickOutside = () => setOpen(false);
    console.log(props)
    return (
    <Popup trigger={<button> New Task</button>} modal closeOnDocumentClick>
        {close => (
            <div>
                <div>
                    <label>Enter Task:</label>
                    <input value={props.taskName} onChange={(e) => props.setTaskName(e.target.value)} />
                </div>
                <div>
                    <label>Task Description:</label>
                    <input value={props.description} onChange={(e) => props.setDescription(e.target.value)} />
                </div>
                <div>
                    <label>Points Gained:</label>
                    <input type='number' value={props.points} onChange={(e) => props.setPoints(e.target.value)} />
                </div>
                <button onClick={() => {
                    props.addTask()
                    close()
                    }}>Add Task</button>
                <button onClick={() => {close()}}>Cancel</button>
            </div>
        )}    
    </Popup>
    )
}

// const clickOutsideConfig = {
//     handleClickOutside: () => ChildDropdown.handleClickOutside,
//   };

export default 
// onClickOutside(
    TaskPopup
    // , clickOutsideConfig);