import { useState, useEffect } from 'react';
import {
  Accuracy,
  requestPermissionsAsync,
  watchPositionAsync,
} from 'expo-location';

export default (shouldTrack, callback) => {
  const [err, setErr] = useState(null);

  useEffect(() => {

    let subscriber;

    const startWatching = async () => {
      try {
        const { granted } = await requestPermissionsAsync();
        if (!granted) {
          throw new Error('Location permission not granted');
        }
        // The only way to stop tracking is to remove the watch
        // position function i.e. sub.remove()
        // this is best achieved with using state
        subscriber = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10,
          },
          callback
        );
      } catch (e) {
        setErr(e);
      }
    };

    if (shouldTrack) {
      startWatching();
    } else {
      if (subscriber) {
        subscriber.remove();
      }
      subscriber = null;
    }

    return () => {
      // Check if we even have a sub as initially it's null
      if (subscriber) {
        subscriber.remove();
      }
    };

  // We want to re-render everything should track value changes
  // The callback is using useCallback from hooks, it's not a simple
  // function callback, it ensures that if our state changes
  // we still re-rerun watcher
  }, [shouldTrack, callback]);

  return [err];
};
