import React, { useState } from 'react';
import './Login.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from '../../redux/actionCreators';

function Login(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function login() {
    props.loginUser(username, password);
  };

  return (
    <div className='login_holder'>
      <h1 className='login_header'>Welcome back to TheTaskApp</h1>
      <div className='login_form'>
        <div className='login_inputs'>
          <label>Username:</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className='login_inputs'>
          <label>Password:</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className='login_button_holder'>
          <button className='login_button' onClick={() => login()}>Login</button>
          <h5>Need to track those tasks? <Link className='login_link' to='/login'>REGISTER HERE</Link></h5>
        </div>
      </div>
    </div>
  )
};

const mapDispatchToProps = {
  loginUser
}

export default connect(null, mapDispatchToProps)(Login);