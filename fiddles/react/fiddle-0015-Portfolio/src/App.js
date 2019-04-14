import React, { Component } from 'react';
import './App.css';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Acrylics from './components/acrylics/acrylics';

class App extends Component {
  render() {

    return (
      <div className="App">
        <Header/>
        <Acrylics/>
        <Footer/>
      </div>
    );
  }
}

export default App;
