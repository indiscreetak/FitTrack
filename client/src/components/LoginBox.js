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
import { withRouter } from 'react-router-dom';
import { Spring } from 'react-spring';
import { connect } from 'react-redux';
import { loginUser } from '../store/actions/authActions';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { resetErrors } from '../store/actions/errorActions';

const Button = styled(Buttons)`
  cursor: pointer;
`;

class LoginBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'test@account.com',
      password: 'testaccount',
      errors: []
    };

    this.loginUser = this.loginUser.bind(this);
  }

  componentDidMount() {
    this.props.onResetErrors();
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  loginUser = e => {
    e.preventDefault();

    const data = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.onLoginUser(data);
  };

  render() {
    const onTop = this.props.clickedState;

    return (
      <React.Fragment>
        <Columns isCentered isVCentered>
          <Column isSize={{ mobile: 12, default: 5 }}>
            <Spring
              to={{
                opacity: !onTop ? 1 : 0,
                zIndex: 2,
                display: !onTop ? 'block' : 'none'
              }}
              config={{ tension: 170, overshootClamping: true }}
            >
              {styles => {
                return (
                  <Box style={styles}>
                    <form onSubmit={this.loginUser}>
                      <Field>
                        <h1 className="title is-2">Login</h1>
                        {this.props.errors.message ? (
                          <Notification isColor="danger">
                            {this.props.errors.message}
                          </Notification>
                        ) : null}
                        <Label>Email: </Label>
                        <Control>
                          <Input
                            type="text"
                            name="email"
                            onChange={this.handleChange}
                            required
                            value={this.state.email}
                          />
                        </Control>
                      </Field>
                      <Field>
                        <Label>Password: </Label>
                        <Control>
                          <Input
                            type="password"
                            name="password"
                            onChange={this.handleChange}
                            required
                            value={this.state.password}
                          />
                        </Control>
                      </Field>
                      <Field isGrouped>
                        <Control>
                          <Button
                            style={{
                              display: this.props.clickedState
                                ? 'none'
                                : 'block'
                            }}
                            type="submit"
                            isColor="primary"
                            disabled={
                              this.state.email.length < 5 ||
                              this.state.password.length < 8
                                ? true
                                : false
                            }
                          >
                            LOGIN
                          </Button>

                          <Label style={{ marginTop: '1em' }}>
                            Don't have an account?
                          </Label>
                          <Button
                            onClick={this.props.clicked}
                            type="submit"
                            isColor="danger"
                          >
                            REGISTER
                          </Button>
                        </Control>
                        <Control>
                          <Button
                            onClick={this.props.clicked}
                            style={{
                              display: this.props.clickedState
                                ? 'block'
                                : 'none'
                            }}
                            isColor="primary"
                          >
                            LOGIN
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
      </React.Fragment>
    );
  }
}

LoginBox.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = dispatch => {
  return {
    onLoginUser: data => dispatch(loginUser(data)),
    onResetErrors: () => dispatch(resetErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LoginBox));
