import { combineReducers } from "redux";
import cards from "./card-reducer";
import budgets from "./budget-reducer";
import users from "./user-reducer";

const rootReducer = combineReducers({
  cards,
  budgets,
  users
});

export default rootReducer;
