import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { Select,SelectItem } from '@ui-kitten/components'
import { Button } from 'react-native';
import { collection, query, where,doc, getDoc,getDocs} from "firebase/firestore"; 
import { FireStoreDB } from '../firebaseConfig';
import Card from "../assets/components/card";

export default function Search({navigation}) {
  const [searchTerm,setSearchTerm] = React.useState();
  const [results,setResults] = React.useState([]);
  const [ids,setIds] = React.useState([]);
  const search = async() => {
    if(searchTerm){
      const posts = query(collection(FireStoreDB, "posts"), where('author.name', '>=', searchTerm),where('author.name', '<=', searchTerm + '\uf8ff'));
      const postsSnaps = await getDocs(posts);
      const authors = query(collection(FireStoreDB, "posts"), where('address', '>=', searchTerm),where('address', '<=', searchTerm + '\uf8ff'));
      const authorssnaps = await getDocs(authors);
      let res =[];
      let id =[];
      authorssnaps.forEach((doc) => {
        res.push(doc.data())
        id.push(doc.id)
      });
      postsSnaps.forEach((doc) => {
        res.push(doc.data())
        id.push(doc.id)
      });
      setResults(res);
      setIds(id);
    }else{
      setResults(null);
      setIds(null);
    }
  }

  return (
    <View style={{paddingTop:30}}>
      <View style={{backgroundColor:"#95daff"}}>
        <View style={styles.textInputCont}>
          <TextInput value={searchTerm} onChangeText={setSearchTerm} style={styles.textInput} placeholder='search...'/>
          <View style={{flexDirection: 'row',}}>
            <TouchableOpacity onPress={()=>{setResults([]);search()}} style={styles.button}>
              <Text style={{fontSize:20}}>بحث</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView style={styles.nothing} >
        {results?results.map((item,index) => <Card key={index} nav={navigation} id={ids[index]} data={item}/>):<View style={styles.no}><Text style={styles.noTxt}>Nothin Found :(</Text></View>}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  textInput:{
    backgroundColor:"white",
    paddingVertical:7,
    paddingHorizontal:10,
    marginRight:75,
    fontSize:17,
  },
  button:{
    backgroundColor:"#95daff",
    borderRadius:5,
    justifyContent:"center",
    alignItems:"center",
    marginLeft:5,
    position:"absolute",
    right:3,
    top:-39.5,
    paddingVertical:5,
    paddingHorizontal:15
  },
  textInputCont:{
    backgroundColor:"white",
    margin:5,
    borderRadius:5,
    overflow:"hidden"
  },
  no:{
    justifyContent:"center",
    alignItems:"center",
    height:300,
    width:"100%"
  },
  noTxt:{
    fontSize:22,
    color:"#FF8A00",
    // shadowOffset:
  }
})