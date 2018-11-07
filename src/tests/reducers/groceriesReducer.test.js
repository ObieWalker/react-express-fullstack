/*eslint-disable */
import expect from 'expect';
import groceriesReducer from '../../reducers/groceriesReducer';
import * as types from '../../actions/actionTypes';
import groceries from '../__mocks__/groceriesData';
import addedGroceries from '../__mocks__/addedGroceries'

describe('Get Groceries', () => {
  const initialState = {
    groceries: []
  };
  const state = groceries;

  it('should return the initial state', () => {
    expect(groceriesReducer(undefined, {})).toEqual(initialState.groceries);
  });

  it('should handle GET_GROCERIES_SUCCESS', () => {
    const gettingGroceries = {
      type: types.GET_GROCERIES_SUCCESS,
      groceries
    };
    expect(groceriesReducer({}, gettingGroceries)).toEqual(groceries);
  });

  it('should handle ADD_GROCERY_SUCCESS', () => {
    const grocery = groceries[0]
    const addGrocerySuccess = {
      type: types.ADD_GROCERY_SUCCESS,
      grocery
    };
    expect(groceriesReducer(state, addGrocerySuccess)).toEqual(
      addedGroceries
    );
  });
  it('should handle EDIT_GROCERY_SUCCESS', () => {
    const grocery = groceries[0]
    const editGrocerySuccess = {
      type: types.EDIT_GROCERY_SUCCESS,
      grocery
    };
    expect(groceriesReducer(state, editGrocerySuccess)).toEqual(groceries);
  });

  it('should handle DELETE_GROCERY_SUCCESS', () => {
    const deleteGrocerSuccess = {
      type: types.DELETE_GROCERY_SUCCESS,
      groceries
    };
    expect(groceriesReducer(state, deleteGrocerSuccess)).toEqual(
      []
    );
  });

  it('should handle BUY_GROCERY_SUCCESS', () => {
    // state = groceries
    const boughtGrocery = groceries[0]
    const purchasedGrocery = groceries[0]
    const buyGrocerySuccess = {
      type: types.BUY_GROCERY_SUCCESS,
      grocery : {
        purchased: true
      }
    };
    expect(groceriesReducer(state, buyGrocerySuccess)).toEqual(groceries);
  });
});