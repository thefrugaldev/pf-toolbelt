import { combineReducers } from "redux";
import cards from "./card-reducer";

const rootReducer = combineReducers({
  cards
});

export default rootReducer;
