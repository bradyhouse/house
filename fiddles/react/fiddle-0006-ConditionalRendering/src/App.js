import React, { Component } from 'react';
import './App.css';
import LoginControl from './login-control/LoginControl';

class App extends Component {
  render() {
    return (
      <div className="App">
       <LoginControl/>
      </div>
    );
  }
}

export default App;
