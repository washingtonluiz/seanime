import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { Reducers } from "../reducers";

const composeEnhancers = composeWithDevTools || compose;
export const Store = createStore(
  Reducers,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);