import * as actions from '../actions/types';

const initialState = {
  steps: null,
  weight: null,
  calories: null,
  friends: null,
  recentExercises: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_DATA:
      return {
        ...state,
        steps: action.payload.steps,
        weight: action.payload.weight,
        calories: action.payload.calories,
        friends: action.payload.friends,
        recentExercises: action.payload.exercises
      };

    case actions.WIPE_DATA:
      return initialState;

    default:
      return state;
  }
};
