import { combineReducers } from "redux";
import budgets from "./budget-reducer";
import categories from "./category-reducer";
import apiCallsInProgress from "./api-status-reducer";
import currentUser from "./firebase-reducer";

const rootReducer = combineReducers({
  budgets,
  categories,
  apiCallsInProgress,
  currentUser
});

export default rootReducer;
