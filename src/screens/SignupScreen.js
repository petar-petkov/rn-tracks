import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';

const SignupScreen = ({ navigation }) => {

  const { state, signup } = useContext(AuthContext) 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Spacer>
        <Text h3 style={styles.header}>Sign Up for Tracker!</Text>
        <Input 
          label="Email"  
          value={email} 
          onChangeText={(newEmail) => setEmail(newEmail)}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          secureTextEntry={true}
          label="Password"  
          value={password} 
          onChangeText={(newPassword) => setPassword(newPassword)}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text> : null}
        <Button 
          title="Sign Up" 
          onPress={() => signup({ email, password })}
        />
      </Spacer>
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
  header: {
    paddingBottom: 50,
    marginLeft: 55
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 100,
    marginBottom: 15
  }
});

export default SignupScreen;
