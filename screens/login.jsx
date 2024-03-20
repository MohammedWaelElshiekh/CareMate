import { View, Text, SafeAreaView,TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { Dimensions } from 'react-native'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseAUTH } from '../firebaseConfig';
const window= Dimensions.get("window");
export default function Login({ navigation: { navigate } }) {
  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Login = async() => {
    try {
      const responce = await signInWithEmailAndPassword(FirebaseAUTH,email,password);
      console.log(responce);
      // alert("sucess")
    } catch (error) {
      console.log(error);
      alert(error)
    }
    
  }
  return (
    <SafeAreaView style={{flex:1,marginTop:28,backgroundColor:"white"}}>
      <ImageBackground source={require("../assets/images/darkGround.jpg")}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Login To Your Account</Text>
        </View>
      </ImageBackground>
      <View style={styles.form}>
        <TextInput
          label="Email"
          style={styles.textInput} 
          placeholder='Inter Your Email...'
          autoCompleteType="email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}/>
        <TextInput 
          style={styles.textInput} 
          placeholder='Password...'
          secureTextEntry
          value={password}
          onChangeText={setPassword}/>
        <View style={styles.buttonsGroup}>
          <TouchableOpacity onPress={Login} style={[styles.primaryButton,styles.button].reverse()}>
            <Text style={styles.primaryButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Forgot Password</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate('signup')} style={styles.button}>
            <Text>New User</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles=StyleSheet.create({
  header:{
    height:200,
    alignItems:"flex-end",
    justifyContent:"center",
  },
  headerText:{
    color:"white",
    fontSize:30,
    width:200,
    textAlign:"center"
  },
  form:{
    justifyContent:"center",
    flex:1,
    alignItems:"center"
  },
  textInput:{
    width:300,
    marginBottom:10,
    backgroundColor:"white",
    borderWidth:2,
    padding:7,
    borderRadius:5,
    borderColor:"#FF8A00"
  },
  buttonsGroup:{
    flexDirection:"row",
    justifyContent:"space-between",
    width:300
  },
  primaryButton:{
    backgroundColor:"#FF8A00",
    width:70
  },
  primaryButtonText:{
    textAlign:"center"
  },
  button:{
    padding:10,
    backgroundColor:"#eee",
    borderRadius:5
  },
  buttonText:{

  }
})