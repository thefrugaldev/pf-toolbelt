import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";

//TODO: Reduce boilerplate by looking at the following:
//https://redux.js.org/recipes/reducing-boilerplate
//https://redux-starter-kit.js.org/
//https://github.com/rematch/rematch
//https://github.com/jkeam/reduxsauce

export default function configureStore(initialState) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // adds support fore Redux dev tools

  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(reduxImmutableStateInvariant()))
  );
}
