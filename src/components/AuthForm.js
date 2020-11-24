import React, { useState } from 'react';
import { StyleSheet } from 'react-native'
import { Text, Button, Input } from 'react-native-elements';
import Spacer from '../components/Spacer';


const AuthForm = (
  { 
  headerText,
  errorMessage,
  onSubmit,
  submitButtonText 
  }
) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <Spacer>
        <Text h3 style={styles.header}>{headerText}</Text>
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
        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
        <Button 
          title={submitButtonText} 
          onPress={() => onSubmit({ email, password })}
        />

      </Spacer>
    </>
  )
};

const styles = StyleSheet.create({
  header: {
    paddingBottom: 50,
    textAlignVertical: "center",
    textAlign: "center"
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    textAlignVertical: "center",
    textAlign: "center",
    marginBottom: 15
  },
})

export default AuthForm;