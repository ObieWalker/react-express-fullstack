import * as types from '../actions/actionTypes';
import initialState from './initialState'

export default function groceriesReducer(state = initialState.groceries, action) {
  switch (action.type) {
    case types.GET_GROCERIES_SUCCESS:
      return action.groceries;

    case types.ADD_GROCERY_SUCCESS:
      return [
        ...state, Object.assign({}, action.grocery)
      ]

    case types.DELETE_GROCERY_SUCCESS:
      return [
        ...state.filter(grocery => grocery.id !== action.groceryId)
      ];

    case types.BUY_GROCERY_SUCCESS:
      let newState = Object.assign({}, state);
      let itemIndex = newState.groceries.findIndex(grocery => grocery.id === action.groceryId);
      let purchasedGrocery = newState.groceries[itemIndex];
      purchasedGrocery.purchased = true;
      newState.groceries = [
        ...newState.groceries.splice(0, itemIndex),
        purchasedGrocery,
        ...newState.groceries.splice(
          itemIndex + 1,
          newState.groceries.length
        )
      ];
      return newState;

    default:
      return state;
  }
}