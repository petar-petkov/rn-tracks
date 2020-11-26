import { useContext } from 'react';
import { Context as TrackContext } from '../context/TrackContext';
import { Context as LocationContext } from '../context/LocationContext';

export default () => {
  const { createTrack } = useContext(TrackContext);
  // We get whatever we currently have in our sate as location
  const { state: { locations, name } } = useContext(LocationContext);

  // We're just exposing this functionality to our app and it works out of the box
  // so that we don't need to get locations or name anywhere else on the app
  // when we need to create a track
  const saveTrack = () => {
    createTrack(name, locations);
  };

  // Community convention is to return it inside of an array
  return [saveTrack];
};