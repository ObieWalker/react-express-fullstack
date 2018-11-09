import * as types from '../actions/actionTypes';
import initialState from './initialState'

let newState, itemIndex, purchasedGrocery = { purchased: false};

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
        ...state.filter(grocery => grocery._id !== action.groceryId)
      ];

    case types.BUY_GROCERY_SUCCESS:
      newState =  state;      
      itemIndex = newState.findIndex(grocery => grocery._id === action.groceryId);
      purchasedGrocery = newState[itemIndex];
      if (!purchasedGrocery.purchased){
        purchasedGrocery.purchased = true;
      } else {
        purchasedGrocery.purchased = false;
      }
      newState = [
        ...newState.slice(0, itemIndex),
        purchasedGrocery,
        ...newState.slice(itemIndex + 1)
      ]
      return newState;

    case types.EDIT_GROCERY_SUCCESS:
      newState =  [...state];
      itemIndex = newState.findIndex(grocery => grocery._id === action.groceryId);
      purchasedGrocery = action.grocery;
      newState = [
        ...newState.slice(0, itemIndex),
        purchasedGrocery,
        ...newState.slice(itemIndex + 1)
      ]
      return newState;

    case types.CLEAR_CART_SUCCESS:
      newState =  [...state];
      console.log("clearState", newState)
      newState.map(grocery => {
        console.log("grocery", grocery)
        grocery.purchased = false
      })
      console.log("clearState", newState)
      return newState

    default:
      return state;
  }
}