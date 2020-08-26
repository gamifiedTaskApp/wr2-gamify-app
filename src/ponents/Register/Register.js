import React, { useState } from "react";
import "./Register.css";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { registerUser } from "../../redux/actionCreators";

function Register(props) {
  const [username, setUsername] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [parentAccount, setParentAccount] = useState(true);
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");

  const reg = () => {
    // console.log(parentAccount)
    props.registerUser(username, fName, lName, email, password, parentAccount);
  };

  const checkInfo = () => {
    if (username.length < 6) {
      setUsernameErr("Username is to short");
    }

    if (!email.includes("@")) {
      setEmailErr("Invalid Email");
    }

    if (password.length < 8) {
      setPasswordErr("Password is to short");
    } else if (
      username.length > 5 &&
      email.includes("@") &&
      password.length > 7
    ) {
      reg();
    }
  };

  return (
    <div className="register_holder">


            
      
      <div className="register_header_holder">
        <div className="header-text" >
          <b className="register_header">Welcome</b>
          <b className="register_header"> To TheTaskApp</b>
        </div>
        <Link className="register_link" to="/login">
              LOG IN HERE
            </Link>
      </div>
      <div className="register_form">
        <h1 className="header" >Register your account</h1>
        <div className="register_inputs_holder">
          <div className="register_inputs">
            
            <input
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setUsernameErr("");
              }}
            />
          </div>
          <p className="err" >{usernameErr}</p>
        </div>

        <div className="register_inputs_holder">
          <div className="register_inputs">
            
            <input
              placeholder="First Name"
              className="name_input"
              value={fName}
              onChange={(e) => setFName(e.target.value)}
            />
          </div>
        </div>

        <div className="register_inputs_holder">
          <div className="register_inputs">
            
            <input
              placeholder="Last Name"
              className="name_input"
              value={lName}
              onChange={(e) => setLName(e.target.value)}
            />
          </div>
        </div>

        <div className="register_inputs_holder">
          <div className="register_inputs">
            
            <input
              placeholder="Email"
              className="email_input"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailErr("");
              }}
            />
          </div>
          <p className="err" >{emailErr}</p>
        </div>

        <div className="register_inputs_holder">
          <div className="register_inputs">
            
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPasswordErr("");
                setPassword(e.target.value);
              }}
            />
          </div>
          <p className="err" >{passwordErr}</p>
        </div>

        <div className="register_button_holder">
          <button className="register_button" onClick={() => checkInfo()}>
            Register!
          </button>
          
        </div>
      </div>
      {props.userReducer.loggedIn ? <Redirect to={"/tasks"} /> : null}
    </div>
  );
}

const mapDispatchToProps = {
  registerUser,
};
const mapStateToProps = (reduxState) => reduxState; //change this later, shouldn't have all props

export default connect(mapStateToProps, mapDispatchToProps)(Register);
