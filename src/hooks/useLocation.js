import { useState, useEffect } from 'react';
import {
  Accuracy,
  requestPermissionsAsync,
  watchPositionAsync,
} from 'expo-location';

export default (shouldTrack, callback) => {
  const [err, setErr] = useState(null);
  const [subscriber, setSubscriber] = useState(null);

  const startWatching = async () => {
    try {
      const { granted } = await requestPermissionsAsync();
      if (!granted) {
        throw new Error('Location permission not granted');
      }
      // The only way to stop tracking is to remove the watch
      // position function i.e. sub.remove()
      // this is best achieved with using state
      const sub = await watchPositionAsync(
        {
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 10,
        },
        callback
      );
      // Update the state with our current watcher/subscriber
      setSubscriber(sub);
    } catch (e) {
      setErr(e);
    }
  };

  useEffect(() => {
    // Check what the value of should track is or more accurately if 
    // our screen with the map is currently focused, if it is
    // we track location and if not we remove the background
    // process for watching
    if (shouldTrack) {
      startWatching();
    } else {
      // Delete the subscriber
      subscriber.remove();
      // Also reset state
      setSubscriber(null);
    }
  // We want to re-render everything should track value changes
  }, [shouldTrack]);

  return [err];
};
