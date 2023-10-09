import React from 'react'
import { View, Text } from 'react-native'

export default function OrderItemTotal({total, items }) {
    // const { title, price } = item.item;
     let number = items.length 

    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 20,
          borderBottomWidth: 1,
          borderBottomColor: "999",
        }}
      >
        <Text style={{ opacity: 0.7,fontWeight: "600", fontSize: 16 }}>{number} {number>1?'items':'item'}</Text>
        <Text style={{ opacity: 0.7, fontSize: 16 }}>subtotal : {total} {'ksh'}</Text>
      </View>
    );
}
