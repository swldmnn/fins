import React from 'react';
import logo from '../resources/images/fins_logo.svg';
import FinsLogo from './FinsLogo';

function Header() {
  return (
    <header className="Header">
      <FinsLogo></FinsLogo>
      <span>FINS</span>
    </header>
  );
}

export default Header;
