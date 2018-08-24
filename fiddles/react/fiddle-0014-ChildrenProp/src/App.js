import React, { Component } from 'react';
import './App.css';
import SignupDialog from './signup-dialog/SignupDialog';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SignupDialog/>
      </div>
    );
  }
}

export default App;
