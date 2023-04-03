import React, { useState,useRef } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Animated,TouchableOpacity,
  
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import { Divider } from 'react-native-elements'
import About from '../components/About'
import MenuItems from '../components/MenuItems'
import ViewCart from '../components/ViewCart'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaView from "react-native-safe-area-view";
import AnimatedHeader from "../components/AnimatedHeader";
import HeaderTabs from "../components/HeaderTabs";
import FoodCategories from "../components/FoodCategories";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";



const H_MAX_HEIGHT = 150;
const H_MIN_HEIGHT = 52;
const H_SCROLL_DISTANCE = H_MAX_HEIGHT - H_MIN_HEIGHT;
console.log(H_SCROLL_DISTANCE);

const foods = [
  {
    title: "Lasagna",
    description: "With butter lettuce, tomato and sauce bechamel",
    price: "$13.50",
    image:
      "https://www.modernhoney.com/wp-content/uploads/2019/08/Classic-Lasagna-14-scaled.jpg",
  },
  {
    title: "Tandoori Chicken",
    description:
      "Amazing Indian dish with tenderloin chicken off the sizzles 🔥",
    price: "$19.20",
    image: "https://i.ytimg.com/vi/BKxGodX9NGg/maxresdefault.jpg",
  },
  {
    title: "Chilaquiles",
    description:
      "Chilaquiles with cheese and sauce. A delicious mexican dish 🇲🇽",
    price: "$14.50",
    image:
      "https://i2.wp.com/chilipeppermadness.com/wp-content/uploads/2020/11/Chilaquales-Recipe-Chilaquiles-Rojos-1.jpg",
  },
  {
    title: "Chicken Caesar Salad",
    description:
      "One can never go wrong with a chicken caesar salad. Healthy option with greens and proteins!",
    price: "$21.50",
    image:
      "https://images.themodernproper.com/billowy-turkey/production/posts/2019/Easy-italian-salad-recipe-10.jpg?w=1200&h=1200&q=82&fm=jpg&fit=crop&fp-x=0.5&fp-y=0.5&dm=1614096227&s=c0f63a30cef3334d97f9ecad14be51da",
  },
  {
    title: "Lasagna",
    description: "With butter lettuce, tomato and sauce bechamel",
    price: "$13.50",
    image:
      "https://thestayathomechef.com/wp-content/uploads/2017/08/Most-Amazing-Lasagna-2-e1574792735811.jpg",
  },
  {
    title: "Chicken Caesar Salad",
    description:
      "One can never go wrong with a chicken caesar salad. Healthy option with greens and proteins!",
    price: "$21.50",
    image:
      "https://images.themodernproper.com/billowy-turkey/production/posts/2019/Easy-italian-salad-recipe-10.jpg?w=1200&h=1200&q=82&fm=jpg&fit=crop&fp-x=0.5&fp-y=0.5&dm=1614096227&s=c0f63a30cef3334d97f9ecad14be51da",
  },
  {
    title: "Lasagna",
    description: "With butter lettuce, tomato and sauce bechamel",
    price: "$13.50",
    image:
      "https://thestayathomechef.com/wp-content/uploads/2017/08/Most-Amazing-Lasagna-2-e1574792735811.jpg",
  },
];
const items = [
  {
    id: 0,
    image: require("../assets/images/deals.png"),
    text: "Main Dishes",
    category: "Groceries",
  },
  {
    id: 1,
    image: require("../assets/images/fast-food.png"),
    text: "Chapati Wraps",
    category: "African",
  },
  {
    id: 2,
    image: require("../assets/images/soft-drink.png"),
    text: "Smoothie",
    category: "American",
  },
  {
    id: 3,
    image: require("../assets/images/coffee.png"),
    text: "Coffee",
    category: "African",
  },
  {
    id: 4,
    image: require("../assets/images/bread.png"),
    text: "Bread",
    category: "Groceries",
  },
  {
    id: 5,
    image: require("../assets/images/desserts.png"),
    text: "Cake",
    category: "Groceries",
  },
];

