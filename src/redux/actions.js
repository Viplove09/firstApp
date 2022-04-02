export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_AGE = 'SET_USER_AGE';
export const INCREASE_AGE = 'INCREASE_AGE';
export const GET_CITIES = 'GET_CITIES';
export const SPEECH_TO_TEXT = 'SPEECH_TO_TEXT';
export const TEXT_RECOGNITION = 'TEXT_RECOGNITION';

const API_URL =
  'https://6231bc6405f5f4d40d827f0c.mockapi.io/react-native/redux/getcities';

export const getCities = () => {
  try {
    return async dispatch => {
      const result = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      });
      const json = await result.json();
      console.log(json);
      if (json) {
        dispatch({
          type: GET_CITIES,
          payload: json,
        });
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const setName = Name => dispatch => {
  dispatch({
    type: SET_USER_NAME,
    payload: Name,
  });
};

export const setAge = Age => dispatch => {
  dispatch({
    type: SET_USER_AGE,
    payload: Age,
  });
};

export const increaseAge = Age => dispatch => {
  dispatch({
    type: INCREASE_AGE,
    payload: Age,
  });
};

export const setSpeechToText = recog => dispatch => {
  dispatch({
    type: SPEECH_TO_TEXT,
    payload: recog,
  });
};

export const setTextRecognition = text => dispatch => {
  dispatch({
    type: TEXT_RECOGNITION,
    payload: text,
  });
};
