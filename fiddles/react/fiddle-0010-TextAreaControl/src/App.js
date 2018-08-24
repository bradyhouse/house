import React, { Component } from 'react';
import './App.css';
import './essay-form/EssayForm';
import EssayForm from "./essay-form/EssayForm";

class App extends Component {
  render() {
    return (
      <div className="App">
        <EssayForm/>
      </div>
    );
  }
}

export default App;
