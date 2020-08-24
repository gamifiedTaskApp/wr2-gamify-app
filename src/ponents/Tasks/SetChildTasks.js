import React, {useEffect} from "react";
import axios from "axios";
function SetChildTasks(props){
    useEffect(() =>{
        const childId = props.childId;
        const date = props.date

        axios
        .post(`/api/child/tasks`, { childId, date })
        .then((res) => {
          console.log(res.data); 
          props.setTasks(res.data);
        })
        .catch((err) => console.log(err));
    }, [props.date])
    return(
        <div>
            
        </div>
    )
}

export default SetChildTasks