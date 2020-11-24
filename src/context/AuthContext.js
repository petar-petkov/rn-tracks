import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return {...state, errorMessage: action.payload };
    case 'signup':
      return {errorMessage: '', token: action.payload}
    default:
      return state;
  }
};

const signup = (dispatch) => {
  return async ({ email, password }) => {
    try {
      const response = await trackerApi.post(
        'signup/',
        { email, password }
      )
      
      // Store token
      await AsyncStorage.setItem('token', response.data.tokens.access);

      // Update state with our token
      dispatch({ type: 'signup', payload: response.data.tokens.access });

      // Use the navigator function (navigationRef.js) we made which changes the state of the navigator
      // to the different flow, this also gives us access to the navigator so that
      // it could be called here
      navigate('TrackList');

    } catch (err) {
      dispatch({ type: 'add_error', payload: 'Something went wrong' })
    }
  };
};

const signin = (dispatch) => {
  return ({ email, password }) => {
    // try to sign in

    // Update state 

    // Handle errors 

  };
};

const signout = () => {
  return () => {
    // sign out?

    // update state

  }
}

export const { Provider, Context } = createDataContext(
  // Well reducer...
  authReducer,
  //Actions
  { signup, signin, signout },
  // Default state value
  { token: null, errorMessage: '' }
)