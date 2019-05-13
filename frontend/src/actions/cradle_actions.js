import {getCradles, getCradle, saveCradle} from '../util/cradle_api_util';

export const RECEIVE_CRADLES = "RECEIVE_CRADLES";
export const RECEIVE_CRADLE = "RECEIVE_CRADLE";

export const receiveCradles = (cradles) => ({
  type: RECEIVE_CRADLES,
  cradles
});

export const receiveCradle = (cradle) => ({
  type: RECEIVE_CRADLE,
  cradle
});

export const fetchCradles = () => dispatch => (
  getCradles()
    .then(cradles => dispatch(receiveCradles(cradles)))
    .catch(err => console.log(err))
);

export const fetchCradle = (id) => dispatch => (
  getCradle(id)
    .then(cradle => dispatch(receiveCradle(cradle)))
    .catch(err => console.log(err))
);

export const storeCradle = (data) => dispatch => (
  saveCradle(data)
    .then(cradle => dispatch(receiveCradle(cradle)))
    .catch(err => console.log(err))
);


