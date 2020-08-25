import {
  GET_TASKS,
  ADD_TASK,
  REMOVE_TASK,
  GET_CHILD_TASKS,
} from "./constraints";

const initialState = {
  tasks: [],
};

export default function taskReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_TASKS + "_PENDING":
      return state;
    case GET_TASKS + "_FULFILLED":
      return { ...state, tasks: payload };
    case GET_TASKS + "_REJECTED":
      return state;
    case ADD_TASK + "_PENDING":
      return state;
    case ADD_TASK + "_FULFILLED":
      return { ...state, tasks: payload };
    case ADD_TASK + "_REJECTED":
      return state;
    case REMOVE_TASK + "_PENDING":
      return state;
    case REMOVE_TASK + "_FULFILLED":
      console.log(payload);
      return { ...state, tasks: payload };
    case REMOVE_TASK + "_REJECTED":
      return state;
    case GET_CHILD_TASKS + "_PENDING":
      return state;
    case GET_CHILD_TASKS + "_FULFILLED":
      return { ...state, tasks: payload };
    case GET_CHILD_TASKS + "_REJECTED":
      return state;
    default:
      return state;
  }
}
