import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./profile.css";
import { Redirect } from "react-router-dom";
import Parent from "../Parent/Parent";
import Axios from "axios";
import ChildDisplay from "./ChildDisplay";
import { logoutUser, updateAccount } from "../../redux/actionCreators";
import Amazon from '../AmazonDropzone/AmazonDropzone';

function Profile(props) {
  const user = props.userReducer.user;
  let [isEditing, setIsEditing] = useState(false);
  let [username, setUsername] = useState('');
  let [children, setChildren] = useState("");
  let [photo, setPhoto] = useState('');
  const userId = user.data ? props.userReducer.user.data.id : "";
  const isParent = user.data ? user.data.parental : "";
  const isChild = user.data ? (user.data.isChild ? true : false) : "";
  const userPicture = user.data ? user.data.picture : "";
  const usersUsername = user.data ? user.data.username : '';
  let xpbar = user.data
    ? user.data.isChild
      ? (user.data.experience % 100) + "%"
      : ""
    : "";

  console.log(user.data)

  useEffect(() => {
    if (user.data) {
      setUsername(user.data.username)
      setPhoto(userPicture)
    }
  }, [user.data]);

  function changeUsername() {
    if (username.length < 6) {
      alert("Username must be longer");
    } else {
      props.updateAccount(username, userId, photo, usersUsername)
    }
  };

  function logOut() {
    props.logoutUser();
  }

  function deleteUser() {
    Axios.delete(`/auth/delete/user/${userId}`)
      .then((res) => {
        logOut();
      })
      .catch((err) => alert(err));
  }

  function getChildren() {
    if (isParent) {
      Axios.get(`/api/children/${userId}`)
        .then((res) => {
          setChildren(res.data);
          console.log(res.data);
        })
        .catch((err) => alert(err));
    }
  }

  useEffect(() => {
    getChildren();
  }, []);

  let mappedChildren = "";
  if (children) {
    mappedChildren = children.map((child) => {
      return <ChildDisplay getChildren={getChildren} child={child} />;
    });
  }

  return (
    <div className="profile">
      <div className="profile-container">
      {isChild ? (
        <div className="childaccount">
          <div>
          <img className="profile-picture" src={userPicture} />
          <span>{user.data.username}</span>
          <p>level {Math.ceil(user.data.experience / 100)}</p>
          <div className="unfilled-bar">
            <div class="experience-bar" style={{ width: xpbar }}></div>
          </div>
          </div>
          <button className="profile-button" onClick={logOut}>Log Out</button>
        </div>
      ) : (
          <div>
            <div className="parent">
              <div className="box">
                <img className="profile-picture" src={userPicture} />
                <p>{user.data ? user.data.username : ""}</p>
              </div>
              <div>
                <div className="box2">
                  {isEditing ? (
                    <div>
                      <div>
                        <Amazon photoFn={setPhoto} />
                      </div>
                      <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <button className="profile-button" onClick={() => {
                        changeUsername()
                        setIsEditing(false)
                      }}>Submit</button>
                      <button className="profile-button" onClick={() => {
                        setIsEditing(false)
                        setUsername(user.data.username)
                      }}>Cancel</button>
                    </div>
                  ) : (
                      <div>
                        <button className="profile-button" onClick={() => setIsEditing(true)}>Edit Profile</button>
                        <button className="profile-button" onClick={logOut}>Log Out</button>
                        {isChild ? "" : <button className="delete" onClick={deleteUser}>Delete Account</button>}
                      </div>
                    )}
                  </div>
                </div></div>
              {mappedChildren}
            </div>
          )}

      <div className="add-child">
        {isParent ? <Parent getChildren={getChildren} /> : ""}
      </div>
      {props.userReducer.loggedIn ? null : <Redirect to={"/login"} />}
    </div></div>
  );
}
const mapStateToProps = (reduxState) => reduxState;

const mapDispatchToProps = {
  logoutUser,
  updateAccount
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
