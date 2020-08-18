import React, { useState } from 'react';
import { connect } from "react-redux"
import './profile.css';
import {Redirect} from "react-router-dom";
import Axios from 'axios';
function Profile(props) {
  let [username, setUsername] = useState("");
  console.log(props);
  const user = props.userReducer.user;
  const userId = user.data ? props.userReducer.user.data.id : "";
  const isChild = user.data ? user.data.isChild ? true : false : "";
  console.log(isChild);
  function changeUsername() {
    if (username.length < 6) {
      alert("Username must be longer")
    }
    else {
      Axios.put('/api/parent/changeName', { username, userId })
        .then(res => {
          //change props to reflect new username
        })
        .catch(err => alert(err))
    }
  }

  return (<div>
    <div><span>Enter New Username</span></div>
    <input placeholder="New Username" onChange={(e) => setUsername(e.target.value)} />
    <button onClick={() => changeUsername()} >Submit</button>
    {}
    {userId}
    {isChild}
    {props.userReducer.loggedIn ? null : <Redirect to={'/login'}/> }
  </div>)
}
const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Profile);