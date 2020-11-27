import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';

const trackReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  };
};

const fetchTracks = dispatch => () => {};
const createTrack = dispatch => async (trackName, locations) => {
  // Hardcoded user for testing purposes, don't forget to remove it ...
  const trackResponse = await trackerApi.post('/tracks/', { trackName, user: 1 })
  const trackId = trackResponse.data.id
  
  // Didn't want to redo the backend api for this sooo it's a bit of a bad design
  locations.forEach(async (location) => {
    const pointResponse = await trackerApi.post('/points/', { 
      track: trackId,
      timestamp: location.timestamp,
      coords: location.coords
    })
  });
};

export const { Provider, Context } = createDataContext(
  trackReducer,
  { fetchTracks, createTrack },
  []
);