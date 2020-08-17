import React, { useState } from 'react';
import './Register.css';
import { connect } from 'react-redux';
import { Link , Redirect} from 'react-router-dom';
import { registerUser } from '../../redux/actionCreators';

function Register(props) {

  const [username, setUsername] = useState('');
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [parentAccount, setParentAccount] = useState(false);
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');

  const reg = () => {
    // console.log(parentAccount)
    props.registerUser(username, fName, lName, email, password, parentAccount);
  };

  const checkInfo = () => {

    if (username.length < 6) {
      setUsernameErr('Username is to short')
    }

    if (!email.includes('@')) {
      setEmailErr('Invalid Email')
    }

    if (password.length < 8) {
      setPasswordErr('Password is to short')
    }

    else if (username.length > 5 && email.includes('@') && password.length > 7) {
      reg()
    }
  };

  return (
    <div className='register_holder'>
      <div className='register_header_holder'>
        <b className='register_header' >Welcome</b>
        <b className='register_header'> To TheTaskApp</b>
      </div>
      <div className='register_form'>
        <div className='register_inputs_holder'>
          <div className='register_inputs'>
            <label><b>Username:</b></label>
            <input
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                setUsernameErr('')
              }}
            />
          </div>
          <p>{usernameErr}</p>
        </div>

        <div className='register_inputs_holder'>
          <div className='register_inputs'>
            <label><b>First Name:</b></label>
            <input
              className='name_input'
              value={fName}
              onChange={(e) => setFName(e.target.value)}
            />
          </div>
        </div>

        <div className='register_inputs_holder'>
          <div className='register_inputs'>
            <label><b>Last Name:</b></label>
            <input
              className='name_input'
              value={lName}
              onChange={(e) => setLName(e.target.value)}
            />
          </div>
        </div>

        <div className='register_inputs_holder'>
          <div className='register_inputs'>
            <label><b>Email:</b></label>
            <input
              className='email_input'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setEmailErr('')
              }}
            />
          </div>
          <p>{emailErr}</p>
        </div>

        <div className='register_inputs_holder'>
          <div className='register_inputs'>
            <label><b>Password:</b></label>
            <input
              type='password'
              value={password}
              onChange={(e) => {
                setPasswordErr('')
                setPassword(e.target.value)
              }}
            />
          </div>
          <p>{passwordErr}</p>
        </div>

        <div className='register_inputs'>
          <label><b>Parental Account?</b></label>
          <input
            className='checkbox_input'
            type='checkbox'
            checked={parentAccount}
            onChange={(e) => setParentAccount(!parentAccount)}
          />
        </div>

        <div className='register_button_holder'>
          <button className='register_button' onClick={() => checkInfo()}>Register!</button>
          <h5>Already checking off tasks? <Link className='register_link' to='/login'>LOGIN HERE</Link></h5>

        </div>
      </div>
      {props.userReducer.loggedIn ? <Redirect to={'/'}/> : null}
    </div>
  )
};

const mapDispatchToProps = {
  registerUser
}
const mapStateToProps = reduxState => reduxState; //change this later, shouldn't have all props

export default connect(mapStateToProps, mapDispatchToProps)(Register);