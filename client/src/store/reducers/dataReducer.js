import * as actions from '../actions/types';

const initialState = {
  steps: null,
  weight: null,
  calories: null,
  friends: ['Tom', 'Steve', 'Jim'],
  recentExercises: [
    { date: Date.now(), type: 'running', distance: 23, calBurn: 343 },
    { date: Date.now(), type: 'cycling', distance: 243, calBurn: 34443 }
  ]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_DATA:
      return {
        ...state,
        steps: action.payload.steps,
        weight: action.payload.weight,
        calories: action.payload.calories
      };

    default:
      return state;
  }
};
