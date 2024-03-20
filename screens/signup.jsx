import { View, Text, SafeAreaView,TextInput, TouchableOpacity, StyleSheet, ImageBackground, ScrollView } from 'react-native'
import React ,{useState,useMemo}from 'react';
import * as FileSystem from 'expo-file-system';
import * as eva from '@eva-design/eva';
import { Dimensions } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import { FirebaseAUTH } from '../firebaseConfig';
import { addDoc, setDoc, doc } from "firebase/firestore"; 
import { Datepicker ,CheckBox} from '@ui-kitten/components';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FireStoreDB } from '../firebaseConfig';
const window= Dimensions.get("window");
export default function Login({ navigation: { navigate } }) {
  const [userName,setUserName]= useState("");
  const [phone,setPhone]= useState("");
  const [selectedId, setSelectedId] = useState();
  const [date,setDate] = useState(new Date());
  const [checked, setChecked] = useState(false);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [health,setHealth] = useState([]);
  const [address,setAddress] = useState("");
  const newUser = async() => {
    try {
      const responce = await createUserWithEmailAndPassword(FirebaseAUTH,email,password);
      console.log(responce);
      await setDoc(doc(FireStoreDB,"usersData",email.toLocaleLowerCase()),{
        name: userName,
        email: email.toLocaleLowerCase(),
        password: password,
        birth: date,
        phone:phone,
        sex: selectedId,
        health:health
      });
      FileSystem.writeAsStringAsync("../assets/databases/user.txt",email.toLocaleLowerCase());
      alert("sucess");
      
    } catch (error) {
      alert(error)
    }
  }

  return (
    <SafeAreaView style={{flex:1,marginTop:28,backgroundColor:"white"}}>
      <ImageBackground source={require("../assets/images/darkGround.jpg")}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Welcome To CareMate</Text>
        </View>
      </ImageBackground>
      <ScrollView contentContainerStyle={styles.form}>
          <View style={styles.field}>
            <Text style={styles.fieldText}>اكتب اسمك</Text>
            <TextInput value={userName} onChangeText={setUserName} style={styles.textInput}/>
          </View>
          <View style={styles.field}>
            <Text style={styles.fieldText}>البريد الالكتروني</Text>
            <TextInput value={email} onChangeText={setEmail} style={styles.textInput}/>
          </View>
          <View style={styles.field}>
            <Text style={styles.fieldText}>كلمة المرور الجديدة</Text>
            <TextInput secureTextEntry={true} value={password} onChangeText={setPassword} style={styles.textInput}/>
          </View>
          <View style={styles.field}>
            <Text style={styles.fieldText}>تاريخ الميلاد</Text>
            <Datepicker
              date={date}
              onSelect={nextDate => setDate(nextDate)}
              placement="top"
              size='large'
              style={[styles.textInput,{padding:0}]}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.fieldText}>عنوان السكن بالتفصيل</Text>
            <TextInput value={address} onChangeText={setAddress} style={styles.textInput}/>
          </View>
          <View style={styles.field}>
            <Text style={styles.fieldText}>رقم الموبايل المحمول</Text>
            <TextInput value={phone} onChangeText={setPhone} keyboardType="numeric" style={styles.textInput}/>
          </View>
          <View style={styles.field}>
            <Text style={styles.fieldText}>اختار النوع</Text>
            <RadioGroup
              containerStyle={[styles.textInput,{flexDirection:"row",justifyContent:"space-around"}]}
              radioButtons={useMemo(() => ([{id:1,label:"رجل"},{id:2,label:"امرأة"}]), [])}
              onPress={setSelectedId}
              selectedId={selectedId}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.fieldText}>رجاء اختيار اي امراض مزمنة تعاني منها حاليا</Text>
            <View style={[styles.textInput,{padding: 12,}]}>
              {
                ["أمراض القلب","الربو","ارتفاع الضغط"].map((item,index) =>(
                  <CheckBox 
                    key={index}
                    style={{marginBottom:10}} 
                    checked={health.includes(item)} 
                    onChange={(nextChecked) => 
                    nextChecked?setHealth(health.concat([item])):
                    setHealth(health.filter(it => it != item))}>
                    <Text>{item}</Text>
                  </CheckBox>
                ))
              }
            </View>
          </View>
        <View style={styles.buttonsGroup}>
          <TouchableOpacity onPress={newUser} style={[styles.primaryButton,styles.button].reverse()}>
            <Text style={styles.primaryButtonText}>Make New User</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate('login')} style={styles.button}>
            <Text>I have account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    // flex:1,
    alignItems:"center",
    paddingTop:20,
    paddingBottom:100
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
    paddingHorizontal:20
  },
  primaryButtonText:{
    textAlign:"center"
  },
  button:{
    padding:10,
    backgroundColor:"#eee",
    borderRadius:5
  },
  field:{
    alignItems:"flex-start",
    width:300
  },
  fieldText:{
    marginBottom:-10,
    zIndex: 100,
    backgroundColor:"white",
    paddingHorizontal:7,
    color: "#FF8A00",
    marginLeft:7,
    borderRadius:10
  }
})