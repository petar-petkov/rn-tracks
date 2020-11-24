import React, { useContext } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';

const AccountScreen = () => {
  const { signout } = useContext(AuthContext);

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Spacer>
        <Text style={styles.header}>AccountScreen</Text>
        <Button 
          title="Sign Out"
          onPress={() => signout()}
        />
      </Spacer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 48,
    paddingBottom: 15,
    textAlignVertical: "center",
    textAlign: "center"
  },
})

export default AccountScreen;