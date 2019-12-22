import { combineReducers } from "redux";
import cards from "./card-reducer";
import budgets from "./budget-reducer";
import users from "./user-reducer";
import categories from "./category-reducer";
import apiCallsInProgress from "./api-status-reducer";
import currentUser from "./firebase-reducer";

const rootReducer = combineReducers({
  cards,
  budgets,
  users,
  categories,
  apiCallsInProgress,
  currentUser
});

export default rootReducer;
