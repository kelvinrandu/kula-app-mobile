import React from 'react'
import { View, Text } from 'react-native'

export default function FeesItem({ item, total }) {
  const { title } = item;
  return (
    <View
    key={item?.id}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        borderBottomWidth:1,
        borderBottomColor: "999",
      }}
    >
      <Text style={{ fontWeight: "400", fontSize: 14 }}>{title}</Text>
      {title == "Delivery" ? (
        <Text
          style={{
            textDecorationLine: "line-through",
            opacity: 0.7,
            fontSize: 16,
          }}
        >
          100{"ksh"}
        </Text>
      ) : title == "Products" ? (
        <Text style={{ opacity: 0.7, fontSize: 16 }}>
          {total}
          {"ksh"}
        </Text>
      ) : (
        <Text style={{ opacity: 0.7, fontSize: 16 }}>100{"ksh"}</Text>
      )}
    </View>
  );
}
