import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View,Text, Image } from "react-native";
import Onboarding from "react-native-onboarding-swiper";

export default function OnboardingScreen({ navigation }) {
  const handleDone =()=>{
    navigation.navigate("Login")
  }
  const doneButton=({props})=>{
    return(<>
        <TouchableOpacity style={styles.link} onPress={() => navigation.replace("Login")}>
          <Text >Done</Text>
        </TouchableOpacity>
    </>)
  }

  return (
    <View style={styles.container}>
      <Onboarding
      onDone={handleDone}
      onSkip={handleDone}
      DoneButtonComponent={doneButton}
        pages={[
          {
            backgroundColor: "#a7f3d0",
            image: <Image source={require("../assets/images/1.png")} />,
            title: "Spot On,Let's Eat!",
            subtitle: "Hey,what's your corner of the world?.Hit 'Allow Location' and we'll bring the eats to your streets.Quick share,and we're there!",
          },
          {
            backgroundColor: "#fef3c7",
            image: <Image source={require("../assets/images/2.png")} />,
            title: "Your Flavour,your choice!",
            subtitle: "Cravings calling?Swipe to your flavour and make it official.Pizza or sushi,it's your pick!Le's turn up the yummi",
          },
          {
            backgroundColor: "#a78bfa",
            image: <Image source={require("../assets/images/3.png")} />,
            title: "Tap, Pay, Enjoy",
            subtitle: "Payment's a breeze when you tap with ease!Choose,confirm,and you're set.Your delicious delivery's en route,fast and secure",
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  link:{
    padding:10
  }
});
