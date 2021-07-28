import { SET_AVATAR, SET_NAME } from '../actions';

const INITIAL_STATE = {
  name: '',
  img: '',
};

const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_AVATAR:
    return { ...state, img: action.payload };
  case SET_NAME:
    return { ...state, name: action.payload };
  default:
    return state;
  }
};

export default login;
