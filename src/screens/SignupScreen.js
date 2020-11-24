import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm'
import NavLink from '../components/NavLink';

const SignupScreen = () => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext)

  return (
    <View style={styles.container}>
        <NavigationEvents 
          onWillFocus={() => {clearErrorMessage()}}
        />
        <AuthForm 
          headerText="Sign up for Tracker"
          errorMessage={state.errorMessage}
          submitButtonText="Sign Up"
          onSubmit={({ email, password }) => signup({ email, password })}
        />
        <NavLink 
          routeName="Signin"
          text="Already have an account? Sign in instead."

        />
    </View>
  );
};

SignupScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  container: {
    // Fill vertical space
    flex: 1,
    justifyContent: 'center',
    marginBottom: 100
  },
});

export default SignupScreen;
