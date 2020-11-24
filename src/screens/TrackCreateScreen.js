import '../_mockLocation';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';
import { Text } from 'react-native-elements';
import Map from '../components/Map';

const TrackCreateScreen = () => {

  const [err, setErr] = useState(null);

  const startWatching = async () => {
    try {
      const { granted } = await requestPermissionsAsync();
      await watchPositionAsync({
        accuracy: Accuracy.BestForNavigation,
        timeInterval: 1000,
        distanceInterval: 10,
      }, (location) => {
        console.log(location)
      });


      if (!granted) {
        throw new Error('Location permission not granted');
      }
    } catch (e) {
      setErr(e);
    }
  };

  useEffect(() => {
    startWatching();
  }, [])

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Text h3 style={styles.header}>TrackCreateScreen</Text>
      <Map />
      { err ? <Text>Please enable location services</Text> : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingBottom: 15,
    textAlignVertical: "center",
    textAlign: "center"
  },
})

export default TrackCreateScreen;