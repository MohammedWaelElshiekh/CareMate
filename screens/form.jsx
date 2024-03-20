import { View, Text, TouchableOpacity,Image,StyleSheet, ScrollView,TextInput } from 'react-native'
import React from 'react'
import Picker from "../assets/components/imagePicker";
import { FireStoreDB } from '../firebaseConfig';
import { addDoc,doc, updateDoc, arrayUnion, arrayRemove, setDoc, serverTimestamp } from "firebase/firestore";

import { FirebaseAUTH } from '../firebaseConfig';

export default function Form({ route, navigation}) {
  const data = route.params.data;
  const id = route.params.id;
  const [submit,setSubmit] = React.useState(0);
  const [imagesNames,setImagesNames] = React.useState([]);
  let answers = [];
  const generateRandomName =() =>{
    const randomString = Math.random().toString(36).substring(2, 8);
    const name = `${randomString}-image.jpg`
    return name;
  }
  const done = async() => {
    if(answers.includes("")){
      alert("من فضلك املا جميع الحقول المطلوبة")
    }else{
      setSubmit(submit +1);
      await setDoc(doc(FireStoreDB, `doctorsData/${data.author.id}/recieved`, FirebaseAUTH.currentUser.email),{
        postId:id,
        answers:answers,
        files:imagesNames,
        done:false,
        time: serverTimestamp(),
      });
      const ref = doc(FireStoreDB, "usersData", FirebaseAUTH.currentUser.email);
      await updateDoc(ref, {
        recent: arrayUnion(doc(FireStoreDB, `doctorsData/${data.author.id}/recieved`, FirebaseAUTH.currentUser.email))
      });
    }
    alert("تم التسليم");
    navigation.goBack()
  }
  React.useEffect(() => {
    let names = [];
    data.questions.forEach(item => {
      if (item.answer.includes("image")) {
        names.push(generateRandomName());
      }
    })
    setImagesNames(names);
  }, []);
  return (
    <View style={{paddingTop:30,paddingBottom:40}}>
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require("../assets/images/button.png")} style={{height:40,width:40}}/>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Text style={styles.text}>يجب الاجابة على الاسئلة التالية بكل دقة لضمان دقة الكشف الطبي</Text>
        {
          data.questions.map((item,index) => <View key={index} style={styles.quest}>
            <Text style={styles.questText}>{item.quest}</Text>
            {
              item.answer.includes("text")?<TextInput value={answers[index]} onChangeText={text => answers[index] = text} multiline={true} style={styles.questTextInput} placeholder='اكتب اجابتك'/>:""
            }
            {
               item.answer.includes("image")?<Picker name={imagesNames[index]} submit={submit}/>:""
            }
          </View>)
        }
        <TouchableOpacity style={styles.button} onPress={() => done()}>
          <Text style={styles.buttonTxt}>حفظ الاجابات</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  text:{
    fontSize:20,
    padding:5,
    textAlign:"center",
    color:"red",
    fontWeight:"900"
  },
  quest:{
    backgroundColor:"white",
    borderColor:"red",
    borderWidth:1,
    padding:10,
    margin:10,
    marginBottom:15
  },
  questText:{
    fontSize:17,
    textAlign:"center",
    paddingVertical:10
  },
  questTextInput:{
    borderColor:"black",
    borderWidth:1,
    padding:10,
    height:100,
    textAlignVertical:"top",
    marginVertical:10
  },
  button:{
    backgroundColor:"#4BAE4F",
    padding:10,
    marginBottom:20
  },
  buttonTxt:{
    textAlign:"center",
    fontSize:17
  }
})