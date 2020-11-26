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

    // It's best practice to define helper functions inside of useEffect
    // and list all its dependencies to avoid cases where you're spawning
    // multiple background functions and causing a crash
    const startWatching = async () => {
      try {
        const { granted } = await requestPermissionsAsync();
        if (!granted) {
          throw new Error('Location permission not granted');
        }
        // IGNORE:
        // ======================================
        // The only way to stop tracking is to remove the watch
        // position function i.e. sub.remove()
        // this is best achieved with using state
        // =======================================
        // The above statement is false as I encountered an issue where
        // watchPositionAsync was run in the background for every useEffect
        // called, so if I changed state of subscriber multiple times 
        // I would have a lot of watchPositions running, the solution was
        // to no use state but a let, and to add dependencies for all changeable
        // variables/states to use effect, and use the integrated useCallback in TrackCreateScreen
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
        // This will be run if we initiate a new useEffect refresh, so we
        // need to remove the old watcher/subscriber or we would be running
        // the old one and now a new one as well, this could go on for a while
        // if you're ambitious enough...
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
