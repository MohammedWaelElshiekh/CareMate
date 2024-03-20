import { initializeApp } from 'firebase/app';
// Optionally import the services that you want to use
import {getAuth} from "firebase/auth";
// import {...} from "firebase/database";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";

// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD7f8tTPKRSzQpl4VxtzH8YfMn9JIgLfP8",

    authDomain: "caremate-ce80c.firebaseapp.com",
  
    projectId: "caremate-ce80c",
  
    storageBucket: "caremate-ce80c.appspot.com",
  
    messagingSenderId: "285258879000",
  
    appId: "1:285258879000:web:d03c2ad6caa129409fb36d",
  
    measurementId: "G-JF5G15M6QC"
  
};

export const FirebaseApp = initializeApp(firebaseConfig);
export const FireStoreDB = getFirestore(FirebaseApp);
export const FirebaseAUTH = getAuth(FirebaseApp);
export const FireStorage = getStorage(FirebaseApp)
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
