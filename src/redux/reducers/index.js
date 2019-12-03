import { combineReducers } from "redux";
import cards from "./card-reducer";
import budgets from "./budget-reducer";
import users from "./user-reducer";
import apiCallsInProgress from "./api-status-reducer";

const rootReducer = combineReducers({
  cards,
  budgets,
  users,
  apiCallsInProgress
});

export default rootReducer;
