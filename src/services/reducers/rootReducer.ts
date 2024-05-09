import { combineReducers } from "redux";
import { trainsReducer } from "./trainsReducer";

export const rootReducer = combineReducers({
  trainsReducer,
});
