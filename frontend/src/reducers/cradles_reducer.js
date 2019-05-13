import { RECEIVE_CRADLE, RECEIVE_CRADLES} from '../actions/cradle_actions';

const CradlesReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_CRADLES:
      newState = action.cradles.data;
      return newState;
    case RECEIVE_CRADLE:
      newState = [action.cradle.data];
      return newState;
    default:
      return state;
  }
};

export default CradlesReducer;