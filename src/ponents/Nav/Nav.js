import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import './Nav.css';

const Nav = (props) => {

  return (
    <div>
      {props.location.pathname !== '/login' && props.location.pathname !== '/register'
        ? (<nav>
          <div className="nav">
            <Link className="link" to='/tasks'>Tasks</Link>
            <Link className="link" to='/store'>Store</Link>
            <Link className="link" to='/rewards'>Rewards</Link>
            <Link className="link" to='/profile'>Profile</Link>
          </div>
        </nav>)
        : null}
    </div>
  )
}

export default withRouter(Nav);