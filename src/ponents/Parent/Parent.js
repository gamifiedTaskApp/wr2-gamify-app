import React, { useState } from "react";
import Axios from "axios";
import "./parent.css";
import onClickOutside from "react-onclickoutside";
import { connect } from "react-redux";
function Parent(props) {
  const parentId = props.userReducer.user.data
    ? props.userReducer.user.data.id
    : "";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [view, setView] = useState(false);
  const [goodName, setGoodName] = useState(true);
  const [goodPassword, setGoodPassword] = useState(true);
  const [nameTaken, setNameTaken] = useState(false);
  function Switch() {
    if (view === false) {
      setView(true);
      console.log(view);
    } else {
      setView(false);
    }
  }
  function createChild() {
    console.log("creating");
    if (username.length > 5 && password.length > 7) {
      Axios.post("/auth/register/child", { username, password, parentId, name })
        .then((res) => {
          Switch();
          setUsername("");
          setPassword("");
          setName("");
          setGoodPassword(true);
          setGoodName(true);
          props.getChildren();
        })
        .catch((err) => {
          setNameTaken(true);
        });
    } else if (username.length < 6 && password.length < 8) {
      setGoodName(false);
      setGoodPassword(false);
    } else if (username.length < 6) {
      setGoodName(false);
    } else {
      setGoodPassword(false);
    }
  }

  Parent.handleClickOutside = () => setView(false);
  return view === false ? (
    <div>
      <div className="cont">
        <div className="child_container-closed">
          <span>Add Child Account</span>
          <button onClick={Switch}>+</button>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <div className="cont">
        <div className="child_container-open">
          <span className="input">
            Name<br></br>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </span>
          <span className="input">
            Username<br></br>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </span>
          {nameTaken ? <span>Username is taken</span> : ""}
          {goodName ? (
            ""
          ) : (
            <span>Username must contain at least 6 characters</span>
          )}
          <span className="input">
            Password<br></br>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </span>
          {goodPassword ? null : (
            <span>Password must contain at least 8 characters</span>
          )}
          <span className="holder">
          <button className="button" onClick={createChild}>
            Submit
          </button>
          <button className="button" onClick={Switch}>
            Cancel
          </button>
          </span>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (reduxState) => reduxState;

const clickOutsideConfig = {
  handleClickOutside: () => Parent.handleClickOutside,
};

export default connect(mapStateToProps)(
  onClickOutside(Parent, clickOutsideConfig)
);
