export default function cardReducer(state = [], action) {
  //TODO: update state to use id for lookups
  //https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape
  switch (action.type) {
    case "CREATE_CARD":
      return [...state, { ...action.card }];
    default:
      return state;
  }
}
