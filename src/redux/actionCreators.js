import { SET_USER, LOGIN_USER, GET_TASKS } from './constraints';
import axios from 'axios';

//USER FUNCTIONS

export function registerUser(username, fName, lName, email, password, parentAccount) {
  const body = { username, fName, lName, email, password, parentAccount };
  const registered = axios.post('/auth/register', body);
  return {
    type: SET_USER,
    payload: registered
  };
};

export function loginUser(username, password) {
  const body = { username, password };
  const loggedIn = axios.post('/auth/login', body);
  return {
    type: LOGIN_USER,
    payload: loggedIn
  };
};

//TASKS FUNCTIONS

export function getAllTasks(userId) {
  const tasks = axios.get('/api/get/tasks');
  return {
    type: GET_TASKS,
    payload: tasks
  };
};