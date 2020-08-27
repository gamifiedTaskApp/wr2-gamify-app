import React, { useState } from "react";
import ChildDropdown from "./ChildDropdown";
import MappedRewards from "./MappedRewards";
import "./rewards.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
function Rewards(props) {
  const isChild = props.user ? (props.user.isChild ? true : false) : "";
  const [child, setChild] = useState({});
  const [rewards, setRewards] = useState([]);
  const [childId, setchildId] = useState(null);
  const [count, setCount] = useState(0);
  const childName = child ? child.child_username : "";
  let mappedRewards = "";


  if (rewards[0]) {
    mappedRewards = rewards.map((reward) => {
      return <MappedRewards reward={reward} setCount={setCount} count={count} key={reward} />;
    });
  }

  return (
    <div className='reward-page'>
      <ChildDropdown
        isChild={isChild}
        userId={props.user ? props.user.id : ""}
        setChild={setChild}
        setRewards={setRewards}
        childName={childName}
        setChildId={setchildId}
        count={count}
      />
      <div className='rewards-page-holder'>
        {mappedRewards}
      </div>

      {props.loggedIn ? null : <Redirect to={"/login"} />}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    loggedIn: state.userReducer.loggedIn,
    user: state.userReducer.user.data,
    tasks: state.taskReducer.tasks.data
  };
}

export default connect(mapStateToProps)(Rewards);
