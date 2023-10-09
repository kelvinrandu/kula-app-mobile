import React from 'react'
import { View, Text } from 'react-native'
import { Ionicons, AntDesign, FontAwesome5 } from "@expo/vector-icons";


export default function CartDetailsItem({ title ,price}) {
    // const { title, price } = item;
    return (
      <View
        style={{
          flexDirection: "row",
          align:'left',
          // justifyContent: "center",
          marginLeft:5,
          // alignItems: "start",
          padding: 20,
          borderRadius: 30,
          borderWidth: 1,

          // borderBottomWidth:{(title=="Deliver option") ? 0: 1}
          // borderBottomWidth: 1,
          borderColor: "#616161",
        }}
      >
        <FontAwesome5 name="dot-circle" size={24} color="green" />
        <View
          style={{
            // flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            // padding: 20,
            // borderRadius: 30,
            // borderWidth: 1,

            // borderBottomWidth:{(title=="Deliver option") ? 0: 1}
            // borderBottomWidth: 1,
            borderColor: "#616161",
          }}
        >
          <Text style={{ fontWeight: "600", fontSize: 16 }}>{title}</Text>
          <Text style={{ opacity: 0.7, fontSize: 16, paddingLeft: 10 }}>
            {price}
          </Text>
        </View>
      </View>
    );
}
