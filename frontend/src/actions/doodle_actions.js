import {getDoodles, getDoodle, getUserDoodles, saveDoodle} from '../util/doodle_api_util';

export const RECEIVE_DOODLES = "RECEIVE_DOODLES";
export const RECEIVE_DOODLE = "RECEIVE_DOODLE";

export const receiveDoodles = (doodles) => ({
  type: RECEIVE_DOODLES,
  doodles
});

export const receiveDoodle = (doodle) => ({
  type: RECEIVE_DOODLE,
  doodle
});

export const fetchDoodles = () => dispatch => (
  getDoodles()
    .then(doodles => dispatch(receiveDoodles(doodles)))
    .catch(err => console.log(err))
);

export const fetchUserDoodles = (id) => dispatch => (
  getUserDoodles(id)
    .then(doodles => dispatch(receiveDoodles(doodles)))
    .catch(err => console.log(err))
);

export const fetchDoodle = (id) => dispatch => (
  getDoodle(id)
    .then(doodle => dispatch(receiveDoodle(doodle)))
    .catch(err => console.log(err))
);

export const storeDoodle = (data) => dispatch => (
  saveDoodle(data)
    .then(doodle => dispatch(receiveDoodle(doodle)))
    .catch(err => console.log(err))
);


