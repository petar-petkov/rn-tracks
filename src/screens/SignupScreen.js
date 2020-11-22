import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const SignupScreen = ({ navigation }) => {
  return (
    <>
      <Text style={{ fontSize:48 }}>
        SignupScreen
      </Text>
      <Button title="Signin" onPress={() => navigation.navigate('Signin')} />
      <Button title="Main Flow" onPress={() => navigation.navigate('mainFlow')} />
    </>
  );

};

const styles = StyleSheet.create({

})

export default SignupScreen;