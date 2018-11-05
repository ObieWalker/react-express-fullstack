import * as types from './actionTypes';
// import authorApi from '../api/mockAuthorApi';
import axios from 'axios';
import toastr from 'toastr';


export const getGroceriesSuccess = groceries => {
  return {
    type: types.GET_GROCERIES_SUCCESS,
    groceries
  }
}

export const addGrocerySuccess = (grocery) => {
  return {
    type: types.ADD_GROCERY_SUCCESS,
    grocery
  }
}

export const deleteGrocerySuccess = (groceryId) => {
  return {
    type: types.DELETE_GROCERY_SUCCESS,
    groceryId
  }
}

export const buyGrocerySuccess = (groceryId) => {
  return {
    type: types.BUY_GROCERY_SUCCESS,
    groceryId
  }
}


export const loadGroceries = () => (dispatch) => {
  console.log("loading groceries...")
    return axios({
      method: 'GET',
      url: '/api/v1/items'
    })
    .then(response => {
      console.log("got groceries", response.data)
      dispatch(getGroceriesSuccess(response.data))
    })
    .catch((error) => { throw error; });
}

export const addGrocery = (grocery) => (dispatch) =>  {
  console.log("Adding Grocery....")
    // .then(grocery => {
    //   dispatch(addGrocerySuccess(grocery))
    // })
    // .catch((error) => { throw error; });
    return axios({
      method: 'POST',
      url: '/api/v1/items'
    })
    .then(response => {
      console.log("add groceries return", response.data)
      // toastr.success()
      // dispatch(addGrocerySuccess(grocery))
    })
    .catch((error) => { throw error; });
}

export const deleteGrocery = (groceryId) =>  {
  console.log("Adding Grocery with ID", groceryId)
  return dispatch => {
    // authorApi.deleteAuthor(groceryId)
    // .then(() => {
    //   dispatch(deleteGrocerySuccess(groceryId))
    // })
    // .catch((error) => {
    //   toastr.error(error)
    //   throw error; });
  }
}

export const buyGrocery = (groceryId) =>  {
  console.log("Buying Grocery with ID", groceryId)
  return dispatch => {
    // authorApi.deleteAuthor(groceryId)
    // .then(() => {
    //   dispatch(deleteGrocerySuccess(groceryId))
    // })
    // .catch((error) => {
    //   toastr.error(error)
    //   throw error; });
  }
}