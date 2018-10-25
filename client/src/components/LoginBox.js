import React, { Component } from 'react';
import { Box, Field, Label, Control, Input, Button, Help } from 'bloomer';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Spring, config, animated } from 'react-spring';

axios.defaults.baseURL = 'http://localhost:5000';

class LoginBox extends Component {
  state = {
    name: '',
    password: '',
    error: ''
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  loginUser = e => {
    e.preventDefault();

    const data = {
      name: this.state.name,
      password: this.state.password
    };
    axios
      .post('/api/users/login', data)
      .then(res => {
        this.props.history.push('/');
      })
      .catch(err => this.setState({ error: err.response.data.message }));

    this.setState({ error: null, name: null, password: null });
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
                    <Label>Username: </Label>
                    <Control>
                      <Input
                        type="text"
                        placeholder="Text input"
                        name="name"
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
                    <Help isColor="danger">{this.state.error}</Help>
                  </Field>
                  <div>{this.state.name}</div>
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

export default withRouter(LoginBox);
