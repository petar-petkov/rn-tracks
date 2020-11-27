import { useContext } from 'react';
import { Context as TrackContext } from '../context/TrackContext';
import { Context as LocationContext } from '../context/LocationContext';
import { navigate } from '../navigationRef';

export default () => {
  const { createTrack } = useContext(TrackContext);
  // We get whatever we currently have in our sate as location
  const { 
    state: { locations, name },
    reset
  } = useContext(LocationContext);

  // We're just exposing this functionality to our app and it works out of the box
  // so that we don't need to get locations or name anywhere else on the app
  // when we need to create a track
  const saveTrack = async () => {
    await createTrack(name, locations);
    // Reset the form to initial state
    reset();
    // Navigate to list
    navigate('TrackList');

  };

  // Community convention is to return it inside of an array
  return [saveTrack];
};