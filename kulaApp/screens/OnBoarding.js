import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import Firebase from "../config/firebase";
import {  InputField, ErrorMessage } from "../components";


const auth = Firebase.auth();
export default function OnboardingScreen({ navigation }) {
  // const [email, setEmail] = useState({ value: "", error: "" });
  // const [password, setPassword] = useState({ value: "", error: "" });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState("eye");
    const [loginError, setLoginError] = useState("");

  // const onLoginPressed = () => {
  //   const emailError = emailValidator(email.value);
  //   const passwordError = passwordValidator(password.value);
  //   if (emailError || passwordError) {
  //     setEmail({ ...email, error: emailError });
  //     setPassword({ ...password, error: passwordError });
  //     return;
  //   }
  //   navigation.reset({
  //     index: 0,
  //     routes: [{ name: "Dashboard" }],
  //   });
  // };
    const onLogin = async () => {
      try {
        if (email !== "" && password !== "") {
          await auth.signInWithEmailAndPassword(email, password);
        }
      } catch (error) {
        setLoginError(error.message);
      }
    };

  return (
    <Background>
      {/* <BackButton goBack={navigation.goBack} /> */}
      {/* <Logo />
      <Header>Welcome back.</Header> */}


      {loginError ? <ErrorMessage error={loginError} visible={true} /> : null}
      <Button mode="contained" onPress={onLogin}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace("RegisterScreen")}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
