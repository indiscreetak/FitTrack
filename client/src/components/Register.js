import React, { Component } from 'react';
import {
  Box,
  Field,
  Label,
  Control,
  Input,
  Button,
  Notification
} from 'bloomer';
import axios from 'axios';
import { Spring } from 'react-spring';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../store/actions/authActions';
import PropTypes from 'prop-types';

axios.defaults.baseURL = 'http://localhost:5000';

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
    // this.props.onResetErrors();
    e.preventDefault();

    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };

    this.props.onRegisterUser(data, this.props.history);
  };

  render() {
    const onTop = this.props.clickedState;

    return (
      <Spring
        to={{
          width: '50%',
          margin: '0.5em auto',
          position: 'relative',
          opacity: !onTop ? 1 : 0.4,
          zIndex: 2,
          transform: !onTop ? 'translateY(15em)' : 'translateY(15em)'
        }}
        config={{ tension: 170, overshootClamping: true }}
      >
        {styles => {
          return (
            <Box style={styles}>
              <form onSubmit={this.registerUser}>
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
                <div>{this.state.name}</div>
                <div>{this.state.password}</div>
                <Field isGrouped>
                  <Control>
                    <Button
                      style={{
                        display: this.props.clickedState ? 'none' : 'block'
                      }}
                      type="submit"
                      isColor="danger"
                    >
                      REGISTER
                    </Button>
                    <Button
                      onClick={this.props.clicked}
                      style={{
                        display: this.props.clickedState ? 'block' : 'none'
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
