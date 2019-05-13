import axios from 'axios';

export const getCradles = () => {
  return axios.get('/api/cradles');
};

export const getCradle = (id) => {
  return axios.get(`/api/cradles/${id}`);
};

export const getUserCradles = (id) => {
  return axios.get(`/api/cradles/user/${id}`)
};

export const saveCradle = data => {
  return axios.post('/api/cradles/', data);
};