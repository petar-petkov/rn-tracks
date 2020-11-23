import createDataContext from './createDataContext';

const authReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const { Provider, Context } = createDataContext(
  // Well reducer...
  authReducer,
  //Actions
  {},
  // Default Value
  { isSignedIn: false }
)