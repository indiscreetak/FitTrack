import React, { Component } from 'react';
import {
  Box,
  Field,
  Label,
  Control,
  Input,
  Button as Buttons,
  Notification,
  Columns,
  Column
} from 'bloomer';
import axios from 'axios';
import { Spring } from 'react-spring';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../store/actions/authActions';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { resetErrors } from '../store/actions/errorActions';

const Button = styled(Buttons)`
  cursor: pointer;
`;

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: ''
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  registerUser = e => {
    e.preventDefault();

    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };

    this.props.onRegisterUser(data);
  };

  render() {
    const onTop = this.props.clickedState;

    return (
      <Columns isCentered isVCentered>
        <Column isSize={{ mobile: 12, default: 5 }}>
          <Spring
            to={{
              opacity: onTop ? 1 : 0,
              zIndex: onTop ? 2 : 1,
              display: onTop ? 'block' : 'none'
            }}
            config={{ tension: 170, overshootClamping: true }}
          >
            {styles => {
              return (
                <Box style={styles}>
                  <form onSubmit={this.registerUser.bind(this)}>
                    <h1 className="title is-2" onClick={this.props.clicked}>
                      Register
                    </h1>
                    <Field>
                      {this.props.errors.message ? (
                        <Notification isColor="danger">
                          {this.props.errors.message}
                        </Notification>
                      ) : null}

                      <Label>Name: </Label>
                      <Control>
                        <Input
                          type="text"
                          placeholder="Text input"
                          name="name"
                          onChange={this.handleChange}
                        />
                      </Control>
                    </Field>
                    <Field>
                      <Label>Email: </Label>
                      <Control>
                        <Input
                          type="text"
                          placeholder="Text input"
                          name="email"
                          onChange={this.handleChange}
                        />
                      </Control>
                    </Field>
                    <Field>
                      <Label>Password: </Label>
                      <Control>
                        <Input
                          type="password"
                          placeholder="Text input"
                          name="password"
                          onChange={this.handleChange}
                        />
                      </Control>
                    </Field>

                    <Field isGrouped>
                      <Control>
                        <Button
                          style={{
                            display: this.props.clickedState ? 'block' : 'none'
                          }}
                          type="submit"
                          isColor="danger"
                        >
                          REGISTER
                        </Button>
                        <Label style={{ marginTop: '1em' }}>
                          Already have an account?
                        </Label>
                        <Button
                          onClick={this.props.clicked}
                          type="submit"
                          isColor="success"
                        >
                          LOGIN
                        </Button>
                      </Control>
                      <Control>
                        <Button
                          onClick={this.props.clicked}
                          style={{
                            display: this.props.clickedState ? 'none' : 'block'
                          }}
                          isColor="primary"
                        >
                          REGISTER
                        </Button>
                      </Control>
                    </Field>
                  </form>
                </Box>
              );
            }}
          </Spring>
        </Column>
      </Columns>
    );
  }
}

Register.propTypes = {
  onregisterUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
  onRegisterUser: (data, history) => dispatch(registerUser(data, history))
});

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register));
