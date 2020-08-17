import React, { useState } from 'react';
import './Login.css';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { loginUser } from '../../redux/actionCreators';

function Login(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  function login() {
    props.loginUser(username, password);
  };

  const checkInfo = () => {
    if (username.length < 6) {
      setUsernameErr('Username must be more then 5 characters long ')
    }

    if (password.length < 8) {
      setPasswordErr('Password must be more then 7 characters long')
    }

    if (password.length < 8 && username.length > 5) {
      setPasswordErr('Password must be more then 7 characters long')
      setUsernameErr('')
    }

    if (password.length > 7 && username.length < 6) {
      setUsernameErr('Username must be more then 5 characters long ')
      setPasswordErr('')
    }

    else if (password.length > 7 && username.length > 5) {
      login()
      setUsername('')
      setUsernameErr('')
      setPassword('')
      setPasswordErr('')
    };
  };

  return (
    <div className='login_holder'>
      <div className='login_header_holder'>
        <b className='login_header' >Welcome Back</b>
        <b className='login_header'> To TheTaskApp</b>
      </div>

      <div className='login_form'>
        <div className='login_inputs_holder'>
          <div className='login_inputs'>
            <label><b>Username:</b></label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <p>{usernameErr}</p>
        </div>

        <div className='login_inputs_holder'>
          <div className='login_inputs'>
            <label><b>Password:</b></label>
            <input
              className='login_password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p>{passwordErr}</p>
        </div>

        <div className='login_button_holder'>
          <button className='login_button' onClick={() => checkInfo()}>Login</button>
          <h5>Need to track those tasks? <Link className='login_link' to='/register'>REGISTER HERE</Link></h5>
        </div>
      </div>
      {props.userReducer.loggedIn ? <Redirect to={'/'} /> : null}
    </div>
  )
};

const mapDispatchToProps = {
  loginUser
}
const mapStateToProps = reduxState => reduxState; //change this later, shouldn't have all props

export default connect(mapStateToProps, mapDispatchToProps)(Login);