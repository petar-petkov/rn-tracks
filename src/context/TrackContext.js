import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';

const trackReducer = (state, action) => {
  switch (action.type) {
    case 'fetch_tracks':
      return action.payload;
    case 'fetch_points':
      return action.payload;
    default:
      return state;
  };
};

const fetchTracks = dispatch => async () => {
  const response = await trackerApi.get('/tracks/');
  dispatch({ type: 'fetch_tracks', payload: response.data })
};

const fetchCoords = dispatch => async (trackId) => {
  const response = await trackerApi.get('/points/', { track: trackId });
  dispatch({ type: 'fetch_points', payload: response.data })
};

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