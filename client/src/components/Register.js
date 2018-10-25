import React, { Component } from 'react';
import { Box, Field, Label, Control, Input, Button, Help } from 'bloomer';
import axios from 'axios';
import { Spring, config, animated } from 'react-spring';
import { withRouter } from 'react-router-dom';

axios.defaults.baseURL = 'http://localhost:5000';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    error: ''
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  };

  registerUser = e => {
    console.log('clicked');
    e.preventDefault();

    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };

    axios
      .post('/api/users/register', data)
      .then(res => {
        console.log(res);
        // this.setState({ error: '', name: '', email: '', password: '' });
        this.props.history.push('/dashboard');
      })
      .catch(err => {
        console.log(err.response.data.message);
        this.setState({ error: err.response.data.message });
      });
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
                  <Help isColor="danger">{this.state.error}</Help>
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

export default withRouter(Register);
