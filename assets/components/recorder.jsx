import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';
import AudioRecord from 'react-native-audio-record';
import RNFS from 'react-native-fs';
import {request} from 'react-native-permissions';
import firebase from 'firebase';
import Sound from 'react-native-sound';
import { FireStorage } from '../../firebaseConfig';

const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [sound, setSound] = useState(null);

  const startRecording = async () => {
    try {
      await request('microphone');
      const audioFile = 'audio.wav';
      const filePath = `${RNFS.DocumentDirectoryPath}/${audioFile}`;
      const options = {
        sampleRate: 44100,
        channels: 1,
        bitsPerSample: 16,
        wavFile: audioFile,
      };
      setIsRecording(true);
      AudioRecord.start(options);
    } catch (err) {
      console.error(err);
    }
  };

  const stopRecording = async () => {
    try {
      const audioFile = 'audio.wav';
      const filePath = `${RNFS.DocumentDirectoryPath}/${audioFile}`;
      const audioData = await AudioRecord.stop();
      const base64Data = RNFS.readFile(filePath, 'base64');
    //   const storageRef = firebase.storage().ref();
    //   const fileRef = storageRef.child(audioFile);
    //   const snapshot = await fileRef.putString(base64Data, 'base64');
    //   console.log('Uploaded audio:', snapshot.metadata.fullPath);
      setSound(new Sound(filePath, '', (error) => {
        if (error) {
          console.log('failed to load the sound', error);
        }
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setIsRecording(false);
    }
  };

  const playRecording = () => {
    if (sound) {
      sound.play((success) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    }
  };

  return (
    <View>
      <Text>{isRecording ? 'Recording...' : 'Click the button to record.'}</Text>
      <Button title={isRecording ? 'Stop' : 'Record'} onPress={isRecording ? stopRecording : startRecording} />
      <Button title="Play Recording" onPress={playRecording} disabled={!sound} />
    </View>
  );
};

export default VoiceRecorder;