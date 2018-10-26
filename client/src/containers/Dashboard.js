import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LogoutUser } from '../store/actions/authActions';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../utils/isEmpty';

class Dashboard extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login');
    }
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const isAuth = <button onClick={this.props.onLogoutUser}>LOGOUT</button>;

    const guest = (
      <div>
        <Link to="/register">
          <button>REGISTER</button>
        </Link>
        <Link to="/login">
          <button>LOGIN</button>
        </Link>
      </div>
    );

    return (
      <div>
        Welcome to your dashboard
        {isAuthenticated && !isEmpty(user) ? isAuth : guest}
      </div>
    );
  }
}

Dashboard.propTypes = {
  onLogoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
const mapDispatchToProps = dispatch => ({
  onLogoutUser: () => dispatch(LogoutUser())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
