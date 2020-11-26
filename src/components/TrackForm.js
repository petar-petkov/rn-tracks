import React, { useContext } from 'react';
import { Input, Button } from 'react-native-elements';
import Spacer from './Spacer';
import { Context as LocationContext } from '../context/LocationContext';

const TrackForm = () => {
  const {
    state: { name, recording, locations },
    startRecording,
    stopRecording,
    changeName 
  } = useContext(LocationContext);

  return (
    <>
      <Spacer>
        <Input 
          placeholder="Enter track name"
          onChangeText={changeName}
          value={name}
        />
        <Spacer>
        {recording
          ? <Button
              title="Stop"
              onPress={stopRecording}
              buttonStyle={{ backgroundColor: 'red' }} 
            /> 
          : <Button
              title="Start Recording"
              onPress={startRecording}
              buttonStyle={{ backgroundColor: 'green' }}
            />
        }
        </Spacer>
        <Spacer>
        {!recording && locations.length
          ? <Button
              title="Save Recording"
              onPress={stopRecording}
            /> 
          : null
        }
        </Spacer>
      </Spacer>
    </>
  )
};

export default TrackForm;