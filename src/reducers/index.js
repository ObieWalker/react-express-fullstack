import { combineReducers } from 'redux'
import groceries from './groceriesReducer'

const rootReducer = combineReducers({
  groceries
});

export default rootReducer;