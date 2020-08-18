import React, { useState } from 'react';
import { connect } from "react-redux"
import './profile.css';
import {Redirect} from "react-router-dom";
import Parent from "../Parent/Parent"
import Axios from 'axios';
import { logoutUser } from '../../redux/actionCreators';
function Profile(props) {
  let [username, setUsername] = useState("");
  console.log(props);
  const user = props.userReducer.user;
  const userId = user.data ? props.userReducer.user.data.id : "";
  const isParent = user.data ? user.data.parental : "";
  const isChild = user.data ? user.data.isChild ? true : false : "";
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
  function logOut() {
    props.logoutUser();
  }

  return (<div>
    <div><span>Enter New Username</span></div>
    <input placeholder="New Username" onChange={(e) => setUsername(e.target.value)} />
    <button onClick={() => changeUsername()} >Submit</button>
    <button onClick={logOut}>Log Out</button>
    {isParent ? <Parent /> : ""}
    

    {props.userReducer.loggedIn ? null : <Redirect to={'/login'}/> }
    
  </div>)
}
const mapStateToProps = reduxState => reduxState;

const mapDispatchToProps = {
  logoutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);