import React, {useState} from 'react';
import {connect} from "react-redux"
import './profile.css';
import Axios from 'axios';
function Profile(props){
    let [username, setUsername] = useState("");
    const userId = props.userReducer.user.data ? props.userReducer.user.data.id : "";
    function changeUsername(){
        if(username.length < 6){
            alert("Username must be longer")
        }
        else {
            Axios.put('/api/parent/changeName', {username, userId})
            .then(res => {
                //change props to reflect new username
            })
            .catch(err => alert(err))
        }
    }

    return(<div>
        <div><span>Enter New Username</span></div>
        <input placeholder="New Username" onChange={(e) => setUsername(e.target.value)} />
        <button onClick={() => changeUsername()} >Submit</button>
        {userId}
    </div>)
}
const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Profile);