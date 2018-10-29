import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import LoginBox from './components/LoginBox';
import Dashboard from './containers/Dashboard';
import Register from './components/Register';
import { Provider } from 'react-redux';
import store from './store/store';
import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, LogoutUser } from './store/actions/authActions';
import noMatch from './containers/noMatch';
import styled from 'styled-components';
import { resetErrors } from './store/actions/errorActions';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

class App extends Component {
  state = {
    clicked: false
  };

  componentDidMount() {
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);

      const decoded = jwt_decode(localStorage.jwtToken);

      store.dispatch(setCurrentUser(decoded));

      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        store.dispatch(LogoutUser());
        this.props.history.push('/');
      }
    }
  }

  clicked = e => {
    e.preventDefault();
    store.dispatch(resetErrors());

    this.setState(prevState => ({ clicked: !prevState.clicked }));
  };

  loginRedirect = () => {
    this.props.history.push('/login');
  };

  RegisterRedirect = () => {
    this.props.history.push('/register');
  };

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route
              path="/register"
              exact
              render={() => (
                <Register clicked={this.loginRedirect} clickedState={true} />
              )}
            />
            <Route
              exact
              path="/login"
              render={() => (
                <LoginBox
                  clicked={this.RegisterRedirect}
                  clickedState={false}
                />
              )}
            />
            <Route
              exact
              path="/"
              render={props => (
                <React.Fragment>
                  <LoginBox
                    clicked={this.clicked}
                    clickedState={this.state.clicked}
                  />
                  <Register
                    clicked={this.clicked}
                    clickedState={this.state.clicked}
                  />
                </React.Fragment>
              )}
            />
            <Route component={noMatch} />
          </Switch>
        </div>
      </Provider>
    );
  }
}

export default withRouter(App);
