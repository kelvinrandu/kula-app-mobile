import React from 'react'
import { View, Text } from 'react-native'

export default function CartDetailsItem({ item }) {
    const { title, price } = item;
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          padding: 20,
          borderRadius:30,
          borderWidth: 1,
          // borderBottomWidth:{(title=="Deliver option") ? 0: 1}
          // borderBottomWidth: 1,
          borderColor: "#616161",
        }}
      >
        <Text style={{ fontWeight: "600", fontSize: 16 }}>{title}</Text>
        <Text style={{ opacity: 0.7, fontSize: 16,paddingLeft:10 }}>{price}</Text>
      </View>
    );
}
