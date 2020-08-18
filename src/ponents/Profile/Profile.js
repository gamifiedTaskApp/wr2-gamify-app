import React, { useState, useEffect } from 'react';
import { connect } from "react-redux"
import './profile.css';
import {Redirect} from "react-router-dom";
import Parent from "../Parent/Parent"
import Axios from 'axios';
import ChildDisplay from "./ChildDisplay"
import { logoutUser } from '../../redux/actionCreators';
function Profile(props) {
  let [username, setUsername] = useState("");
  let [children, setChildren] = useState("");
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
  function deleteUser(){
    Axios.delete(`/auth/delete/user/${userId}`)
    .then(res => {
      logOut();
    })
    .catch(err => alert(err))
  }
  
  function getChildren(){
    if(isParent){
      Axios.get(`/api/children/${userId}`)
      .then(res => {
        setChildren(res.data);
        console.log(res.data)
      })
      .catch(err => alert(err));
    }
  }

  useEffect(() => {
    getChildren();
  }, [])

  let mappedChildren = "";
  if(children){
    mappedChildren = children.map((child) => {
      return(
        <ChildDisplay child={child} />
      )
    })
  }
  
  return (<div>
    <div><span>Enter New Username</span></div>
    <input placeholder="New Username" onChange={(e) => setUsername(e.target.value)} />
    <button onClick={() => changeUsername()} >Submit</button>
    <button onClick={logOut}>Log Out</button>
    {mappedChildren}
    { isChild ? "" : <button onClick={deleteUser}>Delete Account</button>}
    {isParent ? <Parent /> : ""}
    

    {props.userReducer.loggedIn ? null : <Redirect to={'/login'}/> }
    
  </div>)
}
const mapStateToProps = reduxState => reduxState;

const mapDispatchToProps = {
  logoutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);