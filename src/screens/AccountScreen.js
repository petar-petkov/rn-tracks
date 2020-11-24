import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';

const AccountScreen = () => {
  const { signout } = useContext(AuthContext);

  return (
    <>
    <Spacer>
      <Text style={{ fontSize:48 }}>AccountScreen</Text>
      <Button 
        title="Sing Out"
        onPress={() => signout()}
      />
    </Spacer>
    </>
  );
};

const styles = StyleSheet.create({

})

export default AccountScreen;