import React, { Component } from 'react';
import './App.css';
import './clock/Clock';
import Clock from "./clock/Clock";


class App extends Component {
  render() {
    return (
      <div>
        <Clock/>
        <Clock/>
        <Clock/>
      </div>
    );
  }
}

export default App;
