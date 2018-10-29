import * as actions from '../actions/types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_ERRORS:
      return action.payload;
    case actions.RESET_ERRORS:
      return {
        state: initialState
      };
    default:
      return state;
  }
};
