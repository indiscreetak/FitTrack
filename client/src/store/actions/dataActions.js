import axios from 'axios';
import * as actions from './types';
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

// Register User
export const getData = () => dispatch => {
  axios
    .get('/api/profile/')
    .then(res =>
      dispatch({
        type: actions.GET_DATA,
        payload: res.data.profile
      })
    )
    .catch(err =>
      dispatch({
        type: actions.GET_ERRORS,
        payload: err
      })
    );
};
