import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";

const items = [
  {
    image: require("../assets/images/deals.png"),
    text: "Groceries",
    category: "Groceries",
  },
  {
    image: require("../assets/images/fast-food.png"),
    text: "Fast Food",
    category: "African",
  },
  {
    image: require("../assets/images/soft-drink.png"),
    text: "Drinks",
    category: "American",
  },
  {
    image: require("../assets/images/coffee.png"),
    text: "Coffee",
    category: "African",
  },
  {
    image: require("../assets/images/bread.png"),
    text: "Bread",
    category: "Groceries",
  },
  {
    image: require("../assets/images/desserts.png"),
    text: "Cake",
    category: "Groceries",
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
              style={{
                // marginTop: 20,
                background: "#D9D9D9",
                // backgroundColor: "black",
                alignItems: "center",
                // padding: 13,
                // borderRadius: 30,
                // width: 300,
                // position: "relative",
              }}
              onPress={() => search(item.category)}
            >
              <Image
                source={item.image}
                style={{ width: 50, height: 40, resizeMode: "contain" }}
              />
              <Text style={{ fontSize: 12,  }}>
                {item.text}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
