import * as actions from '../actions/types';

const initialState = {
  steps: 1530,
  weight: 45,
  calories: 4334,
  friends: ['Tom', 'Steve', 'Jim'],
  recentExercises: [
    { date: Date.now(), type: 'running', distance: 23, calBurn: 343 },
    { date: Date.now(), type: 'cycling', distance: 243, calBurn: 34443 }
  ]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_DATA:
      return state;
    default:
      return state;
  }
};