export default function RestaurantDetails({ route ,navigation}) {

  const [active, setActive] = useState(0)
   const offset = useRef(new Animated.Value(0)).current;
   console.log('offset',offset)
     const dispatch = useDispatch();
     const selectItem = (item, checkboxValue) =>
       dispatch({
         type: "ADD_TO_CART",
         payload: {
           item,
          //  restaurantName: restaurantName,
           restaurantName: route.params.name,
           checkboxValue: checkboxValue,
         },
       });
     const cartItems = useSelector(
       (state) => state.cartReducer.selectedItems.items
     );

     const isFoodInCart = (food, cartItems) => {
       return Boolean(cartItems.find((item) => item.item.title === food.title));
     };

    return (
      <SafeAreaProvider>
        <SafeAreaView
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          forceInset={{ top: "always" }}
        >
          <AnimatedHeader route={route} animatedValue={offset} />

          <Divider width={1.8} style={{ marginVertical: 10 }} />
          <ScrollView
            nestedScrollEnabled={true}
            style={{ flex: 1, backgroundColor: "white" }}
            contentContainerStyle={{
              // alignItems: "center",
              alignItems: "flex-start",
              paddingTop: 200,
              zIndex: 1,
              // paddingHorizontal: 10,
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
            <View
              style={{
          
                marginHorizontal: 10,
                width:"100%"
            
                // marginBottom: 5,
              }}
            >
              <HeaderTabs color={"green"} />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {items.map((item, index) => (
                <View
                  onPress={() => console.log("here")}
                  key={index}
                  style={{
                    alignItems: "center",
                    marginRight: 30,
                    marginHorizontal: 10,
                    marginTop: 20,
                    // marginBottom: 5,
                  }}
                >
                  <TouchableOpacity
                    style={
                      active == item.id
                        ? styles.activeCategory
                        : styles.category
                    }
                    onPress={() => {
                      // search(item.category)
                      setActive(item.id);
                    }}
                  >
                    {/* <Image
                source={item.image}
                style={{ width: 50, height: 40, resizeMode: "contain" }}
              /> */}
                    <Text
                      style={
                        active == item.id
                          ? styles.activeTextCategory
                          : styles.textCategory
                      }
                    >
                      {item.text}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
            <View
              style={{ alignItems: "center", marginRight: 30, marginTop: 10 }}
            >
              <Text
                style={{
                  fontSize: 20,
                  zIndex: 10,
                  fontWeight: "600",
                  marginTop: 0,
                  marginBottom: 0,
                  marginHorizontal: 10,
                }}
              >
                {items[active].text}
              </Text>
            </View>

            {foods.map((food, index) => (
              <View key={index}>
                <View style={styles.menuItemStyle}>
                  <BouncyCheckbox
                    iconStyle={{ borderColor: "lightgray", borderRadius: 0 }}
                    fillColor="green"
                    onPress={(checkboxValue) => selectItem(food, checkboxValue)}
                    isChecked={isFoodInCart(food, cartItems)}
                    // onPress={isFoodInCart(food, cartItems)}
                  />

                  <FoodInfo food={food} />
                  {/* <FoodImage food={food} /> */}
                </View>
              </View>
            ))}
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
        marginBottom:20
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
  titleStyle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#616161",
  },
  priceStyle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#616161",
  },
  text: {
    fontSize: 30,
  },
  activeCategory: {
    backgroundColor: "green",
    alignItems: "center",
    padding: 10,
    borderRadius: 30,
  },
  textCategory: {
    fontSize: 15,
    fontWeight: "600",
    color: "black",
  },
  activeTextCategory: {
    fontSize: 12,
    fontWeight: "600",
    color: "white",
  },
  category: {
    backgroundColor: "white",
    color: "white",
    alignItems: "center",
    padding: 13,
    borderRadius: 30,
  },
  menuItemStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
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

const FoodInfo = (props) => {
  return (
    <View style={{ width:350, justifyContent: "space-evenly" }}>
      <Text style={styles.titleStyle}>{props.food.title}</Text>
      <Text>{props.food.description}</Text>
      <Text style={styles.priceStyle}>{props.food.price}</Text>
    </View>
  );
};
const FoodImage = (props) => (
  <View>
    <Image
      source={{ uri: props.food.image }}
      style={{ width: 100, height: 100, borderRadius: 8 }}
    />
  </View>
);