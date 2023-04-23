import React from "react";
import {
  Animated,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Avatar, Badge, Icon, withBadge } from "react-native-elements";
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
const HEADER_HEIGHT = 200;

const AnimatedHeader = (props) => {
      const { name, image, price, reviews, rating, categories } =
        props.route.params;
    const {

            animatedValue,
          } = props;
      const formattedCategories = categories
        .map((cat) => cat.title)
        .join(" • ");
      const description = `${formattedCategories} ${
        price ? " • " + price : ""
      }   • 🎫 • ${rating} ⭐  (${reviews}+)`;
  const insets = useSafeAreaInsets();
    const headerHeight = animatedValue.interpolate({
      inputRange: [0, HEADER_HEIGHT + insets.top],
      outputRange: [HEADER_HEIGHT + insets.top, insets.top + 100],
      extrapolate: "clamp",
    });


  return (
    <>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          height: headerHeight,
          backgroundColor: "lightblue",
        }}
      >
        <RestaurantImage image={image} />
        {/* <RestaurantTitle name={name} /> */}
        {/* <RestaurantDescription description={description} /> */}
      </Animated.View>
    </>
  );
};

const RestaurantImage = (props) => (
  <View>
    <Image
      source={{
        uri: props.image,
      }}
      // style={{ width: "100%", height: 180 }}
      style={{ width: "100%", height: "100%" }}
    />

    {/* <View
      style={{
        flexDirection: "row",
        borderWidth: 1,
        borderRadius: 30,
        padding: 5,
        position: "absolute",
        bottom: 5,
        backgroundColor: "#000",
        width: "25%",
        justifyContent: "space-around",
      }}
    >
      <Text
        style={{
          // marginTop: 10,
          // marginHorizontal: 15,
          fontWeight: "700",
          fontSize: 14,
          color: "#fff",
        }}
      >
        4.3
      </Text>
    </View> */}
  </View>
);
const RestaurantTitle = (props) => (
  <Text
    style={{
      fontSize: 29,
      zIndex: 10,
      fontWeight: "600",
      marginTop: 10,
      marginHorizontal: 15,
    }}
  >
    {props.name}
  </Text>
);
const RestaurantDescription = (props) => (
  <>
    <Text
      style={{
        marginTop: 10,
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
);

export default AnimatedHeader;
