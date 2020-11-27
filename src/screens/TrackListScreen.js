import React, { useContext } from 'react';
import { Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { ListItem } from 'react-native-elements'
import { Context as TrackContext } from '../context/TrackContext';


const TrackListScreen = ({ navigation }) => {
  const { state, fetchTracks } = useContext(TrackContext);
  
  return (
    <>
      <NavigationEvents onWillFocus={() => fetchTracks()} />
      <Text style={{ fontSize:48 }}>TrackListScreen</Text>
      <FlatList
        data={state}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity>
              <ListItem chevron={true} title={item.trackName} />
            </TouchableOpacity>
          )
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({

})

export default TrackListScreen;