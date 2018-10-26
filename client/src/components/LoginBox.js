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
import { withRouter } from 'react-router-dom';
import { Spring } from 'react-spring';
import { connect } from 'react-redux';
import { loginUser } from '../store/actions/authActions';
import PropTypes from 'prop-types';

axios.defaults.baseURL = 'http://localhost:5000';

class LoginBox extends Component {
  state = {
    email: '',
    password: '',
    errors: []
  };

  componentDidMount() {
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
        <Spring
          to={{
            width: '50%',
            margin: '0.5em auto',
            position: 'relative',
            opacity: onTop ? 1 : 0.4,
            zIndex: onTop ? 2 : 1,
            transform: onTop ? 'translateY(1em)' : 'translateY(0em)'
          }}
          config={{ tension: 40, friction: 7, overshootClamping: true }}
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
                        placeholder="Text input"
                        name="email"
                        onChange={this.handleChange}
                        required
                      />
                    </Control>
                  </Field>
                  <Field>
                    <Label>Password: </Label>
                    <Control>
                      <Input
                        type="text"
                        placeholder="Text input"
                        name="password"
                        onChange={this.handleChange}
                        required
                      />
                    </Control>
                  </Field>
                  <div>{this.state.email}</div>
                  <div>{this.state.password}</div>
                  <Field isGrouped>
                    <Control>
                      <Button
                        style={{
                          display: this.props.clickedState ? 'block' : 'none'
                        }}
                        type="submit"
                        isColor="primary"
                      >
                        LOGIN
                      </Button>
                      <Button
                        onClick={this.props.clicked}
                        style={{
                          display: this.props.clickedState ? 'none' : 'block'
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
    onLoginUser: data => dispatch(loginUser(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LoginBox));
