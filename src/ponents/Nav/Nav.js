import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import onClickOutside from "react-onclickoutside";
import { connect } from 'react-redux';
import "./Nav.css";

function Nav(props) {
  const [show, setShow] = useState(true);

  function toggle() {
    show ? setShow(false) : setShow(true)
  }

  Nav.myClickOutsideHandler = () => setShow(true);

  return ( //change this so that it fires for components its on and doesnt for ones its not
    <div>
      {props.location.pathname !== "/login" &&
        props.location.pathname !== "/register" && props.loggedIn ? (
          <nav>
            <div className="nav">
              <h1>Choreio</h1>
              <button onClick={toggle} className="burger"><div></div><div></div><div></div></button>
              <Link onClick={toggle} className="links" to="/tasks">
                Tasks
            </Link>
              <Link onClick={toggle} className="links" to="/store">
                Store
            </Link>
              <Link onClick={toggle} className="links" to="/rewards">
                Rewards
            </Link>
              <Link onClick={toggle} className="links" to="/profile">
                Profile
            </Link>
              <div className={show ? "navbar" : "show"}>
                <Link onClick={toggle} className="link" to="/tasks">
                  Tasks
            </Link>
                <Link onClick={toggle} className="link" to="/store">
                  Store
            </Link>
                <Link onClick={toggle} className="link" to="/rewards">
                  Rewards
            </Link>
                <Link onClick={toggle} className="link" to="/profile">
                  Profile
            </Link>
              </div>
            </div>
          </nav>
        ) : null}
    </div>
  );
};

const clickOutsideConfig = {
  handleClickOutside: () => Nav.myClickOutsideHandler
};

function mapStateToProps(state) {
  return {
    loggedIn: state.userReducer.loggedIn
  }
}

export default connect(mapStateToProps)(withRouter(onClickOutside(Nav, clickOutsideConfig)));
