import {
  SET_BTN_HIDDEN,
  SET_CLICKED,
  SET_TIMER,
  SET_SCORE,
  SET_DISABLED,
  SET_DIFFICULTY,
  SET_CATEGORY,
} from '../actions';

const INITIAL_STATE = {
  hidden: true,
  disabled: false,
  clicked: false,
  score: 0,
  timer: 30,
  difficulty: '',
  category: '',
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_BTN_HIDDEN:
    return { ...state, hidden: action.payload };
  case SET_CLICKED:
    return { ...state, clicked: action.payload };
  case SET_TIMER:
    return { ...state, timer: action.payload };
  case SET_SCORE:
    return { ...state, score: action.payload };
  case SET_DISABLED:
    return { ...state, disabled: action.payload };
  case SET_DIFFICULTY:
    return { ...state, difficulty: action.payload };
  case SET_CATEGORY:
    return { ...state, category: action.payload };
  default:
    return state;
  }
};

export default game;
