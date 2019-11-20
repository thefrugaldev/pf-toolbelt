import * as actionTypes from "./action-type-constants";

export function createCard(card) {
  return { type: actionTypes.CREATE_CARD, card };
}
