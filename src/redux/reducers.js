import {
  SET_USER_NAME,
  SET_USER_AGE,
  INCREASE_AGE,
  GET_CITIES,
  SPEECH_TO_TEXT,
} from './actions';

const initialState = {
  Name: '',
  Age: 0,
  Cities: [],
  SpeechToTextRunning: false,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_NAME:
      return {...state, Name: action.payload};
    case SET_USER_AGE:
      return {...state, Age: action.payload};
    case INCREASE_AGE:
      return {...state, Age: state.Age + 1};
    case GET_CITIES:
      return {...state, Cities: action.payload};
    case SPEECH_TO_TEXT:
      return {...state, SpeechToTextRunning: !action.payload};
    default:
      return state;
  }
}

export default userReducer;
