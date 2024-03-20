import { View, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react';
import { FirebaseAUTH } from '../firebaseConfig';
import { doc, getDoc } from "firebase/firestore";
import { FireStoreDB } from '../firebaseConfig';
export default function Home() {
  const [data,setData] = React.useState();
  
  const cont = async() => {
      const docRef = doc(FireStoreDB, "usersData", FirebaseAUTH.currentUser.email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
          setData(docSnap.data().recent)
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
  }

    cont()
  return (
    <View style={{flex:1,paddingTop:30}}>
      <Text>Recently used forms: </Text>
     
    </View>
  )
}