import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarItem,
  NavbarMenu,
  NavbarStart,
  NavbarEnd,
  Button
} from 'bloomer';

const navbar = props => (
  <Navbar>
    <NavbarBrand>
      <NavbarItem>Welcome, {props.user}</NavbarItem>
      <NavbarItem>
        <span className="fas fa-bell" />
      </NavbarItem>
      <NavbarItem>
        <Button isColor="danger" onClick={props.logoutUser}>
          LOGOUT
        </Button>
      </NavbarItem>
    </NavbarBrand>
  </Navbar>
);

export default navbar;
