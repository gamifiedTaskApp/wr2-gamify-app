import React from 'react';
import './rewards.css';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
function Rewards(props) {
  return (<div>
    
    
    {props.loggedIn ? null : <Redirect to={'/login'}/> }
  </div>)
}

function mapStateToProps(state) {
  return {
    loggedIn: state.userReducer.loggedIn
  };
};

export default connect(mapStateToProps)(Rewards);