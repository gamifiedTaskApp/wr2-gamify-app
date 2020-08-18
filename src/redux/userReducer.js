import { SET_USER, LOGIN_USER, LOGOUT_USER } from "./constraints";

const initialState = {
  user: {},
  loggedIn: false,
};

export default function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_USER + '_PENDING':
      return state;
    case SET_USER + '_FULFILLED':
      return { ...state, user: payload, loggedIn: true };
    case SET_USER + '_REJECTED':
      return state;
    case LOGIN_USER + '_PENDING':
      return state;
    case LOGIN_USER + '_FULFILLED':
      return { ...state, user: payload, loggedIn: true };
    case LOGIN_USER + '_REJECTED':
      return state;
    case LOGOUT_USER: 
      return {...state, user: {}, loggedIn: false}
    default:
      return state;
  };
};