import { combineReducers } from "redux";
import lineItems from "./line-item-reducer";
import categories from "./category-reducer";
import apiCallsInProgress from "./api-status-reducer";
import currentUser from "./firebase-reducer";

const rootReducer = combineReducers({
  lineItems,
  categories,
  apiCallsInProgress,
  currentUser
});

export default rootReducer;
