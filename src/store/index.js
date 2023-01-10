import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import auth from "./auth";
import hoodies from "./hoodies";

const reducer = combineReducers({
  auth,
  hoodies,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from "./auth";
