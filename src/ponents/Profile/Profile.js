import React, { useState, useEffect } from 'react';
import { connect } from "react-redux"
import './profile.css';
import {Redirect} from "react-router-dom";
import Parent from "../Parent/Parent"
import Axios from 'axios';
import ChildDisplay from "./ChildDisplay"
import { logoutUser } from '../../redux/actionCreators';
function Profile(props) {
  let [isEditing, setIsEditing] = useState(false);
  let [username, setUsername] = useState("");
  let [children, setChildren] = useState("");
  const user = props.userReducer.user;
  const userId = user.data ? props.userReducer.user.data.id : "";
  const isParent = user.data ? user.data.parental : "";
  const isChild = user.data ? user.data.isChild ? true : false : "";
  const userPicture = user.data ? user.data.picture : "";
  let xpbar = user.data ? user.data.isChild ? (user.data.experience % 100) + '%' : "" : "";
  
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
        <ChildDisplay getChildren={getChildren} child={child} />
      )
    })
  }
  
  return (<div>
    {isChild ? 
    <div>
      <span>{user.data.username}</span> 
      <img className='profile-picture' src={userPicture}/>
      <p>level {Math.ceil(user.data.experience/100)}</p> 
      <div className="unfilled-bar" >
            <div class="experience-bar" style={{width: xpbar}}></div>
        </div>
    </div>
    : 
    <div>
      <img className='profile-picture' src={userPicture}/>
      <p>{user.data ? user.data.username : ""}</p>
      {isEditing
      ? <div> 
        <input placeholder="New Username" onChange={(e) => setUsername(e.target.value)} />
        <button onClick={() => changeUsername()} >Submit</button>
        <button onClick={() => setIsEditing(false)}>Cancel</button>
      </div>
      :<button onClick={() => setIsEditing(true)}>Edit Username</button>}
      <button onClick={logOut}>Log Out</button>
      {mappedChildren}
    </div>
    }
    
    <div className='add-child'>  
      {isParent ? <Parent getChildren={getChildren} /> : ""}
    </div>
    { isChild ? "" : <button onClick={deleteUser}>Delete Account</button>}
    

    {props.userReducer.loggedIn ? null : <Redirect to={'/login'}/> }
    
  </div>)
}
const mapStateToProps = reduxState => reduxState;

const mapDispatchToProps = {
  logoutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);