import {
  SET_USER,
  LOGIN_USER,
  GET_TASKS,
  ADD_TASK,
  REMOVE_TASK,
  LOGOUT_USER,
  GET_CHILD_TASKS,
  UPDATE_ACCOUNT,
} from "./constraints";
import axios from "axios";

//USER FUNCTIONS

export function registerUser(res) {
  
  //const body = { username, fName, lName, email, password, parentAccount };
  //const registered = axios.post("/auth/register", body)
  const registered = res;
  console.log(registered)
  console.log("registered")
  return {
    type: SET_USER,
    payload: registered,
  };
};

export function loginUser(res) {
  //const body = { username, password };
  //const loggedIn = axios.post("/auth/login", body);
  const loggedIn = res
  return {
    type: LOGIN_USER,
    payload: loggedIn,
  };
};

export function logoutUser() {
  axios.post("/auth/logout");
  return {
    type: LOGOUT_USER,
  };
};

export function updateAccount(username, userId, photo, usersUsername) {
  const body = { username, userId, photo, usersUsername };
  const updated = axios.put("/api/parent/changeAccount", body);
  return {
    type: UPDATE_ACCOUNT,
    payload: updated
  }
};

//TASKS FUNCTIONS
export function switchComplete(taskId, isTaskComplete) {
  axios.put()
}
export function getAllTasks(id) {
  const tasks = axios.get(`/api/get/tasks/${id}`);
  return {
    type: GET_TASKS,
    payload: tasks,
  };
}
export function getChildTasks(id) {
  const tasks = axios.get(`/api/get/tasks/${id}`);
  return {
    type: GET_CHILD_TASKS,
    payload: tasks,
  };
}

export function addTask(
  taskName,
  pointsGained,
  taskDescription,
  userId,
  childId,
  date
) {
  const body = {
    taskName,
    pointsGained,
    taskDescription,
    userId,
    childId,
    date,
  };
  console.log("adding task");
  console.log(body);
  const addTask = axios.post("/api/add/task", body);
  return {
    type: ADD_TASK,
    payload: addTask,
  };
}

export function removeTask(id, userId) {
  const removed = axios.delete(`/api/remove/task?id=${id}&userId=${userId}`);
  return {
    type: REMOVE_TASK,
    payload: removed,
  };
}