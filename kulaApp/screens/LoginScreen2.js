import React, { useState, useRef } from "react";
import { Text, TextInput, TouchableOpacity,View ,Alert} from "react-native";
import firebase from "../config/firebase";
import Constants from "expo-constants";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LoginScreen from "./LoginScreen";
import styles from "../styles";
import { getAuth, signInWithPhoneNumber } from "firebase/auth";

// const auth = Firebase.auth();

export default LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);
  const sendVerification = () => {
    // const phoneProvider = new firebase.auth().PhoneAuthProvider();
    // phoneProvider
    //   .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
    //   .then(setVerificationId);

    //   Alert(verificationId)
  };
  const confirmCode = () => {
    // var credential = firebase.auth.PhoneAuthProvider.credential(
    //  verificationId,
    //   code
    // );

    // firebase.auth().signInWithCredential(credential);
    // firebase
    //   .auth()
    //   .signInWithCredential(credential)
    //   .then((result) => {
    //     console.log(result);
    //   });
  };


  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={Constants.manifest.extra.firebase}
        />
        <TextInput
          placeholder="Phone Number"
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          autoCompleteType="tel"
          style={styles.textInput}
        />
        <TouchableOpacity
          style={styles.sendVerification}
          onPress={sendVerification}
        >
          <Text style={styles.buttonText}>Send Verification</Text>
        </TouchableOpacity>
        <TextInput
          placeholder="Confirmation Code"
          onChangeText={setCode}
          keyboardType="number-pad"
          style={styles.textInput}
        />
        <TouchableOpacity style={styles.sendCode} onPress={confirmCode}>
          <Text style={styles.buttonText}>Send Verification</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};
