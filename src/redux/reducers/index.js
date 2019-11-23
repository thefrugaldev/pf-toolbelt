import { combineReducers } from "redux";
import cards from "./card-reducer";
import budgets from "./budget-reducer";

const rootReducer = combineReducers({
  cards,
  budgets
});

export default rootReducer;
