import axios from 'axios';
import * as actions from './types';
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { wipeData } from './dataActions';

// Register User
export const registerUser = userData => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => dispatch(loginUser(userData)))
    .catch(err =>
      dispatch({
        type: actions.GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      //save to LocalStorage
      const { token } = res.data;
      // set to ls
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: actions.GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set Current User
export const setCurrentUser = decoded => {
  return {
    type: actions.SET_CURRENT_USER,
    payload: decoded
  };
};

// logout User
export const LogoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  dispatch(wipeData());
};
