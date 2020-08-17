import React from 'react';
import { withRouter, Link } from 'react-router-dom';

const Nav = (props) => {

  return (
    <div>
      <div>
        <h1>App Name?</h1>
      </div>
      {props.location.pathname !== '/login' && props.location.pathname !== '/register'
        ? (<nav>
          <ul>
            <Link to='/tasks'>Tasks</Link>
            <Link to='/store'>Store</Link>
            <Link to='/rewards'>Rewards</Link>
            <Link to='/profile'>Profile</Link>
          </ul>
        </nav>)
        : null}
    </div>
  )
}

export default withRouter(Nav);