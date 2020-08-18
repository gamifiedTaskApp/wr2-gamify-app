import { SET_USER, LOGIN_USER, GET_TASKS, ADD_TASK, REMOVE_TASK } from './constraints';
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

export function getAllTasks(id) {
  const tasks = axios.get(`/api/get/tasks/${id}`);
  return {
    type: GET_TASKS,
    payload: tasks
  };
};

export function addTask(taskName, pointsGained, taskDescription, userId, childId, date) {
  const body = { taskName, pointsGained, taskDescription, userId, childId, date };
  const addTask = axios.post('/api/add/task', body);
  return {
    type: ADD_TASK,
    payload: addTask
  };
};

export function removeTask(id, userId) {
  const removed = axios.delete(`/api/remove/task?id=${id}&userId=${userId}`)
  return {
    type: REMOVE_TASK,
    payload: removed
  };
};