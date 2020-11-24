import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

const NavLink = ({ navigation, text, routeName }) => {
  return (
    <>
      <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
        <Text style={styles.link}>{text}</Text>
      </TouchableOpacity>
    </>
  )
};

const styles = StyleSheet.create({
  link: {
    color: 'blue',
    marginTop: 15,
    textAlignVertical: "center",
    textAlign: "center"
  }
});

export default withNavigation(NavLink);