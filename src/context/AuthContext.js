import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return {...state, errorMessage: action.payload };
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

      console.log(response.data)
    } catch (err) {
      dispatch({ type: 'add_error', payload: 'Something went wrong' })
      // console.log(err.response.data)
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
  { isSignedIn: false, errorMessage: '' }
)