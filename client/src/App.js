import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import './App.css';
import LoginBox from './components/LoginBox';
import Dashboard from './containers/Dashboard';
import Register from './components/Register';
import { Provider } from 'react-redux';
import store from './store/store';
import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, LogoutUser } from './store/actions/authActions';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);

  const decoded = jwt_decode(localStorage.jwtToken);

  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(LogoutUser());
    this.props.history.push('/login');
  }
}

class App extends Component {
  state = {
    clicked: true
  };

  clicked = () => {
    this.setState(prevState => ({ clicked: !prevState.clicked }));
  };

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route
              path="/register"
              render={() => (
                <Register
                  clicked={this.clicked}
                  clickedState={this.state.clicked}
                />
              )}
            />
          </Switch>
          <Route
            path="/login"
            render={() => (
              <LoginBox
                clicked={this.clicked}
                clickedState={this.state.clicked}
              />
            )}
          />
        </div>
      </Provider>
    );
  }
}

export default withRouter(App);
