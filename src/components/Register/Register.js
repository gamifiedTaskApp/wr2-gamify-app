import React, { useState } from 'react';
import './Register.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser } from '../../redux/actionCreators';

function Register(props) {

  const [username, setUsername] = useState('');
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [parentAccount, setParentAccount] = useState(false);

  const reg = () => {
    console.log(parentAccount)
    props.registerUser(username, fName, lName, email, password, parentAccount);
  }

  return (
    <div className='register_holder'>
      <h1 className='register_header' >Welcome to TheTaskApp</h1>
      <div className='register_form'>
        <div className='register_inputs'>
          <label>Username:</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className='register_inputs'>
          <label>First Name:</label>
          <input
            value={fName}
            onChange={(e) => setFName(e.target.value)}
          />
        </div>

        <div className='register_inputs'>
          <label>Last Name:</label>
          <input
            value={lName}
            onChange={(e) => setLName(e.target.value)}
          />
        </div>

        <div className='register_inputs'>
          <label>Email:</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='register_inputs'>
          <label>Password:</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className='register_inputs'>
          <label>Parental Account?</label>
          <input
            type='checkbox'
            checked={parentAccount}
            onChange={(e) => setParentAccount(!parentAccount)}
          />
        </div>

        <div className='register_button_holder'>
          <button className='register_button' onClick={() => reg()}>Register!</button>
          <h5>Already checking off tasks? <Link className='register_link' to='/login'>LOGIN HERE</Link></h5>
        </div>
      </div>
    </div>
  )
};

const mapDispatchToProps = {
  registerUser
}

export default connect(null, mapDispatchToProps)(Register);