import React, {useState} from "react";
import Axios from 'axios';

function ChildDisplay(props){

    let [isEditing, setIsEditing] = useState(false)
    let [usernameInput, setUsernameInput] = useState('')

    function deleteChild(){
        Axios.delete(`/auth/delete/child/${props.child.child_id}`)
        .then(res => {
          props.getChildren();
        })
        .catch(err => alert(err))
      }

      function editUsername(){
        const userId = props.child.child_id,
              username = usernameInput;

          Axios.put('/api/child/changeName', {username, userId})
          .then(res => {
              props.getChildren();
              setIsEditing(false);
              setUsernameInput('');
          })
          .catch(err => console.log(err))
      }

    return(
    <div>
        {props.child.child_username}
        {props.child.points}
        <button onClick={deleteChild}>Delete Child</button>
        {isEditing
        ? <div>
            <input
                value={usernameInput}
                placeholder='New Username'
                onChange={(e) => setUsernameInput(e.target.value)}/>
            <button onClick={editUsername}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>   
        </div> 
        :<button onClick={() => setIsEditing(true)}>Edit Username</button>}
    </div>
    )
}

export default ChildDisplay;