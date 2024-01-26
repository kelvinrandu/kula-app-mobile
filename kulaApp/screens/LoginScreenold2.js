import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState,useRef } from "react";
import { StyleSheet, Text, View, Button as RNButton ,TouchableOpacity,Alert,TextInput} from "react-native";

import { Button, InputField, ErrorMessage } from "../components";
import Firebase from "../config/firebase";
// import {auth, app} from "../config/firebase";
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { signInWithPhoneNumber } from "@firebase/auth";
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';


const auth = Firebase.auth();

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const recaptchaVerifier= useRef(null);

  const sendVerification = async () => {
    try {

      //  const phonePrivider=  auth.PhoneAuthProvider();
      //  phonePrivider.verifyPhoneNumber(phone,recaptchaVerifier?.current).then(setVerificationId)
      //  setPhone('')
      const phoneProvider = new Firebase.auth.PhoneAuthProvider();
      console.log('phone',phone,phoneProvider)
      // await signInWithPhoneNumber(auth,phone,recaptchaVerifier.current)
      
      // await auth.signInWithPhoneNumber(phone).then((confirmation)=>{
      //   setCode(confirmation)

      // }).catch((e)=>{
      //   console.log('eer',e)
      // })

      // const result = await signInWithPhoneNumber(
      //   auth,
      //   phone,
      //   recaptchaVerifier.current
      // );
      // console.log('result',result)
    
    } catch (error) {
      console.log('error',error)

    }
  };

  const confirmCode = async () => {
    // try {

    //    const credentials = await auth.PhoneAuthProvider.credential(
    //     verificationId,
    //     code
    //    );
    //    await auth.signInWithCredential(credentials).then(()=>{
    //     setCode('')
    //    }).catch(()=>{
    //     console.log('error')
    //     alert(error)
    //    })
    //    Alert.alert('Login Successful. Welcome...')
    //   //  setPhone('')

    
    // } catch (error) {

    // }
  };

  return (
    <View style={styles.container}>
  <Text> otp</Text>
  <FirebaseRecaptchaVerifierModal
  ref={recaptchaVerifier}
  firebaseConfig={Firebase.app().options}
  />
   <Text style={styles.otpText}> 
   Login using  OTP
   </Text>
   <TextInput
   placeholder="Phone Number With Country code"
   onChangeText={setPhone}
   keyboardType="phone-pad"
   autoComplete="tel"
   style={styles.textInput}
   />
   <TouchableOpacity style={styles.sendVerification} onPress={sendVerification}>
   <Text style={styles.buttonText}> 
   Send verification
   </Text>


   </TouchableOpacity>
   <TextInput
   placeholder="Confirm Code"
   onChangeText={setCode}
   keyboardType="number-pad"

   style={styles.textInput}
   />
      <TouchableOpacity style={styles.sendCode} onPress={confirmCode}>
   <Text style={styles.buttonText}> 
   Confirm Verification
   </Text>


   </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#000",
    alignItems:'center',
    justifyContent:'center'
    // paddingTop: 50,
    // paddingHorizontal: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
    alignSelf: "center",
    paddingBottom: 24,
  },
  textInput: {
    paddingTop: 40,
    paddingHorizontal:20,
    fontSize:24,
    borderBottomColor:"#fff",
    paddingBottom: 20,
    borderBottomWidth:2,
    marginBottom:20,
    textAlign:'center',
    color:'#fff'
  },
  sendVerification:{
    padding:20,
    backgroundColor:'#3498db',
    borderRadius:10,

  },
  sendCode:{
    padding:20,
    backgroundColor:'#9b59b6',
    borderRadius:10,
  },
  buttonText:{
    textAlign:'center',
    color:'#fff',
    fontWeight:'bold',

  },
  otpText:{
    fontSize:24,
    fontWeight:'bold',
    color:'#fff',
    margin:20,
  }
});
