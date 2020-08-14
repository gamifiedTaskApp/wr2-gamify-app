import { SET_USER, LOGIN_USER } from "./constraints";

const initialState = {
  user: {}
};

export default function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_USER + '_PENDING':
      return state;
    case SET_USER + '_FULFILLED':
      return { ...state, user: payload };
    case SET_USER + '_REJECTED':
      return state;
    case LOGIN_USER + '_PENDING':
      return state;
    case LOGIN_USER + '_FULFILLED':
      return { ...state, user: payload };
    case LOGIN_USER + '_REJECTED':
      return state;
    default:
      return state;
  };
};