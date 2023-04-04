import React, { useState,useRef,useEffect } from "react";
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

const food_array = [
  {
    title: "Ethiopian Platter",
    description:
      "Vegan Ethiopian Platter is a colorful and flavorful dish that features a variety of traditional Ethiopian vegan dishes served on a large platter.This dish typicaly includes...",
    price: "950 ksh",
    category: "Main Dishes",
    image:
      "https://www.modernhoney.com/wp-content/uploads/2019/08/Classic-Lasagna-14-scaled.jpg",
  },
  {
    title: "Roasted Herbed Potatoes",
    description:
      "Roasted Herbed Potatoes are a delicous ans savory dish that will elevate any meal.Made from fresh potatoes that are roasted...",
    price: "450 ksh",
    category: "Main Dishes",
    image: "https://i.ytimg.com/vi/BKxGodX9NGg/maxresdefault.jpg",
  },
  {
    title: "Pea & Potato Samosa",
    description:
      "Pea & Potato Samosas are a mouth-watering Inndian snack that combines the sweetness of peas and earthiness of potatoes wrapped in a crispy,golden brown pastry",
    price: "200 ksh",
    category: "Main Dishes",
    image:
      "https://i2.wp.com/chilipeppermadness.com/wp-content/uploads/2020/11/Chilaquales-Recipe-Chilaquiles-Rojos-1.jpg",
  },
  {
    title: "Oat Porridge with Banana & Cinamon",
    description:
      "One can never go wrong with a chicken caesar salad. Healthy option with greens and proteins!",
    price: "200 ksh",
    category: "Main Dishes",
    image:
      "https://images.themodernproper.com/billowy-turkey/production/posts/2019/Easy-italian-salad-recipe-10.jpg?w=1200&h=1200&q=82&fm=jpg&fit=crop&fp-x=0.5&fp-y=0.5&dm=1614096227&s=c0f63a30cef3334d97f9ecad14be51da",
  },
  {
    title: "Avocado & Tomato",
    description:
      "Chapati Wrap with Avocado & Tomato is a fresh and favourful lunch option that combines the soft and chewy texture of a traditional Indian flatbread with the...",
    price: "400 ksh",
    category: "Chapati Wraps",
    image:
      "https://thestayathomechef.com/wp-content/uploads/2017/08/Most-Amazing-Lasagna-2-e1574792735811.jpg",
  },
  {
    title: "Vegan Beef Shawarma",
    description:
      "Vegan Beef Shawarma is a plant-based take on the classic Middle Eastern dish that is traditionally made with meat.This vegan version uses a meat substitute that...",
    price: "700 ksh",
    category: "Chapati Wraps",
    image:
      "https://images.themodernproper.com/billowy-turkey/production/posts/2019/Easy-italian-salad-recipe-10.jpg?w=1200&h=1200&q=82&fm=jpg&fit=crop&fp-x=0.5&fp-y=0.5&dm=1614096227&s=c0f63a30cef3334d97f9ecad14be51da",
  },
  {
    title: "Banana ,Peanut Butter & Cinnamon",
    description:
      "Chapati Wrap with Banana,Peanut Butter & Cinamon is a delicious and indulgent breakfast or snack option that combines the sweatness of bananas with the rich and...",
    price: "700 ksh",
    category: "Chapati Wraps",
    image:
      "https://thestayathomechef.com/wp-content/uploads/2017/08/Most-Amazing-Lasagna-2-e1574792735811.jpg",
  },
  {
    title: "Cacao Tribe",
    description:
      "Smoothie Bowl Cacao Tribe is a delicious and healthy breakfast or snack option that is packed with nutrients and flavour .This smoothie bowl features a blend of ripe...",
    price: "600 ksh",
    category: "Smoothie Bowls",
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
    text: "Smoothie Bowls" ,
    category: "American",
  },
  {
    id: 3,
    image: require("../assets/images/coffee.png"),
    text: "Drinks",
    category: "African",
  },

];

export default function RestaurantDetails({ route ,navigation}) {

  const [active, setActive] = useState(0)
   const [foods, setfoods] = useState(food_array);
   const [query, setQuery] = useState('Main Dishes');
useEffect(() => {
  search(query);
}, [query]);

     const search = (query) => {
       console.log(query);
       let resti = food_array.filter((food) =>
         food.category === query
       );
       let result = resti;
       setQuery(query);
       setfoods(result);
     };
     
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
                      setActive(item.id);
                      search(item.text);
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
      100% Vegan - Female-Leaded
    </Text>
    <Text
      style={{
        color: "gray",

        marginHorizontal: 15,
        fontWeight: "400",
        fontSize: 15.5,
      }}
    >
      Open till 8:00 pm
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