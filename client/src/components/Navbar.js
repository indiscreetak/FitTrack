import React, { Component } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarItem,
  NavbarDivider,
  NavbarDropdown,
  Button
} from 'bloomer';
import styled from 'styled-components';

const Dropdown = styled.div`
  background-color: #fff;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border-top: 1px solid #dbdbdb;
  -webkit-box-shadow: 0 8px 8px rgba(10, 10, 10, 0.1);
  box-shadow: 0 8px 8px rgba(10, 10, 10, 0.1);
  font-size: 0.875rem;
  left: 0;
  width: max-content;
  position: absolute;
  top: 100%;
  z-index: 20;
`;

const NotificationItem = styled(NavbarItem)`
  &:hover {
    background-color: #d2d2d2;
  }
`;
class navbar extends Component {
  state = {
    loading: false,
    dropdownOpen: false
  };

  syncDevice = () => {
    this.setState({ loading: true });

    setTimeout(() => {
      this.setState({ loading: false });
    }, 3000);
  };

  onMouseEnter = () => {
    this.setState({ dropdownOpen: true });
  };
  onMouseLeave = () => {
    this.setState({ dropdownOpen: false });
  };
  render() {
    return (
      <Navbar style={{ boxShadow: '0px 10px 10px 0px rgba(0,0,0,0.23)' }}>
        <NavbarBrand>
          <img
            alt="Avatar"
            src="http://i.pravatar.cc/50"
            style={{ borderRadius: '50%', margin: '5px' }}
          />
          <NavbarItem>Welcome back, {this.props.user}</NavbarItem>
          <NotificationItem
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
          >
            <span className="fas fa-bell" />
            {this.state.dropdownOpen && (
              <Dropdown>
                <NotificationItem>
                  Well done on 5000 steps yesterday!
                </NotificationItem>

                <NotificationItem>
                  You lost 2kg in the last week!
                </NotificationItem>

                <NotificationItem>Great Run!</NotificationItem>
              </Dropdown>
            )}
          </NotificationItem>
          <NavbarItem>
            <Button isColor="danger" onClick={this.props.logoutUser}>
              LOGOUT
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button isColor="info" onClick={this.syncDevice}>
              SYNC WITH DEVICE
            </Button>
          </NavbarItem>
          {this.state.loading && (
            <NavbarItem>
              <span className="fas fa-sync fa-spin fa-lg" />
            </NavbarItem>
          )}
        </NavbarBrand>
      </Navbar>
    );
  }
}

export default navbar;
