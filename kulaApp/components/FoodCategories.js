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
export default function FoodCategories({search}) {
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
     
                backgroundColor: "black",
                alignItems: "center",
         
              }}
              onPress={() => search(item.category)}
            >
           
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
