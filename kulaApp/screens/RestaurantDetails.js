import React, { useRef } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Animated,TouchableOpacity,
} from "react-native";

import { Divider } from 'react-native-elements'
import About from '../components/About'
import MenuItems from '../components/MenuItems'
import ViewCart from '../components/ViewCart'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaView from "react-native-safe-area-view";
import AnimatedHeader from "../components/AnimatedHeader";
import HeaderTabs from "../components/HeaderTabs";
import FoodCategories from "../components/FoodCategories";



const H_MAX_HEIGHT = 150;
const H_MIN_HEIGHT = 52;
const H_SCROLL_DISTANCE = H_MAX_HEIGHT - H_MIN_HEIGHT;
console.log(H_SCROLL_DISTANCE);

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
export default function RestaurantDetails({ route ,navigation}) {
   const offset = useRef(new Animated.Value(0)).current;
   console.log('offset',offset)

    return (
      <SafeAreaProvider>
        <SafeAreaView
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          forceInset={{ top: "always" }}
        >
          <AnimatedHeader route={route} animatedValue={offset} />

          <Divider width={1.8} style={{ marginVertical: 10 }} />
          <ScrollView
            style={{ flex: 1, backgroundColor: "white" }}
            contentContainerStyle={{
              // alignItems: "center",
              alignItems: "flex-start",
              paddingTop: 200,
              zIndex: 1,
              // paddingHorizontal: 20,
            }}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: offset } } }],
              { useNativeDriver: false }
            )}
          >
            <RestaurantTitle name={route.params.name} />
            <RestaurantDescription />
            <HeaderTabs />
            <View
              style={{
                marginTop: 5,
                marginBottom:2,
                // backgroundColor: "#fff",
                // paddingVertical: 10,
                // paddingLeft: 20,
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
                        // background: "#D9D9D9",
                        
                        backgroundColor: "green",
                        alignItems: "center",
                        color:"white",
                        padding: 13,
                        borderRadius: 30,
                        width: 300,
                        // position: "relative",
                      }}
                      onPress={() => search(item.category)}
                    >
                      {/* <Image
                source={item.image}
                style={{ width: 50, height: 40, resizeMode: "contain" }}
              /> */}
                      <Text style={{ fontSize: 12 }}>{item.text}</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>
            <MenuItems restaurantName={route.params.name} />
          </ScrollView>
          <View style={styles.action}>
            <ViewCart
              navigation={navigation}
              restaurantName={route.params.name}
            />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
}
const RestaurantDescription = (props) => (
  <>
    <Text
      style={{
        marginTop: 3,
        marginHorizontal: 15,
        fontWeight: "700",
        fontSize: 15.5,
      }}
    >
      4.4 -vegan
    </Text>
    <Text
      style={{
        color: "gray",

        marginHorizontal: 15,
        fontWeight: "400",
        fontSize: 15.5,
      }}
    >
      Open till 8.pm
    </Text>
    <Text
      style={{
        color: "gray",
        marginHorizontal: 15,
        fontWeight: "400",
        fontSize: 15.5,
      }}
    >
      Click to get more information about the restaurant
    </Text>
    
    </>
)
const RestaurantTitle = (props) => (
  <Text
    style={{
      fontSize: 29,
      zIndex: 10,
      fontWeight: "600",
      marginTop: 0,
      marginBottom: 0,
      marginHorizontal: 10,
    }}
  >
    {props.name}
  </Text>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    marginHorizontal: 20,
  },
  text: {
    fontSize: 30,
  },
  action: {
    flexDirection: "row",
    // borderWidth: 1,
    // borderRadius: 25,
    padding: 15,
    position: "absolute",
    bottom: 5,
    backgroundColor: "transparent",
    width: "50%",
    justifyContent: "space-around",
  },
  actionItem: {
    color: "#fff",
  },
});

