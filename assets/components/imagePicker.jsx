import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Button, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FireStorage } from '../../firebaseConfig';
import {  ref, uploadBytesResumable } from "firebase/storage";

const metadata = {
    contentType: 'image/jpeg'
  };

export default function App(props) {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [submitted,setSubmitted] = React.useState(0)
  const imageName = props.name;
  const getBlob = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  
    return blob;
  };
  const selectImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert('Permission to access camera roll is required!');
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync();
      if (pickerResult.canceled === true) {
        return;
      }

      setImage(pickerResult.assets[0].uri);
    } catch (error) {
      console.log(error);
    }
  };

  const takePhoto = async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

      if (permissionResult.granted === false) {
        alert('Permission to access the camera is required!');
        return;
      }

      const pickerResult = await ImagePicker.launchCameraAsync();
      if (pickerResult.canceled === true) {
        return;
      }

      setImage(pickerResult.assets[0].uri);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async () => {
    try {
      const blob = await getBlob(image);
      const storageRef = ref(FireStorage, imageName);
  
      const uploadTask = uploadBytesResumable(storageRef, blob, metadata);
      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      }, (error) => {
        console.log(error);
      }, () => {
        console.log('Upload completed successfully!');
      });
  
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access camera roll is required!');
      }
    })();
  }, []);

  if(props.submit > submitted){uploadImage();setSubmitted(submitted +1)}

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {image && <Image source={{ uri: image }} style={styles.image} />}
        {uploading && (
          <View style={styles.progressBarContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.progress}>{transferred}% Uploaded</Text>
          </View>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Select Image" onPress={selectImage} />
        <Button title="Take Photo" onPress={takePhoto} />
        {/* <Button title="Upload" onPress={uploadImage} /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection:"row"
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: 'black',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  buttonContainer: {
    justifyContent: 'space-around',
    width: 150,
    height: 100
  },
  progressBarContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  progress: {
    fontSize: 20,
    color: '#fff',
    marginTop: 10,
  },
});