'use strict'

import React from 'react';
import {Navbar} from 'react-bootstrap/lib';

function Header(props) {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          Watercolor travel map creator
        </Navbar.Brand>
      </Navbar.Header>
    </Navbar>
  )
}




export default Header;
