import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store/configureStore';
import { loadGroceries } from './actions/groceryAction';
import './styles/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

const store = configureStore();
store.dispatch(loadGroceries())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider >, 
document.getElementById('root')
);
