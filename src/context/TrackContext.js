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
  // Hardcoded user for testing purposes
  const trackResponse = await trackerApi.post('/tracks/', { trackName, user: 1 })
  console.log(trackResponse.data)
  const trackId = trackResponse.data.id
  
  // Didn't want to redo the backend api for this sooo it's a bit of a bad design
  locations.forEach(async (location) => {
    const pointResponse = await trackerApi.post('/points/', { 
      track: trackId,
      timestamp: location.timestamp,
      coords: location.coords
    })
  });


  //console.log(pointResponse.data)
};

export const { Provider, Context } = createDataContext(
  trackReducer,
  { fetchTracks, createTrack },
  []
);