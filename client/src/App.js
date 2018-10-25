import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import LoginBox from './components/LoginBox';
import Dashboard from './containers/Dashboard';
import Register from './components/Register';

class App extends Component {
  state = {
    clicked: false
  };

  clicked = () => {
    this.setState(prevState => ({ clicked: !prevState.clicked }));
  };

  render() {
    return (
      <div className="App">
        <Route
          path="/login"
          render={() => (
            <Register
              clicked={this.clicked}
              clickedState={this.state.clicked}
            />
          )}
        />
        <Switch>
          <Route
            path="/login"
            render={() => (
              <LoginBox
                clicked={this.clicked}
                clickedState={this.state.clicked}
              />
            )}
          />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    );
  }
}

export default App;
