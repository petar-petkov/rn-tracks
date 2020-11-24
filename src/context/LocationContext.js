import { createContext } from 'react';
import createDataContext from './createDataContext';

const locationReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  };
};


// shorthand is -> const startRecording = dispatch => () => {};
const startRecording = (dispatch) => {
  return () => {};
};

// shorthand is -> const stopRecording = dispatch => () => {};
const stopRecording = (dispatch) => {
  return () => {};
};


// shorthand is -> const addLocation = dispatch => () => {};
const addLocation = (dispatch) => {
  return () => {};
};


export const { Context, Provider } = createDataContext(
  locationReducer,
  { startRecording, stopRecording, addLocation },
  { recording: false, locations: [], currentLocation: null }
)