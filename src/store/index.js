import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import auth from "./auth";
import hoodies from "./hoodies";
import cart from "./cart";
import orders from "./orders";

const reducer = combineReducers({
  auth,
  hoodies,
  cart,
  orders,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from "./auth";
export * from "./hoodies";
export * from "./cart";
export * from "./orders";
