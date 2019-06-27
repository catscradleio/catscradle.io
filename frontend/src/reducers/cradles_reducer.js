import { RECEIVE_DOODLE, RECEIVE_DOODLES} from '../actions/doodle_actions';

const DoodlesReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_DOODLES:
      newState = action.doodles.data;
      return newState;
    case RECEIVE_DOODLE:
      newState = [action.doodle.data];
      return newState;
    default:
      return state;
  }
};

export default DoodlesReducer;