import axios from 'axios';

export const getDoodles = () => {
  return axios.get('/api/doodles');
};

export const getDoodle = (id) => {
  return axios.get(`/api/doodles/${id}`);
};

export const getUserDoodles = (id) => {
  return axios.get(`/api/doodles/user/${id}`);
};

export const saveDoodle = data => {
  return axios.post('/api/doodles/', data);
};
