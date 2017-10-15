import React from 'react';
import logo from './logo1.svg';

const NavbarLogo = () => (
  <a className="navbar-brand">
    <img
      src={logo}
      alt=""
      width="30"
      height="30"
      className="d-inline-block align-top"
    />
    profit tracker
  </a>
);

export { NavbarLogo };
