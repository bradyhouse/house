import React, { Component } from 'react';
import './App.css';
import Blog from './blog/Blog';

class App extends Component {

  render() {
    const posts = [
      {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
      {id: 2, title: 'Installation', content: 'You can install React from npm.'}
    ];

    return (
      <div className="App">
        <Blog posts={posts} />
      </div>
    );
  }
}

export default App;
