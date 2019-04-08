import React, { Component } from 'react';

import './header.css';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <a aria-current="page" className="title" href="/">Brady House, Technologist</a>
      </header>
    );
  }
}

export default Header;