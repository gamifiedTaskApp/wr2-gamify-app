import React, {useState} from 'react';
import ChildDropdown from './ChildDropdown'
import './rewards.css';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
function Rewards(props) {

  const isChild = props.user ? props.user.isChild ? true : false : "";

  return (
  <div>
    <ChildDropdown isChild={isChild} userId={props.user.id}/>
    
    {props.loggedIn ? null : <Redirect to={'/login'}/> }
  </div>)
}

function mapStateToProps(state) {
  return {
    loggedIn: state.userReducer.loggedIn,
    user: state.userReducer.user.data,
    tasks: state.taskReducer.tasks.data,
    loggedIn: state.userReducer.loggedIn
  };
};

export default connect(mapStateToProps)(Rewards);