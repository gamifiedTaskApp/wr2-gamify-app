import { createStore, combineReducers, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import userReducer from "./userReducer";
import taskReducer from "./taskReducer";

const rootReducer = combineReducers({
  userReducer,
  taskReducer
});

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));
