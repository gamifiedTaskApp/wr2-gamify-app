import React, {useState} from "react";
import { withRouter, Link } from "react-router-dom";
import "./Nav.css";

const Nav = (props) => {
  const [show, setShow] = useState(true);
  function toggle(){
    show?setShow(false):setShow(true)
  }
  return (
    <div>
      {props.location.pathname !== "/login" &&
      props.location.pathname !== "/register" ? (
        <nav>
          <div className="nav">
            <h1>App Name</h1>
            <button onClick={toggle} className="burger"><div></div><div></div><div></div></button>
            <div className={show?"navbar":"show"}>
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

export default withRouter(Nav);
