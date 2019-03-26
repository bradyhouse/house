import React, { Component } from 'react';

import './header.css';

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand navbar-dark bg-danger navbar-top">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav my-2 my-lg-0">
            <li className="nav-item">
              <h1>Alexis Grisham</h1>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;