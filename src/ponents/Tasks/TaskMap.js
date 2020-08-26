import React, {useState} from "react";

function TaskMap(props){

    let taskId = props.task.task_id
    const [isTaskComplete, setTaskComplete] = useState(props.isTaskComplete)
    let userId = props.task.user_id
    return(
    <div className="tasksmap">
        <div className="task_display">
            <input className="check" type="checkbox" checked={isTaskComplete} onClick={() => {
                props.switchTask(isTaskComplete, taskId);
                console.log(isTaskComplete)
                setTaskComplete(!isTaskComplete)
                console.log(isTaskComplete)
                }}  />
            <h5>
            
            <b>{`${props.task.task_name}`}</b>
            </h5>
                <p>{props.task.task_description}</p>
            <h5>
            <b> Points: {`${props.task.points_gained}`}</b>
            </h5>
            {props.isChild ? "" :
            <button className="selectdate" onClick={() => props.remove(taskId, userId)}>
                Remove Task
            </button>
            }
        </div>
    </div>
    )
    
}

export default TaskMap