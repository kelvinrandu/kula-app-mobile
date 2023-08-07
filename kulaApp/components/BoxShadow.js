import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet,Image } from "react-native";
import DropShadow from "react-native-drop-shadow";

export default function BoxShadow({text,navigation}) {
  const [activeTab, setActiveTab] = useState("Delivery");
  return (
    <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
        <DropShadow style={styles.shadowProp}>
      <TouchableOpacity
        style={
          {
            // // backgroundColor: props.activeTab === props.text ? "black" : "white",
            // color: props.activeTab === props.text ? "black" : "white",
            paddingVertical: 6,
            paddingHorizontal: 16,
            borderRadius: 30,
          }
        }
        onPress={() =>
          navigation.navigate("HomeScreenCategory", {
            text,
          })
        }
      >
        <View
          style={{
            fontSize: 16,
            marginHorizontal: 12,
            fontStyle: "normalize",
            fontWeight: 900,
            color: "#616161",
            // fontSize: 16px;
            lineHeight: "24px",
            // /* identical to box height, or 150% */

            // letter-spacing: -0.408px

            color: "#616161",
          }}
        >
          <Text>{text}</Text>
        </View>
      </TouchableOpacity>
      </DropShadow>
    </View>
  );
}

const HeaderButton = (props) => (
  <TouchableOpacity
    style={{
      // backgroundColor: props.activeTab === props.text ? "black" : "white",
      color: props.activeTab === props.text ? "black" : "white",
      paddingVertical: 6,
      paddingHorizontal: 16,
      borderRadius: 30,
    }}
    onPress={() => props.setActiveTab(props.text)}
  >
    <View // Parent
      style={{
        flex: 1,
        // No backgroundColor
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
      }}
    >
      <View // Card
        style={{
          flex: 1,
          borderRadius: 10,
          // To round image corners
          overflow: "hidden",
          borderColor: "#999",
          borderWidth: 0.5,
          // https://github.com/facebook/react-native/issues/10049#issuecomment-366426897
          backgroundColor: "#FFF",
          // Android shadow
          elevation: 4,
        }}
      >
        <Image // Content
          style={{
            height: "50%",
            width: "100%",
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
          source={{
            uri: "https://yourimageurl.com/image.jpg",
          }}
          resizeMode="cover"
        />
      </View>
    </View>
    <Text
      style={{
        color: props.activeTab === props.text ? "white" : "black",
        fontSize: 15,
        fontWeight: "900",
      }}
    >
      {props.text}
    </Text>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  button: {
    backgroundColor: "#4830D3",
    alignItems: "center",
    justifyContent: "center",
    height: 42,
    borderRadius: 4,
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
});