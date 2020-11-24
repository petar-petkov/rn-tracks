import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return {...state, errorMessage: action.payload };
    case 'signin':
      // this is the same case for both login and register
      // we return the same things
      return {errorMessage: '', token: action.payload};
    case 'signout':
      return { token: null, errorMessage: '' }
    case 'clear_error':
      return {...state, errorMessage: '' };
    default:
      return state;
  }
};

const tryLocalSignin = dispatch => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({ type: 'signin', payload: token })
    navigate('TrackList');
  } else {
    navigate('loginFlow');
  }
}


const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'clear_error', })
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
      dispatch({ type: 'signin', payload: response.data.tokens.access });

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
  return async ({ email, password }) => {
    try {
      const response = await trackerApi.post('/token/obtain/', { email, password })
      
      await AsyncStorage.setItem('token', response.data.access);
      dispatch({ type: 'signin', payload: response.data.access });

      navigate('TrackList');

    } catch(err) {
      dispatch({
        type: 'add_error',
        payload: 'Something went wrong with sign in'
      })
    }

  };
};

const signout =  (dispatch) => {
  return async () => {
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'signout' })
    navigate('loginFlow');
  }
};

export const { Provider, Context } = createDataContext(
  // Well reducer...
  authReducer,
  //Actions
  {
    signup,
    signin,
    signout, 
    clearErrorMessage,
    tryLocalSignin
  },
  // Default state value
  { token: null, errorMessage: '' }
)