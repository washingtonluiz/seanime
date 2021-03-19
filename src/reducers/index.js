import { combineReducers } from "redux";
import { reducer as toastrReducer } from "react-redux-toastr";
import { animes } from "./animesReducer";
export const Reducers = combineReducers({
  toastr: toastrReducer,
  anime: animes,
});
