'use strict'

import React from 'react';
import {Navbar, Nav, NavItem, Col, Image} from 'react-bootstrap/lib';

function GithubMark() {
  return (
    <div>
      <Image id='github-mark' src="/assets/images/github-mark.png" circle />
    </div>
  )
}

function Header(props) {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          Watercolor travel map creator
        </Navbar.Brand>
      </Navbar.Header>
      <Nav pullRight>
        <NavItem href="//github.com/amatelin/watercolor-travel-map">
          <GithubMark />
        </NavItem>
      </Nav>
    </Navbar>
  )
}




export default Header;
