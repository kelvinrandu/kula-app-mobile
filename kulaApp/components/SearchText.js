import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function SearchText() {
  const [activeTab, setActiveTab] = useState("Delivery");
  return (
    <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
      <View
        style={{
          fontSize: 16,
          marginHorizontal:12,
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
        <Text> Restaurants next to you</Text>

    
      </View>
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
