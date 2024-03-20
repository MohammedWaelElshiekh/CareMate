import React, { useEffect, useState } from 'react';
import * as eva from '@eva-design/eva';
import 'react-native-gesture-handler';
import { ApplicationProvider } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';
import LoginStack from "./routers/LoginStack";
import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseAUTH } from './firebaseConfig';
import HomeStack from "./routers/HomeStack"
export default function App() {
  const [user,setUser] = useState();
  useEffect(() => {
    onAuthStateChanged(FirebaseAUTH,(user) => {setUser(user)});
  },[]);
  return (
    <ApplicationProvider  style={{backgroundColor: "white",}}{...eva} theme={eva.light}>
      <NavigationContainer>
        {
          user?<HomeStack/>:<LoginStack/>
        }
      </NavigationContainer>
    </ApplicationProvider>
  );
}
