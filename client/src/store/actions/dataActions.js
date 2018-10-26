import axios from 'axios';
import * as actions from './types';
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

// Register User
export const postData = (userData, history) => dispatch => {
  axios
    .post('/api/user/data', userData)
    .then(res => console.log(res.data))
    .catch(err =>
      dispatch({
        type: actions.GET_ERRORS,
        payload: err.response.data
      })
    );
};
