import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LogoutUser } from '../store/actions/authActions';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import isEmpty from '../utils/isEmpty';
import NavBar from '../components/Navbar';
import Grid from '../components/Grid';

class Dashboard extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.isAuthenticated) {
      this.props.history.push('/login');
    }
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const isAuth = (
      <React.Fragment>
        <NavBar user={user.name} logoutUser={this.props.onLogoutUser} />
        <Grid />
      </React.Fragment>
    );

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

    return <div>{isAuthenticated && !isEmpty(user) ? isAuth : guest}</div>;
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
)(withRouter(Dashboard));
