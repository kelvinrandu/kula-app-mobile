// import React, { useState } from "react";
// import { View, Text, TouchableOpacity } from "react-native";

// import { Tab } from "@rneui/themed";

// export default function HeaderTabs() {
//   const [activeTab, setActiveTab] = useState("Delivery");
//    const [index, setIndex] = React.useState(0);
//   return (
//     <View style={{ flexDirection: "row", alignSelf: "center",color:"black"
    
    
//     }}>
//       {/* <HeaderButton
//         text="Delivery"
//         btnColor="black"
//         textColor="white"
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//       />
//       <HeaderButton
//         text="Pickup"
//         btnColor="white"
//         textColor="black"
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//       /> */}
//       {/* <ThemeProvider> */}
//       <Tab value={index} onChange={setIndex} dense>
//         <Tab.Item>Tab</Tab.Item>
//         <Tab.Item>Tab</Tab.Item>
//       </Tab>
//       {/* </ThemeProvider> */}
//     </View>
//   );
// }

// const HeaderButton = (props) => (
//   <TouchableOpacity
//     style={{
//       backgroundColor: props.activeTab === props.text ? "black" : "white",
//       paddingVertical: 6,
//       paddingHorizontal: 16,
//       borderRadius: 30,
//     }}
//     onPress={() => props.setActiveTab(props.text)}
//   >
//     <Text
//       style={{
//         color: props.activeTab === props.text ? "white" : "black",
//         fontSize: 15,
//         fontWeight: "900",
//       }}
//     >
//       {props.text}
//     </Text>
//   </TouchableOpacity>
// );
import * as React from "react";
import { Tab } from "@rneui/base";


export default function HeaderTabs () {
      const [index, setIndex] = React.useState(0);
  return (
    <Tab
      indicatorStyle={{
        backgroundColor: "black",
        height: 3,
      }}
      value={0}
      value={index}
      onChange={setIndex}
      dense
      variant="default"
    >
      <Tab.Item
        titleStyle={{
          color: "black",
          textDecoration: "underline",
          textDecorationColor: "red",
        }}
        title="Recent"
      />
      <Tab.Item
        titleStyle={{
          color: "black",
          textDecoration: "underline",
          textDecorationColor: "red",
        }}
        title="favourite"
      />
    </Tab>
  );
};
