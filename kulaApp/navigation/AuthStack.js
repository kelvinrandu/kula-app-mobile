import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import LoginScreen3 from "../screens/LoginScreen3";
import OnboardingScreen from "../screens/OnBoarding";
import SignupScreen from "../screens/SignupScreen";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Onboarding">
    {/* // <Stack.Navigator initialRouteName="Onboarding" headerMode="none"> */}
      <Stack.Screen name="Onboarding" component={OnboardingScreen}   options={{ headerShown:false}}/>
      <Stack.Screen name="Login" component={LoginScreen3}options={{ headerShown:false}} />
      <Stack.Screen name="Signup" component={SignupScreen}options={{ headerShown:false}} />
    </Stack.Navigator>
  );
}
