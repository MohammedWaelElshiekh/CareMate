import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { FireStoreDB } from '../../firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import { Svg } from 'react-native-svg';

export default function Poster(props) {
  const data = props.data;
  const id = props.id;
  return (
    <View style={styles.cardCont}>
        <View style={styles.top}>
          <Image style={styles.theImage} source={require("../images/darkGround.jpg")}></Image>
          <View style={styles.nameCont}>
            <Text style={styles.authorName}>{data?data.author.name:""}</Text>
            <View style={{flexDirection:"row-reverse",alignItems:"center"}}>
              <Text style={styles.authorMain}>{data?data.author.main:""}</Text>
              <Image style={{height:16,width:16,marginRight:5}} source={require("../images/accept.png")}/>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.desc}>{data?data.descritption:""}</Text>
          <TouchableOpacity onPress={() => props.nav.navigate("form",{data:data,id:id})} style={styles.button}>
            <Text style={styles.buttonTxt}>Start</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:"row",justifyContent:"space-evenly",marginTop:5}}>
          <View style={{flexDirection:"row"}}>
            <Image style={{height:16,width:16,marginRight:5}} source={require("../images/thumb-up.png")}/>
            <Text>{data.lovers.length}</Text>
          </View>
          <View style={{flexDirection:"row"}}>
            <Image style={{height:16,width:16,marginRight:5}} source={require("../images/thumb-down.png")}/>
            <Text>{data.notlovers.length}</Text>
          </View>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
  cardCont:{
    backgroundColor:"#fff",
    margin:10,
    marginBottom:0,
    padding:5
  },
  top:{
    marginVertical:10,
    alignItems:"center",
    flexDirection: 'row-reverse',
    justifyContent:"flex-start"
  },
  theImage:{
    height:40,
    width:40,
    borderRadius:10
  },
  nameCont:{
    marginRight:5
  },
  authorName:{
    fontSize:17,
    fontWeight:"900"
  },
  authorMain:{
    color:"#4BAE4F"
  },
  button:{
    backgroundColor:"#4BAE4F",
    padding:10,
  
  },
  desc:{
    marginBottom:7,
    fontSize:20
  },
  buttonTxt:{
    color:"#222"
  }
})