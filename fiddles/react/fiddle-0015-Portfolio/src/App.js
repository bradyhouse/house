import React, { Component } from 'react';
import './App.css';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Content from './components/content/content';

class App extends Component {
  render() {

    return (
      <div className="App">
        <Header/>
        <Content/>
        <Footer/>
      </div>
    );
  }
}

export default App;
