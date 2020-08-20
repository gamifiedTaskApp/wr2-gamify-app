import React, {useState} from "react";
import Axios from 'axios';
import './profile.css';

function ChildDisplay(props){

    let [isEditing, setIsEditing] = useState(false)
    let [usernameInput, setUsernameInput] = useState('')
    let xpbar = (props.child.experience % 100) + '%';
    const userPicture = props.child.profile_picture

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

      console.log(props)
    return(
    <div>
        <div className='child-card'>
            <section>
                <img className='child-profile-picture' src={userPicture}/>
            </section>
            <section>
                <p>{props.child.child_name}</p>
                <p className='child-points'>
                    <span>Points:</span> 
                    <span>{props.child.points}</span>
                </p>
            </section>
        </div>
        <p>{props.child.child_username}</p>
        <p>   level {Math.ceil(props.child.experience/100)}</p>
        <div className="unfilled-bar" >
            <div class="experience-bar" style={{width: xpbar}}></div>
        </div>
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
        <button onClick={deleteChild}>Delete Child</button>
    </div>
    )
}

export default ChildDisplay;