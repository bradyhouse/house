import React, { Component } from 'react';
import './App.css';
import ReservationForm from './reservation-form/ReservationForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ReservationForm/>
      </div>
    );
  }
}

export default App;
