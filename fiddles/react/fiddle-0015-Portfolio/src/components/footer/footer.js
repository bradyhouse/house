import React, { Component } from 'react';

import './footer.css';

class Footer extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand navbar-dark fixed-bottom navbar-bottom">
        <div className="collapse navbar-collapse" id="navbarsExample02">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" alt="Email"
                 target="_blank"
                 rel="noopener noreferrer"
                 href="mailto:mbedlington@gmail.com">
                Email
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" alt="Phone"
                 target="_blank"
                 rel="noopener noreferrer"
                 href="tel:3121234567">
                Phone
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link"  alt="Fork me on GitHub"
                 target="_blank"
                 rel="noopener noreferrer"
                 href="https://github.com/bradyhouse/house/tree/master/fiddles/react/fiddle-0015-Portfolio">
                Fork Me On Github
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Footer;