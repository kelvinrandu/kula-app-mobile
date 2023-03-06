import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import LoginScreen3 from "../screens/LoginScreen3";
import SignupScreen from "../screens/SignupScreen";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Login" component={LoginScreen3} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}
