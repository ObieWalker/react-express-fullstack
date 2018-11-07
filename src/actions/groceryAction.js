import * as types from './actionTypes';
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

export const editGrocerySuccess = (groceryId, grocery) => {
  return {
    type: types.EDIT_GROCERY_SUCCESS,
    groceryId,
    grocery
  }
}

export const loadGroceries = () => (dispatch) => {
    return axios({
      method: 'GET',
      url: '/api/v1/items'
    })
    .then(response => {
      dispatch(getGroceriesSuccess(response.data))
    })
    .catch((error) => { console.log(error) });
}

export const addGrocery = (grocery) => (dispatch) =>  {
    return axios({
      method: 'POST',
      url: '/api/v1/items',
      data: grocery
    })
    .then(response => {
      toastr.success(response.data.message)
      dispatch(addGrocerySuccess(response.data.grocery))
    })
    .catch((error) => { 
      toastr.error(error)
    });
}

export const deleteGrocery = (groceryId) => dispatch =>  {
  return axios({
    method: 'DELETE',
    url: `/api/v1/items/${groceryId}`
  })
  .then(response => {
    toastr.success(response.data.message)
    dispatch(deleteGrocerySuccess(groceryId))
  })
  .catch((error) => { 
    toastr.error(error)
  });
}

export const buyGrocery = (groceryId) => dispatch =>  {
  return axios({
    method: 'PUT',
    url: `/api/v1/items/${groceryId}`
  })
  .then(response => {
    toastr.success(response.data.message)
    dispatch(buyGrocerySuccess(groceryId))
  })
  .catch((error) => { 
    toastr.error(error)
  });
}


export const editGrocery = (groceryId,  grocery) => dispatch =>  {
  return axios({
    method: 'PATCH',
    url: `/api/v1/items/${groceryId}`,
    data: grocery
  })
  .then(response => {
    toastr.success(response.data.message)
    dispatch(editGrocerySuccess(groceryId, response.data.item))
  })
  .catch((error) => { 
    toastr.error(error)
  });
}