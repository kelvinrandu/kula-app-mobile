import React, { useRef, useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Image,
  Animated,
  Text,
  TouchableOpacity,
} from "react-native";
import { BANNER_H } from "../components/constants";
import TopNavigation from "../components/TopNavigation";
import DummyText from "../components/DummyText";
import HeaderTabs from "../components/HeaderTabs";
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
    text: "Smoothie Bowls",
    category: "American",
  },
  {
    id: 3,
    image: require("../assets/images/coffee.png"),
    text: "Drinks",
    category: "African",
  },
];
const food_array = [
  {
    title: "Ethiopian Platter",
    description:
      "Vegan Ethiopian Platter is a colorful and flavorful dish that features a variety of traditional Ethiopian vegan dishes served on a large platter.This dish typicaly includes...",
    price: "950 ksh",
    category: "Main Dishes",
    quantity: 1,
    image:
      "https://www.modernhoney.com/wp-content/uploads/2019/08/Classic-Lasagna-14-scaled.jpg",
  },
  {
    title: "Roasted Herbed Potatoes",
    description:
      "Roasted Herbed Potatoes are a delicous ans savory dish that will elevate any meal.Made from fresh potatoes that are roasted...",
    price: "450 ksh",
    category: "Main Dishes",
    quantity: 1,
    image: "https://i.ytimg.com/vi/BKxGodX9NGg/maxresdefault.jpg",
  },
  {
    title: "Pea & Potato Samosa",
    description:
      "Pea & Potato Samosas are a mouth-watering Inndian snack that combines the sweetness of peas and earthiness of potatoes wrapped in a crispy,golden brown pastry",
    price: "200 ksh",
    quantity: 1,
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
    quantity: 1,
    image:
      "https://images.themodernproper.com/billowy-turkey/production/posts/2019/Easy-italian-salad-recipe-10.jpg?w=1200&h=1200&q=82&fm=jpg&fit=crop&fp-x=0.5&fp-y=0.5&dm=1614096227&s=c0f63a30cef3334d97f9ecad14be51da",
  },
  {
    title: "Avocado & Tomato",
    description:
      "Chapati Wrap with Avocado & Tomato is a fresh and favourful lunch option that combines the soft and chewy texture of a traditional Indian flatbread with the...",
    price: "400 ksh",
    category: "Chapati Wraps",
    quantity: 1,
    image:
      "https://thestayathomechef.com/wp-content/uploads/2017/08/Most-Amazing-Lasagna-2-e1574792735811.jpg",
  },
  {
    title: "Vegan Beef Shawarma",
    description:
      "Vegan Beef Shawarma is a plant-based take on the classic Middle Eastern dish that is traditionally made with meat.This vegan version uses a meat substitute that...",
    price: "700 ksh",
    category: "Chapati Wraps",
    quantity: 1,
    image:
      "https://images.themodernproper.com/billowy-turkey/production/posts/2019/Easy-italian-salad-recipe-10.jpg?w=1200&h=1200&q=82&fm=jpg&fit=crop&fp-x=0.5&fp-y=0.5&dm=1614096227&s=c0f63a30cef3334d97f9ecad14be51da",
  },
  {
    title: "Banana ,Peanut Butter & Cinnamon",
    description:
      "Chapati Wrap with Banana,Peanut Butter & Cinamon is a delicious and indulgent breakfast or snack option that combines the sweatness of bananas with the rich and...",
    price: "700 ksh",
    category: "Chapati Wraps",
    quantity: 1,
    image:
      "https://thestayathomechef.com/wp-content/uploads/2017/08/Most-Amazing-Lasagna-2-e1574792735811.jpg",
  },
  {
    title: "Cacao Tribe",
    description:
      "Smoothie Bowl Cacao Tribe is a delicious and healthy breakfast or snack option that is packed with nutrients and flavour .This smoothie bowl features a blend of ripe...",
    price: "600 ksh",
    quantity: 1,
    category: "Smoothie Bowls",
    image:
      "https://thestayathomechef.com/wp-content/uploads/2017/08/Most-Amazing-Lasagna-2-e1574792735811.jpg",
  },
];
const HomeScreenScroll = ({ route, navigation }) => {
  const btnRef = React.useRef();
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
   const [ind, setInd] = useState(0);
   const [foods, setfoods] = useState(food_array);
  const [active, setActive] = useState(0);
  const [query, setQuery] = useState("Main Dishes");
  const scrollA = useRef(new Animated.Value(0)).current;
  const search = (query) => {
    console.log(query);
    let resti = food_array.filter((food) => food.category === query);
    let result = resti;
    setQuery(query);
    setfoods(result);
  };
    useEffect(() => {
      search(query);
    }, [query]);
  return (
    <View>
      <TopNavigation title="Home" scrollA={scrollA} />
      <Animated.ScrollView
        // onScroll={e => console.log(e.nativeEvent.contentOffset.y)}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollA } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.bannerContainer}>
          <Animated.Image
            style={styles.banner(scrollA)}
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/linkedin-ba98a.appspot.com/o/tribearth.jpeg?alt=media&token=b00c8cb9-6a47-4377-81e1-be7cabd30efb",
            }}
            // source={require("./banner.jpg")}
          />
        </View>
        <RestaurantTitle name={route.params.name} />
        <RestaurantDescription
          btnRef={btnRef}
          modalVisible1={modalVisible1}
          setModalVisible1={setModalVisible1}
        />
        <View
          style={{
            marginHorizontal: 10,
            width: "100%",

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
                  active == item.id ? styles.activeCategory : styles.category
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
        <View style={{  marginRight: 30, marginTop: 10 }}>
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
              <TouchableOpacity
                onPress={(index) => {
                  //      isFoodInCart(food, cartItems)
                  //        ? console.log("here")
                  //        : selectItem(food, index);
                  setModalVisible(true);
                  setSelect(food);
                  setPrice(food?.price);
                }}
              >
                <FoodInfo food={food} />
                {/* <FoodImage food={food} /> */}
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <View style={styles.menuItemStyle2}>
            
        </View>
        {/* <DummyText /> */}
      </Animated.ScrollView>
    </View>
  );
};

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
    {/* view to handle modal  start */}
    <TouchableOpacity
      activeOpacity={1}
      // onPress={() =>
      //   // navigation.navigate("HomeScreenScroll", {
      //   //   name: 'new',

      //   // })
      // }
      // uncomment
      // onPress={() => props.setModalVisible1(true)}
    >
      <Text
        style={{
          color: "gray",
          marginHorizontal: 15,
          fontWeight: "400",
          fontSize: 15.5,
          marginBottom: 20,
        }}
      >
        Click to get more information about the restaurant
      </Text>
    </TouchableOpacity>

    {/* view to handle modal stop */}
  </>
);
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
const FoodInfo = (props) => {
  return (
    <View style={{ width: 350, justifyContent: "space-evenly" }}>
      <Text style={styles.titleStyle}>{props.food.title}</Text>
      <Text>{props.food.description}</Text>
      <Text style={styles.priceStyle}>{props.food.price}</Text>
    </View>
  );
};
const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalCheckoutContainer: {
    backgroundColor: "white",
    padding: 16,
    // height: 500,
    height: "100%",
    borderWidth: 1,
  },
  modalMapCheckoutContainer: {
    backgroundColor: "white",
    padding: 16,
    // height: 500,
    height: "100%",
    borderWidth: 1,
  },
  modalCheckout2Container: {
    backgroundColor: "white",
    padding: 16,
    // height: 500,
    height: 400,
    borderWidth: 1,
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
    alignItems: "center",
    
    color: "white",
  },
  category: {
    backgroundColor: "white",
    color: "white",
    alignItems: "center",
    padding: 10,
    borderRadius: 30,
  },
  menuItemStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  menuItemStyle2: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 600,
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
  bannerContainer: {
    marginTop: -1000,
    paddingTop: 1000,
    alignItems: "center",
    overflow: "hidden",
  },
  banner: (scrollA) => ({
    height: BANNER_H,
    width: "200%",
    transform: [
      {
        translateY: scrollA.interpolate({
          inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
          outputRange: [-BANNER_H / 2, 0, BANNER_H * 0.75, BANNER_H * 0.75],
        }),
      },
      {
        scale: scrollA.interpolate({
          inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
          outputRange: [2, 1, 0.5, 0.5],
        }),
      },
    ],
  }),
};

export default HomeScreenScroll;
