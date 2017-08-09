import React, { Component } from 'react';
import SearchBox from '../search-box/SearchBox';

import './Header.css';

class Header extends Component {
  render() {
    return (
      <header>
        <div className="header-container">
          <a className="logo" href="/">
            <span>Mercado Libre</span>
          </a>
          <SearchBox />
        </div>
      </header>
    )
  }
}

export default Header;