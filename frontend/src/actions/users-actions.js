export const RECEIVE_ONE_USER = 'RECEIVE_ONE_USER';
export const RECEIVE_ALL_USERS = 'RECEIVE_ALL_USERS';

export const receiveOneUser = user => ({
  type: RECEIVE_ONE_USER,
  user
});

export const receiveAllUser = users => ({
  type: RECEIVE_ALL_USERs,
  users
});
