import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";

const items = [
  {
    image: require("../assets/images/deals.png"),
    text: "Groceries",
  },
  {
    image: require("../assets/images/fast-food.png"),
    text: "Fast Food",
  },
  {
    image: require("../assets/images/soft-drink.png"),
    text: "Drinks",
  },
  {
    image: require("../assets/images/coffee.png"),
    text: "Coffee",
  },
  {
    image: require("../assets/images/bread.png"),
    text: "Bread",
  },
  {
    image: require("../assets/images/desserts.png"),
    text: "Cake",
  },
];
export default function Categories({search}) {
  return (
    <View
      style={{
        marginTop: 5,
        backgroundColor: "#fff",
        paddingVertical: 10,
        paddingLeft: 20,
      }}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items.map((item, index) => (
          <View
            onPress={() => console.log("here")}
            key={index}
            style={{ alignItems: "center", marginRight: 30 }}
          >
            <TouchableOpacity
              // style={{
              //   marginTop: 20,
              //   backgroundColor: "black",
              //   alignItems: "center",
              //   padding: 13,
              //   borderRadius: 30,
              //   width: 300,
              //   position: "relative",
              // }}
              onPress={() => search(item.text)}
            >
              <Image
                source={item.image}
                style={{ width: 50, height: 40, resizeMode: "contain" }}
              />
              <Text style={{ fontSize: 13, fontWeight: "800" }}>
                {item.text}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
