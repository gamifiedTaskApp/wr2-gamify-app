import { createStore, combineReducers, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import userReducer from "./userReducer";
import taskReducer from "./taskReducer";
import rewardsReducer from './rewardsReducer';

const rootReducer = combineReducers({
  userReducer,
  taskReducer,
  rewardsReducer
});

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));
