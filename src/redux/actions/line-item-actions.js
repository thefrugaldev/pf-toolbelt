import * as actionTypes from "./action-type-constants";
import * as lineItemApi from "../../api/line-item-api";
import { beginApiCall, apiCallError } from "./api-status-actions";

export function loadLineItemsSuccess(lineItems) {
  return { type: actionTypes.LOAD_LINE_ITEMS_SUCCESS, lineItems };
}

export function createLineItemSuccess(lineItem) {
  return { type: actionTypes.CREATE_LINE_ITEM_SUCCESS, lineItem };
}

export function updateLineItemSuccess(lineItem) {
  return { type: actionTypes.UPDATE_LINE_ITEM_SUCCESS, lineItem };
}

export function deleteLineItemOptimistic(lineItem) {
  return { type: actionTypes.DELETE_LINE_ITEM_OPTIMISTIC, lineItem };
}

export function loadLineItems(filters) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return lineItemApi
      .getLineItems(filters)
      .then(lineItems => {
        dispatch(loadLineItemsSuccess(lineItems));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveLineItem(lineItem) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return lineItemApi
      .saveLineItem(lineItem)
      .then(savedLineItem => {
        lineItem._id
          ? dispatch(updateLineItemSuccess(savedLineItem))
          : dispatch(createLineItemSuccess(savedLineItem));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteLineItem(lineItem) {
  return function(dispatch) {
    dispatch(deleteLineItemOptimistic(lineItem));
    return lineItemApi.deleteLineItem(lineItem._id);
  };
}
