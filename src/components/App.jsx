import React, { Component } from 'react';
import GroceryList from './GroceryList'
import logo from '../logo.svg';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <GroceryList />
      </div>
    );
  }
}

export default App;
