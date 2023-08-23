import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  // FlatGrid,
  FlatList,
  Modal,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";

import {
  Ionicons,
  AntDesign,
  EvilIcons,
  Octicons,
  Entypo,
} from "@expo/vector-icons";

import { Divider } from "react-native-elements";
import { FlatGrid } from "react-native-super-grid";

import ViewCart from "../components/ViewCart";
import { SafeAreaProvider } from "react-native-safe-area-context";
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
const im = [
  "https://source.unsplash.com/1024x768/?nature",
  "https://source.unsplash.com/1024x768/?water",
  "https://source.unsplash.com/1024x768/?tree",
];

const images1 = [
  { name: "TURQUOISE", code: "#1abc9c" },
  { name: "EMERALD", code: "#2ecc71" },
  { name: "PETER RIVER", code: "#3498db" },
  { name: "AMETHYST", code: "#9b59b6" },
  { name: "WET ASPHALT", code: "#34495e" },
  { name: "GREEN SEA", code: "#16a085" },
  { name: "NEPHRITIS", code: "#27ae60" },
  { name: "BELIZE HOLE", code: "#2980b9" },
  { name: "WISTERIA", code: "#8e44ad" },
  { name: "MIDNIGHT BLUE", code: "#2c3e50" },
  { name: "SUN FLOWER", code: "#f1c40f" },
  { name: "CARROT", code: "#e67e22" },
  { name: "ALIZARIN", code: "#e74c3c" },
  { name: "CLOUDS", code: "#ecf0f1" },
  { name: "CONCRETE", code: "#95a5a6" },
  { name: "ORANGE", code: "#f39c12" },
  { name: "PUMPKIN", code: "#d35400" },
  { name: "POMEGRANATE", code: "#c0392b" },
  { name: "SILVER", code: "#bdc3c7" },
  { name: "ASBESTOS", code: "#7f8c8d" },
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
const picsumImages = new Array(11).fill("http://placeimg.com/640/360/any");
function renderItem({ item }) {
  return <Image source={{ uri: item }} style={{ height: 100 }} />;
}
export default function RestaurantDetails({ route, navigation }) {
  const [active, setActive] = useState(0);
  const [ind, setInd] = useState(0);
  const [foods, setfoods] = useState(food_array);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [select, setSelect] = useState([]);
  const [itemPrice, setItemPrice] = useState(1);
  const [price, setPrice] = useState(1);
  const [quantity, setQuantity] = useState(1);
    const [images, setImages] = React.useState(picsumImages);

  const [modalVisible2, setModalVisible2] = useState(false);

  const [query, setQuery] = useState("Main Dishes");

  useEffect(() => {
    let items = Array.apply(null, Array(60)).map((v, i) => {
      return {
        id: i,
        src: "https://unsplash.it/400/400?image=" + (i + 1),
      };
    });
    // setDataSource(items);
  }, []);
  useEffect(() => {
    search(query);
  }, [query]);
  useEffect(() => {}, [quantity]);
  const decreasePrice = () => {
    if (quantity > 1) {
      let price_update = quantity - 1;
      let total_price = Number(select?.price.replace("ksh", ""));
      setQuantity(price_update);
      let _total_price = total_price * price_update + " ksh";
      setPrice(_total_price);
      // setPrice(select?.price * price_update);
    } else {
    }
  };

  const increasePrice = () => {
    let price_update = quantity + 1;
    let total_price = Number(select?.price.replace("ksh", ""));
    console.log("total", total_price);
    setQuantity(price_update);
    let _total_price = total_price * price_update + " ksh";
    setPrice(_total_price);
  };
  const search = (query) => {
    console.log(query);
    let resti = food_array.filter((food) => food.category === query);
    let result = resti;
    setQuery(query);
    setfoods(result);
  };

  const offset = useRef(new Animated.Value(0)).current;

  const dispatch = useDispatch();
  const selectItem = (item, checkboxValue) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        item,
        //  restaurantName: restaurantName,
        restaurantName: route.params.name,
        // checkboxValue: checkboxValue,
        quantity: 1,
      },
    });
  };
  const cartItems = useSelector(
    (state) => state.cartReducer.selectedItems.items
  );

  const isFoodInCart = (food, cartItems) => {
    return Boolean(cartItems.find((item) => item.item.title === food.title));
  };
  const ModalContent = () => {
    const food_category = [
      {
        id: 0,
        image: require("../assets/images/deals.png"),
        text: "Vegan",
        category: "Groceries",
      },
      {
        id: 1,
        image: require("../assets/images/fast-food.png"),
        text: "Vegetable",
        category: "African",
      },
      {
        id: 2,
        image: require("../assets/images/soft-drink.png"),
        text: "Lentice",
        category: "American",
      },
      {
        id: 3,
        image: require("../assets/images/coffee.png"),
        text: "Serves two",
        category: "African",
      },
    ];
    return (
      <View style={styles.modalContainer}>
        <View style={styles.modalCheckout2Container}>
          <ScrollView>
            <>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  // padding: 20,
                  paddingBottom: 20,
                  paddingTop: 20,
                  // borderBottomWidth: 1,
                  borderBottomColor: "999",
                }}
              >
                <></>
                <Text style={{ fontWeight: "600", fontSize: 16 }}>
                  {select?.title}
                </Text>
                <Text style={{ fontWeight: "600", fontSize: 16 }}>
                  {" "}
                  {select?.price}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  // padding: 20,
                  paddingBottom: 20,
                  // borderBottomWidth: 1,
                  borderBottomColor: "999",
                }}
              >
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {food_category.map((item, index) => (
                    <View
                      onPress={() => console.log("here")}
                      key={index}
                      style={{
                        // alignItems: "center",
                        // marginRight: 30,
                        marginHorizontal: 0,
                        // marginTop: 20,
                        paddingHorizontal: 2,
                        marginBottom: 5,
                      }}
                    >
                      <TouchableOpacity
                        style={styles.activeCategory}
                        onPress={() => {
                          setActive(item.id);
                          search(item.text);
                        }}
                      >
                        <Text style={styles.activeTextCategory}>
                          {item.text}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
              </View>
              <View>
                <Text style={{ opacity: 0.7, fontSize: 16 }}>
                  Ethiopian platter is a very healthy vegan platter with
                  lentils, vegetables, and fermented flatbread Injera. The
                  platter is rich in fiber, gluten-free, and a combination of
                  complex flavors. Moreover, this recipe has 7 different side
                  dishes with different vegetables and lentils. Some recipes
                  call for an Ethiopian spice blend called Berbere or with
                  simple spices.
                </Text>
              </View>
              <View
                style={
                  {
                    // padding: 20,
                    // paddingBottom: 20,
                    // paddingTop: 20,
                  }
                }
              ></View>
            </>
          </ScrollView>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              paddingHorizontal: 10,
              // padding: 3,
            }}
          >
            <TouchableOpacity
              style={{
                marginTop: 20,

                backgroundColor: "white",
                borderColor: "gray",
                border: "1px solid gray",
                alignItems: "center",
                padding: 13,
                borderRadius: 8,
                width: 180,
                borderWidth: 1,
                marginRight: 15,
                // borderBottomWidth:{(title=="Deliver option") ? 0: 1}
                // borderBottomWidth: 1,
                borderColor: "#616161",

                position: "relative",
              }}
            >
              <View
                spacing={6}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 10,
                }}
              >
                <AntDesign
                  style={{
                    paddingLeft: 10,
                  }}
                  name="minus"
                  onPress={() => decreasePrice()}
                  size={30}
                  color="black"
                />
                <Text
                  style={{
                    fontWeight: "600",
                    fontSize: 20,
                    paddingRight: 20,
                    paddingLeft: 20,
                  }}
                >
                  {" "}
                  {quantity}
                </Text>

                <Ionicons
                  style={{
                    paddingRight: 10,
                  }}
                  onPress={() => {
                    // updateItem(select);
                    increasePrice();
                  }}
                  name="add"
                  size={30}
                  color="black"
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginTop: 20,
                backgroundColor: "green",
                alignItems: "center",
                padding: 15,
                paddingLeft: 10,
                borderRadius: 8,
                width: 200,
                position: "relative",
              }}
              onPress={() => {
                // setModalVisible1(true);
                isFoodInCart(select, cartItems)
                  ? console.log("here")
                  : selectItem(select, ind);
                setModalVisible(false);
              }}
            >
              {/* <Text style={{ color: "white", fontSize: 20 }}> Checkout</Text> */}
              <Text style={{ color: "white", fontSize: 20 }}>
                {select?.price ? "Add ( " + price + " )" : ""}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  const ModalContent2 = () => {
    const food_category = [
      {
        id: 0,
        image: require("../assets/images/deals.png"),
        text: "Vegan",
        category: "Groceries",
      },
      {
        id: 1,
        image: require("../assets/images/fast-food.png"),
        text: "Vegetable",
        category: "African",
      },
      {
        id: 2,
        image: require("../assets/images/soft-drink.png"),
        text: "Lentice",
        category: "American",
      },
      {
        id: 3,
        image: require("../assets/images/coffee.png"),
        text: "Serves two",
        category: "African",
      },
    ];
    return (
      <View style={styles.modalContainer}>
        <View style={styles.modalCheckoutContainer}>
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
            <RestaurantDescription2
              images={images}
              // dataSource={dataSource}
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
              <Text
                style={{
                  // fontWeight: "600",
                  fontSize: 20,
                  // paddingRight: 20,
                  // paddingLeft: 20,
                }}
              >
                Imprint
              </Text>
              <Text
                style={{
                  // fontWeight: "600",
                  fontSize: 20,
                  // paddingRight: 20,
                  // paddingLeft: 20,
                }}
              >
                Tribeearth Vegan Restaurant
              </Text>
              <Text
                style={{
                  // fontWeight: "600",
                  fontSize: 20,
                  // paddingRight: 20,
                  // paddingLeft: 20,
                }}
              >
                Diani Beach Road 
              </Text>
              <Text
                style={{
                  // fontWeight: "600",
                  fontSize: 20,
                  // paddingRight: 20,
                  // paddingLeft: 20,
                }}
              >
                Ukunda
              </Text>
              <Text
                style={{
                  // fontWeight: "600",
                  fontSize: 20,
                  // paddingRight: 20,
                  // paddingLeft: 20,
                }}
              >
                Kenia
              </Text>
              <Text
                style={{
                  // fontWeight: "600",
                  fontSize: 20,
                  // paddingRight: 20,
                  // paddingLeft: 20,
                }}
              >
                Libosso Müller
              </Text>
              <Text
                style={{
                  // fontWeight: "600",
                  fontSize: 20,
                  // paddingRight: 20,
                  // paddingLeft: 20,
                }}
              >
                restaurant@tribeearth.com
              </Text>
              <Text
                style={{
                  // fontWeight: "600",
                  fontSize: 20,
                  // paddingRight: 20,
                  // paddingLeft: 20,
                }}
              >
                +1 123 456 798
              </Text>
              <Text
                style={{
                  // fontWeight: "600",
                  fontSize: 20,
                  marginBottom: 20,
                  // paddingRight: 20,
                  // paddingLeft: 20,
                }}
              >
                Tax-ID
              </Text>

              <Text
                style={{
                  // fontWeight: "600",
                  fontSize: 20,
                  // paddingRight: 20,
                  // paddingLeft: 20,
                }}
              >
                We are neither willing nor obliged to participate in a dispute
                resolution procedure before a consumer arbitration board
              </Text>
            </View>

            <View
              style={{ alignItems: "center", marginRight: 30, marginTop: 10 }}
            >
              <Text
                style={{
                  // fontSize: 20,
                  zIndex: 10,
                  // fontWeight: "600",
                  marginTop: 0,
                  marginBottom: 0,
                  marginHorizontal: 10,
                }}
              ></Text>
            </View>
          </ScrollView>
        </View>
      </View>
    );
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
          <RestaurantDescription
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
        </ScrollView>
        <Modal
          animationType="slide"
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          {ModalContent()}
        </Modal>
        <Modal
          animationType="slide"
          visible={modalVisible1}
          transparent={true}
          onRequestClose={() => setModalVisible1(false)}
        >
          {ModalContent2()}
        </Modal>

        <View style={styles.action}>
          <ViewCart
            ind={ind}
            setModalVisible2={setModalVisible2}
            isFoodInCart={isFoodInCart}
            selectItem={selectItem}
            cartItems={cartItems}
            modalVisible2={modalVisible2}
            setSelect={setSelect}
            select={select}
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
    {/* view to handle modal  start */}
    <TouchableOpacity
      activeOpacity={1}
      // style={{
      //   marginBottom: 10,
      //   borderTopRightRadius: 20,
      //   borderTopLeftRadius: 20,
      // }}
      onPress={() => props.setModalVisible1(true)}
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
const RestaurantDescription2 = (props) => (
  <>
    <Text
      style={{
        marginTop: 3,
        marginBottom: 20,
        marginHorizontal: 15,
        fontWeight: "700",
        fontSize: 15.5,
      }}
    >
      100% Vegan - Female-Leaded
    </Text>
    <View
      spacing={6}
      style={{
        flexDirection: "row",
        alignSelf: "stretch",
        borderBottomColor: "gray",
        borderBottomWidth: 1,
      }}
    >
      <View
        spacing={6}
        style={{
          flexDirection: "row",
          // alignSelf: "stretch",

          justifyContent: "space-between",
          marginHorizontal: 15,
          // paddingHorizontal: 10,
          paddingBottom: 15,
          alignItems: "center",
          // borderBottomColor: "gray",
          // borderBottomWidth: 1,
        }}
      >
        <Entypo
          name="location-pin"
          // onPress={() => decreasePrice()}
          size={30}
          color="black"
        />
        <Text
          style={{
            fontWeight: "600",
            fontSize: 20,
            paddingRight: 20,
            paddingLeft: 20,
          }}
        >
          Diani Beach Road. Ukunda
        </Text>
      </View>
    </View>
    <View
      spacing={6}
      style={{
        flexDirection: "row",
        alignSelf: "stretch",
        borderBottomColor: "gray",
        borderBottomWidth: 1,
      }}
    >
      <View
        spacing={6}
        style={{
          flexDirection: "row",

          justifyContent: "space-between",
          marginHorizontal: 15,
          // paddingHorizontal: 10,
          paddingTop: 15,
          paddingBottom: 15,
          alignItems: "center",
          // borderBottomColor: "gray",
          // borderBottomWidth: 1,
        }}
      >
        <Octicons name="stopwatch" size={30} color="black" />
        <Text
          style={{
            fontWeight: "600",
            fontSize: 20,
            paddingRight: 20,
            paddingLeft: 20,
          }}
        >
          Open till 8:00 pm
        </Text>
      </View>
    </View>
    <View
      style={{
        flexDirection: "row",
        alignSelf: "stretch",
        borderBottomColor: "gray",
        borderBottomWidth: 1,
        marginBottom: 15,
      }}
    >
      <View
        spacing={6}
        style={{
          flexDirection: "row",

          justifyContent: "space-between",
          marginHorizontal: 15,
          // paddingHorizontal: 10,
          paddingBottom: 15,
          paddingTop: 15,
          alignItems: "center",
          // borderBottomColor: "gray",
          // borderBottomWidth: 1,
        }}
      >
        <Entypo name="star-outlined" size={30} color="black" />
        <Text
          style={{
            fontWeight: "600",
            fontSize: 20,
            paddingRight: 20,
            paddingLeft: 20,
          }}
        >
          4.6(32 Ratings)
        </Text>
      </View>
    </View>
    {/* view to handle modal  start */}
    <ScrollView nestedScrollEnabled={true} style={{ width: "100%" }}>
      <View>
        <ScrollView horizontal={true} style={{ width: "100%" }}>
          <FlatGrid
            itemDimension={130}
            data={[
              "data:image/jpeg;base64,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",
              "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoGBxQUExYUFBQXFhYXGB0ZGRkZGCMhGRwdHR0dIRoZHRkcICoiGR0nHRwhJDUkJysuMTExISE2OzYwOiowMS4BCwsLDw4PHBERHTIoIScwMDAwMDAwMDAwMDgwMDIwMDA1MDAwMDAwMDAwMjAwMDgwMDAwMDAwMDAwMDAyMDAwMP/AABEIALcBEwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAGAAIDBAUBB//EAEkQAAIBAgQDBQQHBAgFAgcAAAECEQMhAAQSMQVBUQYTImFxMoGRoSNCUrHB0fAUYpLhBxUWM0NTcvEkgqKjsmPSNDVUZHOzwv/EABoBAAIDAQEAAAAAAAAAAAAAAAIDAAEEBQb/xAAuEQACAgEDAwIEBgMBAAAAAAAAAQIRAxIhMQRBURNhFCJx8DKBkaGx8ULB0QX/2gAMAwEAAhEDEQA/APWcLCwsQgsLCx3EIRktNgsepn7sVeI8Q7kEtoFrDVc+QG+M7tH2hSjIUO7rbSsxJ5eG5PlOALivEa9bU9V1poRGlTLExZWZbCOekzykTipS0obDHqNzjXbd2Ommqwu5Mqt9tUn1t8sDfE+IVD3SBgXrudKAtFvDsSTdtR9BJxmZRqlSk8FVII1EiEVVBLGYjcptc+uLXF6Zpp3dIS60kpmpeZqAkgD6tmqN70veyd5Pcd8sVsLO59adOvWTxNrWgv2ACCbD6xCooJPM/Gr2fD5ilXUl2qhGq0m6MKtExqPOFJFoEtjU4X2d15ajSaw1moZI9okqZ/g/nbBPwTs+6MYptp0slxFypAkH978Pfohia3ESy9kY1Dgmqp3lvEfo1UezTAHh3NgFgnnFuWNvJcEadMimzk6ZWSsDxW+0THuIxs8J4ZCBhUhhKuygHaZQT0JNxzFgJjF2hSp0xIPjZmEzJLAEkE82CgiT6+WGJRjtEW7luyjQyFRQLrTpJMyJZr7kzsZJkRtietSpK4IWGPh8mBIERsYK7RPO/NZ2n3qprJU6l1ANuSdm5nwA2B6gjEWYy9NW8RZwskK/2pgMoAtL8yPMGMXyQZlc4VAUsshaZOo3UkNZjPIgddwL81RztQvpWmshbJqEWn63SCALGZO0YdkKtIsaa0QKVQQHCwHGkMovdgUtHQNhpySGpSYLpKKdRKkLYJqY3sYUgX3vynF7EFTqVA695QVnDwzlYUCW9knf2gbdWNyIw7idSoqqy0lqlrQNhKmSxI8I0nf32GIznVD1rNqXUVqONUbnQgub6ek7jFtuMU9NVSDKgFw0bEhVY+REe7bnib+CEASki3gLWY6npyCS0mWa9xtvc7bkYrZfNeJ0VSVAQtpWzHSVME+yoC+GDeLec65RafiJDBqi1ACREgm25khKax5gkdMZVdUp16vdW72m1NwNl7tiye0RfVUI9xPli0iFan2jp03/AGZqbsyBl1hiT4I9prEgyBPJtxvF4lnVX06yFDgSYddIEsLqrlWG17g+t2oneBSEXvQQzQoB1hBqsb6XU6Lge0L4bWzVUBWo0wQyjwvKgXMnYSbkemmOuKRZWbvalSIakrKKmkmJfUdYVg0DUL8wZvpN8aFfIFkibbhVHhYG4Gk3Anfc8hyjGzdKu1SpocLoeAo8TH7QGr6wLargyCwsbizkkYt3gqPpcxDrZG3YFRZRBFjAJHKRN78kG8PylNBUhTDAE+GNd5s4jVBGoSJt0EBV+5qCmy1mBm7QSyuuoEaSJjTKzHnzJFriTd44RDUclVBUDTBRgxYsQDMi48tjcYq5eszNXoIndMPGhZZZjY6RyPiIg7bb6icXbKJ8rwVNf0dRQfDBUkNBILpYkTYRE85xn5bhFVGZHprcn6Qv418UyonVexANhMciTqU6JVNTHvmVoA0aQEOnRHtGBG8zuSfDjmbNYWFTQbldelidKydBnfkwI5cvaxVssS5Zu7NVahNyrqAW1X6NcQZ385knEearNWp05K94BBMw8wJUpAHiWxHXuyMJMvVOuqrv42WqDT2IGkXW8FtN7RYzEXlpZ+lOmsF1LcsIDAkx4QDIBDcjN55xgZRTTJF1uC/EEBM74xM9R8LDYe/8Mb/EUAYgbC2Mfiq2Nr48+lTOo3aA1ssDUMz4d8atKjAXqAZB5SeQ9BiChStUncn+eL9NyFBHtHck74dN7UKityX0AwsM0+WOYTsNPeMLCxT4nxFKKmWUNFgT15kdMdo5VFivmFQSxAHnga4/2xWmNNEy/UCwE7yZE+UHA7xntCSx1eN/ko5khj4RB5+1NlvgZyWdOYqFmOnQwE8tRkKANiAJYDaQLb4CU96Q6GNcyNLMZxm1ux0pq02jVUckjQLbagdoBAPQjA9n6hqxqYpRU6Ub6xjfQDud7mOU3wRim1ZKaUlYkqwp0gbnWFGs8yEpEHneqZvjW4L/AEdKktWNzcAxbcQAICjnt8bxFjcnuFLJSoHuBZD9oNGm1J0oA64n2iXK6nbdyVQeQBO+2CL+rDYgh2dmcrYszPMDTIIUKnn9aOWN7LcBy4ZndidChSJKqFE7rNwdMwQevTGjlWo01ijTGq24PX7TfrbyxojGMeEIk3LkyeD5Kg9mqtVekDrQABVJLGCYHU2m0eWN+qulVCgCCZBFtoHiJteL8723iH9osdKQRawtJEyx5AT57k88Vqb1AQX21ABm3INoHIEbEEC5sTBOI7ZSRZNAKPCskHwqLALq8WmTEwd/utjL4jxR1olmdVcKY0+LSgcybDSWVQpHUyOox1572WrMLAKRt4mAglpAuFgCPrHkcRZuhQkq4L6nZ1UeyxIFQA3sJBm0n5YtLyQ7knooXZFYwFKQdUqSCLAnSdRJkzz2gDEuY4p3bA1VmW0QDLSYmYsFhZk36DaLeVIDMSmjqQQBBXWSvLkBEDY9cUcuAHJpk69IV9QGpyrFpkiASoYi++0CDi+SE71UIY0xU0SsQIMIqmVtIsyjziI5mds8RqUqYX2ovHtrE/Wk2JHMRzxWWm7rGtqZl0kQWOoj2uQhpiBtEHY4qp3VRIqHx6WLLqgK61TqWeSlngDzG04lFnM5l2eoqmkFSoRd9yQW0rpVgdwGIJuS8zbF3P5JqlLUugs2nWy+EMJOhdJ6GGv1tMxjKXiwqeEeFaTRTZiTrJVzqkkmAyjf388d4bxqpXU0yppE09ZANgHqXAYSfZbcAQNMc4jfBEmSUoKtbuxoaE1S+pdaiCRBh9UEbys88XsulNaqUyhKsupmb2VZ4KpMzJbUQIiDAxSRabiNZ76HgEXSSaqweekEk+pHPFbL8RqF1UsQO7qaCyxJoGkV1apPiUGTy1T1xbZEjQXNMxPfIaXiTQ83UlbXHtCYgN1mBoIFc8ZZmK6SyNUKXAIks2ki0FiY32mIInFWt2qp0jTDIKiVGfUSJCFSHVtJEaStWLX288ZfDu2ba6mqnTanBJQWZQwUHUQOm0QRqPLZMssI8sZGEn2NDPZwVCO4R++BJEWZdM2IM3gkRsdEjHeCZfO6V1kVFaHI1w12JvEFWCgbkiVa8jArxn+kxFqFVpsHWpTL1IHj0ag2qGkymkdfa64yeKf0nZwtFqfteJdyrGxEWNpNyb7YJ5U+AdLR6Ur1qVLvVzCCGRn1AWAVfhrO7TzXYWGbxim5rsX1GVHd6TBRypamoInUCwcG5gKt4x5MOL1DNNajlSFU+Ix4LqN9l5DGnX47mKoAeoSFuAdhEiB0EGI6YV8Qo8oL09Xc9XocdpVO9bSWQByQxKk6IYBfsuuoyLGG5xAfmKFRT3iVQaKjvCCIIKkEFjMA6ba5gbkEazjyVeKN9bVPMhzv/tO/XEmU46aOpqT1KbWhSdQbSfCCCNoMEcxI2tgV1PsE8fhnrdSmWqBqdd9CyxTSBUhwpIB66lEDnJjaDoNmR3QkJWdQAfCFciANRBIlDpYkgnbYwQPJP7XkkDWVQrGkE6VgtpQDkoJBAPQE4vDta2lS0sadTUNLSYDWWSLgWPmAOZOC9eLB9JhbxzL6ajqRz5c5vud98Yudpg2ubfni5w3iHfZdKpLHVquxDGxMXWxEWHkBirxAn08zt/PHHyP53XlnQj+BGLVy4CsSI5YiocgNj+t+uJVpG5Zhfzn/AGwuGGWChZJMD1nzxHugUb/DuGsaanu6ZmdyZ3O+O4L+F5OqKSBluBe+FgdEvcv1EWu0HG6dFGUvDERM6Qvnqt8BJwBZzjCN7SuWgx4tJJESztuqgQTYMZEwSAcHiOcq6jWqTVrGwAiKYI31MdAc7A33kBouzLcPrVQoVT47kgHxQbCnN+6UyQ5I1OSxO2OzplPsYE1Ep8azZenopiS9SJA3CkaiANhrIUWuVqbk4I8h2ZYLSoBSzATWI9rU4mooP1WCRSncRU2nGtwbswctVps0IqgKiqA1SF2uDI1uSxg7E7STgvowaUgaAs35mfachNjqJ8wQZ5jDFBLkFzbB3KVDQqUfoqgEF3KpCwZZy7mSEBAAAgeuN8MKwGplZu7OhBcqGEEuJF7bmw23uZ8plBHiuoMgsxYkkWESfCC1vL44jbLaSxplEDFR4V8RAB3JhQLmBz9+DtAEOWyqyUpsoNgZUEAwZKwfo5vymQTaMW8ugKmCG17kDw2mYMzvvPX1xDmKzKVNE00UEhydgDIDdCSVv6+RxUpZsGkklryBUUQo1k8jc3KiPQ7bzdllvOUiIBdmI0yqsQvtCBA3mNz7t8WGqklQzU4YGZP1hFh5CDJ5z8RdqqkmktasrFNdMOIYidUu5BiCGi2x6Yu1+F1NHdoNM/Ry5LOZgagwNpCz63sZBtIjNbNZJGIdgWC6SBaNQckMBsTYCfT3Uck+XpBvFJClm1eKUaAeVluLxF288R5Z6eX1K9QRTphBUZvbkvPh56RpHQycDnGO1qjT3dOdYWkWcdWAgARaR05nrgJZIx5YUccpcBhVWnOpqgWGkQ0IQAhhhyBUCxJsfLFTM8W9lxUpqg8JCwTBlSV5iPCZ56T6YAm7S12UrUYPIqRKgR3TAWI8zaZiTiCtm6lQIjRCd0AAObHU9+c4zZOrUapWaIdM3yFFLta3dvOkwCUNpIBXTuSdVrgi978sZ2Z7XKzEfs6tLGe8gmLaoAFiVAmb8/LGM0iizbGU92qsRHz+WKiUh3xJ5Vao/wC0MI+Mm0625G/DwVBL2c41SZ9eYhadNVIAOoGRpabSfCvKASSfTby3G8kKoZAS1RFElfCpQTMn6phbjczy28zy6/Q3+xk/m7z9+NXs9RJjybMbxFpGx33wcupnFb71/YKwRk/H9mvxPtvUpVguXoB0hRqNQCdClQTPLSee+kdbYvGuMZjMlKlRe7VFfUgIMrUQq8MDDAgNZgCAdyb4dlqYYohAItO9tRVQBzvBEeZwnQ6KaxawY+hePjfCZ9XJ7DI9PFbgzxgZ1zLtGikqHS0SEAkmDdpO+NnsvwplaoGsr0qcOSJJAjSB11Lv+6cXs4hDnQfEFs0cyEg388XcrVUIKoE6EYx6FmUHzInCsnUSlCg4YYxlYIcY4OatYsqiDAYkx4trgbi0+44kXsy8CdGm8X6bjbbBCuXBkjcDWfcak/hiyae4AFtXw7xl+4zgX1EqSL9GNtgTmeCuoP0ZSIvsRq9n1kAnHKGUqlA5SwYJII3IJtfoMFXF0IWsLQFpnb/1IUfD9XxXyFctRcaRaorbWGq/3mB5YYs8tNgelG6MZeH1PsEbcxzBYc+in4Yq5jh9QMw0NKgsZ6Dcgmx92DE5myjSniRG9m96VRuvVYHlI54ucYpnugxgwtZb/uTA+WAWeSa2L9GLXJ5+uQcMysviWNQ6TEGxvuMSnJVQWULFm1AwbL7Vul8E7ZkCtVpd3ThEVwxWWMlBpJm4hpiOmO53MQ1UhEslc7fYZVUH1m/W2D9WV8FelHyaPYAxlCkAaKzDf7SqfvONTO5eVg4y/wCjw/RVQbHVYRyQlSfWRf3Y3c3Gn3/njNkdzYcVUaBXMcMs078umK/CKZ6mQev44184RFzE/f0xVy1NRMfd8sEnaBrc9O4LwSkaFMkMSVkksZJO/PCw7g3FEWjTVqqSFg3GFjTHTS2M7U7ATs92DJcV8we8cIrBW3n2neCAIJMCL6TEC2DDL0qA8SJK3Y2Ah+agGOYI2N5mbYi/ryUIzFMrMjUdijFhOogXjy2v1Ag4p2jyagVDWSoF1XQgmQNlGwaI8xPvx1XKvYyKLNBM0uknVcqWgAs5FxtEHcR772M1sjxFpZmpPCgqog6ng+EEGNw68zEchgeTtwqhVpK7imI1WhV02ksbtPWPfF87M/0gZhyWCKq6dIv7IJBk8otHn78A80F3GLFN9g0y9N4ermKwpCFHdgjSoAsI87zF4AE2xVz2doop0urqhFRVqOe8YzGsNIAXSrEC/M8ox5nm+N1WqLT712a8SfCBFyI25Ae7aMPFKqzRUqKwCwpgyBpMbtFgMKl1cVvQyPTth/me1vD5hhqdzqO+mYkk6oXSLb9eWKv9rjpIaiwEgsysFUlQFDMefiCyJ5RBjABW4ErjxF2YDr+XmTjSy3CqYU0ws0x4tBJKljCg6SYBg4RLrK4+/wBxsem8hDxb+kLLUykIKlQU0ViLQBBCgxAM3+PI4xqvb7iVUEKn0bAkEJDATCwdh6nCpcNpqH0oqSttIA2byHKcT5SiAKa7Du/vdo+S4VPrW1sHHpUuTByuQzTOtSs5jUJUtJOkLv18Mc+WNXPUADl6a7GurXMm6gn5g4080IUxvpePXu4HukYoZ+sgzFCDYOxN+So4E/HCFklN2/A7QoIzq4+iYj/JzTDrL1DBxfWl9MR/9xTT000NX34o8PrrUVEaYOWWY38dR2Ij0GLa5xTWDWvmaj7chQKj54Jp7p+//SlJbP6DsquvL2kmMufjWYk/LD6FL6ZyOVat8qQnEPBuJgUhcf8Aw+WBtzLvOLOWzy98+13zB/7a4HS02vvgvUqRjinFKP8A08hPvZsaXZ8XSOT5tvcGGKebzKd2206Mj15M88+WL3CailDpsQubNjt9IgwzL+B/fYXDn78kiZaKisB4ddJfQisY+UYfUACLqm5DejDvfxw7K1gXK81em8z1rVDH8KDFmtTFQKF5rTI9T3gb7pxkkPRl8QQ6jbdkP/StvmMSZalFJx5NHoacj78T5gFn5+LSZ91HVf347w9QUAO7I2560lj5HEb2J3KeoqsblwVt598bT/pGNFCZUxcNv/qqrihmWHddGQtp82ArW+BxqMsFwPqktv8AZ7o/ecVLsWu5l8Qp+BxHtUaZv+7USfmTihwFfoq4/epf/sjG3xSnGq8xlqx/hZSMUuD0dK1YEzf3JWH4HDo/hFt/MRukLTY/5NID1NGsMaudph6SjnrrCOUFWvHrhi5BmFMC30VPfaQldfxGNqlk1VAWv49V9vEsH1Fz88BLktMEcxkSczVMHS9CmJ99Pn7sLN0IasDO1X/qrA4IeIU21GwCBSq8p0sNUTeNuWMnidu9B3ePdFZp+7B29vyBXcd2RlKioL66VRve1QN8r4Is3TYLtcT+pxh9mU/4qgOmUk+pufvGNriPQmf154XPmy0YmeRjcjbYT88NyQA+qDBm839Yi2LWcS08sRcNq6XHQMDg48Avk9E4NrNGmWpKpK7AEAdLTa2Fi5lM4uhfENsLGlRjXP8ABmbl4/k8g4uBTIOazHfPpE0dQ0qRpgEAwBAI0/zxk53PVK5NRyaagQFAEHoBaw8/LEtSndu9PeVDshAZkY7GBB9w264p1Mis3JFWbICWWOe5MxzvAwtb7yds08bLgjoqLqWC07MfFBmCBHQ235YeXZlAUlF+qJBLfvSbt/qJxJnMoxqhFvIElvZAB3MfLE2ZcU9SrL1CJZuvQAidC/q2IpWkXJU2V8jlIrAiL+1G0hl57E33xuPQjl9r4CFH3nFHg6FqaMYBPQ2m5+7TfGpWJJaOWn4mfynAZJOwoLYjo05jz1j32j5knFrLASTGxAjyv+AwygAFjnoZh66h+GLVNIO3Ij3wfzwlsNEdUDTPMysD96CPvxNRojwnzRD1tJHuuccKCR0J7z5aY+KnHKtTSrGJh6cecBJ+84Flo1eBcOSrX7uoupCrGLjaeYvzGLGa7NZLv1pHJV9XiKMKnhKgqrv/AH0hRrG4m+2LXZGn/wAQT0Rh81/PGxxBozaH7OUrH4vR/LHQ6WCeO35MPUTanQHUeE8MppTrfs2YppUSKblyQyhGYCBVMHTqN4x2p2f4aqCo1HMJTl2VyzaSQrM0HUdwrROFnlrHKZenUNPRTy9GomlSGbWVo6SSxFhUkkbkjbHeJ5it+x5daioKb06hplWJdm7iqVDggBAVLGRquAOc4e4oWpMtZLsNk2BQUszTXSt3MCKZlRN73nCXsPkhocHME1A7LpMmGChiQFMcsEj5qqadQVKBpeGAdatJbwgeG+5xXp5nutBCahRSuCJg6UqKJ87AYFxSYqWWSBit/R/kXAHe5vxBIhZkJJWPojMTfDsv2CyiopTM5kLUZ6YPguzPLD+7t4k+WC/LUyjZZWiQtSYNpgHf34wcpmWNPKr3LBf2kxUlNJ8VW0BtXywWm+S4Tk+QA7U5iplM1UoJUDgMhD1YDSU1xA0gyzx6Yyh2izgITTRYLpXUoJEANf2v3zvF4xa/pZoh8/XIfxr3QVNv8NZaZ/X3j1XiOZNPuoQLp0mAJI1Frnfc+8epwt40+EvzD9SflmxX7R5gM41UiE9lgFAMhbEM40+wLyYvvM4ZV7Rvfu3pIVX6xBlh4fCVPslfFcWNsCtXLubsCT6/njlPLMfLB+jDYr1J+WEP9qqgKy6RMtoQy3UeIAC/nyGL1PtbWdnAbUpMhtAXcKG3kmyz09Jxq5TsXlqWR79jTqVmSQ1RwKQJ+yZVXMbRr8VsC+XW4G34YGWPG+xIzm+4VUc67prZvF3b3AAkM9xHIGPuw41XpF1Dt/iJy2lTJt6Yr8NTZSZUIy6wOUOwABj9DGhxZYLCBOqp86QYfPGK99jeqas4vFKlO5PsKT5+F2Xry1Yee0DtTKEsxMQ15BBdTE7Cwt5nbFDPSC4PNag+IpthChp2m0H/AKlt8Sfji+xO5JW7S1X0zcECSZ3JMtE7kpJ9cVc1xN6qF7DU5EQZEI1TeerEYWWUagAJmF+FU/gcNyFAaCrGIqaY8+5f8gMFtuDRudjqxbPAE27pkAiLKlPSY63xu8YpMVlLlZkTBI8jHXA32IP/AB9OREqw/wC1SO2DLM0xf0wjLtpaCjywfAKodagmdgZtyvaTiplt9v16Y081TnaI8vnihlkhoHXBw3QMuT0PhtEd0mmY0iJ/3OFiHI5eqEUd4bDCwf5C9/ICUOxMVECs4dnYVAd+7JUDUwNpubek7Yi412Sei1QUqhWkqyxvqlYIXUBADdJ9cej5zMVFqqVT6NiJYRAMH2gDPW8YocezC9zmGCDSaZUta5PhAEnqYm+KlOnV734+9hMcjbPMc8jCp4FYkqq6lEst2IgczbpjMzDqNQWUBvJlWYzfUw5E9MG/ZNkarWLkAHu9JJsGBcmenhwR0Mxl64UGnSZVMEM0mCYEA2iYtflbC1mUGosPNmqTR55wxTppkx4pi88gN9z640axUsY5uPgojDc5w2scw4oCmKNN3QAzII5LCxAYwPIDFqlwSsZBPQ9dhHQYqVc2aISuKaOU0imoO4sfSFJH/TiVIDHr4D/4g/IHFv8AqtzcmSTPsDmIP1umHpwQwTeSBJ0nlt9a0YW2u4yyllKf0dIkf4Yn1Vm/HDuLUgpCzvUMepM/cMWm4bUUAApabEG0mT9bmTjr5GrNxSM/u/mZxLT7lXRq8D4hSpVHq1GCLpIJv1SLAYkz3aDLNWaoKyAHLPSWVcHWzea7WF8DPEcs1Mp3lKlDMBIXYW6iZvyBvjSy/BaegAAlQBBLG/mb7404+qeOOmhGTCpvUx3Es1QqplUpV6RNOnTpuNRFhUoOCLX/ALlo9cUa2e72hlqOqgP2emZYZhTrYUjShRaLsbmNsXk4DSBgKP16j8cN/qOgDdUB5zGD+O9gfh15Nd+1VCqIYpTCurHVmKN9JLQIqGDqUC8b+uH5PimXao5atRVGWoBNamfbKE+y56HA0/CsmGg/s4PmEn78Mq5LKD62W+Kj88RdZb/CBLpE3dhfl+JUZy5atSBRGD/SLY6VHXmQcUcoy9zll1JqXMFmAdSQparBsdvEPjgcSjk2b2suzHfxIWPymcTJlMpIH0IPISs/DSMX8ZX+JI9NX+QK/wBKOWIz9RyAVYKUbqAiq0f8wIwFVc5BI07Hrgz7c06QrBacQBybwgHxQFiBMzIMGTgFzCy7epxpxTU46hU1pdIcc5+6fjiamhxWpUpPvGNDTAHkfwOGugUT5rjDvToo21NSiAfZYpPzGJDpBib9ADPLy88ZlYR3c23tjTq1gWK8gBzvNt4vGFvZbBIJuEMBp1sBIYamsI7uoLk+ov6Ymp11LMCykyLSJhqOn74w/sHWH7OS7in43AJIvZSRJ6dP0SRc7Qm2cp/xr7tsc+T0tpm2CailYKZ5u81AC0uR76KwPiI9cO7mApYxL/dUpwb8o+44LO9RvZzSW6Ov54hfNUtv2umZ61F/PAuVqglzYJM6KWY1FlTVJkif71dvcSfTCymapA1ZdLV1adYgjXVT8B8cE1bNZQTrzVGec1F/QxA9bJsJ/aKRkwNLA392C1Ut0ymm2Y/YXMKc5QAZWM8iD/ggH5rg54ksMTPUfPA3lVoPWotQrK1QVBpAaQY9ofwzjf4yz6iDESNvMYrI7VkimpGbXNpuMU0N52/XTFqoTHT7sVggmbYkCpBJw3Nnu1vUO+yeZ88LFbJ8W0oqzsPs47ggTQpZo0aiqtTU1WNIMwRHhHnexIj065Pa1qhrqjU6iU3A1yfoyV8QKwL3HlcbYwuy3aagEV2djUVtRptOli0SRaEsNhafXBBxbidKpRCIxeKhKmDAXSbDYRcRA5kcroSq4yvnYwYZqU0gd4LkkY1aRBFJqgOsgwpULPi2km0emCKnnctTddBpaQGJbRq6GS31wL2O3wOGdisuP2N5ImprcyDEEsyk3Fojn+WPNM7nXUElgCwbnuCYkSdjynlg1icwc0rk2vLNjtNxysGZ6VQ0tdS6pGmDpBIDAx1wR8OynfBAmZzJeGLeIQLeFTCi9if9sAnF8wWp0S1mLoDI2iNx1EDBT2W44FLu7Qwgk21EeLYk2ABvgs0ZQhGvzDyZJRSp9kVspwnNs+ZRM7VIUqgLu+oSabBlCtAN9PmJxD2Y4VWzFGoamYrAd8NDrVY1CFBDKAW2vM7yOmNrsrmab1c0zAhWZbdBoW9p6WHmMS9kOHmhSIrqik1TVCFvH4kKKXWIEEi33EYH1nGMnJ1x270U8rcOdyPhvBGfRUp5rPNFzSasLwYImBA5+7FfhVLO94rVa9QUVISSqd5WbxFmRWWQljpgEsFmwkgv4eNFGA297CyiADEAdJjYXxFlKlINKjVE+ImTJjU5I2YwPcABYCMs+sqDvd/Rf8Bhmn3YHZrNZ8vTpVDqDMdWkDVTAU7sLKRaYmJEwSMY3HczVWs697UsBADm282nHqOdel3alh9caBpJjnYgW5mbReD1Bu3FCj32pFAZkE6Tr28u8HX7GNPS51KSuPbsall1QZhdmazvmDLkqEexJ31D44r8DYKtUlUJ1geJFbr9oHFjsooGZMSZVvmRyxpdj+E1Fr1KNQ0gcwQoRvE66G7wsVAhDoU2Yqdvf0X3BjIzOH8Zy61an7TQpuseHTRSZ1Xna0RjJ7XZ2lUqg0aS06QHhGgKxkCZjfa3vwfN2aois7iirsKlKuaZWAKWZK01pmTAKOrPb3YFP6U+DGjVpsoAVg1MBRaaWlCxi0uQWj8ZwUIpST/r9CSk9LQK0wOgwSdh6Dd9TkGDqKkizAe1fytge4bklqHQXCmQFIQnUem4wZdlckyVqVNSSQHMwTfSQZvCLJiANxfFZ5JfLe4EG019Qc16Xqg7h29998ZNdm1tpm56czsMXe0Mpmawk+2bepn4X+WOcMezW2M4bHZWVLmiCi0G9jOLi1Zn1gDzPLFOrVDPewmCfQ74ucLp+IGJ0y+8Xi29t9NztfFS4KjyX81QpL3nh8VMXJ2mVnn57RihXpydYIuJ38reuLWezNRlrFqaqamkGLBSixHnOM+hUGgK1jEQZBwCi0gpSQcdlzTOUMeJRVB8Q3LRqEHe847mO5AkU6Y/5B+WJ8tQanT0KJBqgsRspBAA26nf0xk5jOBTcTsQOt9/TGGbeppeS5zWmP0GBSzpUSmVp6XSdOkFgEO2+xmY54G0qiVOkWUG45yb3G+PQeAZtzTbMBfpKVcaVDEqVddJBHImY+GCnjXZnJZlzUqhNaACowqEFYsFfSRGx388bIPagFurR4bxNR3tZpH964jn7Rvje7PsP2QydnaPl+ePTE7G8OqKNIVi51B1ckEqRMNJDXXbyNsDPG+CUaGY0KsiAYIHmL2g7TtsRhk/nVBxlpdmX2Erf8Tlv/zsD76dvvx6LxWoDUrLzUq3xRfxBwF0qSJXytSmoX6VQQoi+og7eTfLBhn0/wCLr32o0W+JrKf/ABGMmaNRftX8mnHK5IoB5Hv6YhffDqI8TGReDbf1vvhtdbGLHCIvcYx6kHCxnT1qD44WCBJ6/DiwNWkiiFhrCIA9phO99wPutDSzavRgbrMt12A+GCCn2CqVNQd4U/VIIIEWUMGiMUe0PARlaWjbUj2mYA08974nw7XzJM5HS45xypyXm/0NvgvCKFfJUstWkk0adgbwApEbiJWP1OHcS7H0m7srS0shTQy0wQioZ0hTcar/ADwQ8KydPuqTAAHu0gqIMQDi/TQgQST6/dbG2PT/AC1L9hz8M8N7XcOarnKdGfE2YAY7CZAJAJNgPM4f/VVQGqhbSqMUU6QZ0bsSQSom0KRuZsDJF2iWkuZq1GIJWoWWIN52vytHoTjMzvFnqVbOsm5H1Z8+p2gcvLGKeRRqK3rYvK46ltexPwvINqeoF1bAELsQLOTuWlfOPDaYxaZaQq6qtNajCNRZmEbkAC4mRJ2iZtiBs2UpHvCxYD6MAgJNrd2oiffBwzKcNq1iNR8MbvOk+QWCSOXuOMb3qVmeWOTZoNWVmOkRMXkknot5JHltYYp5XgwV6lQ16iBhpALElST4mALkMY2MSL743sjwrLoCXquzc5BUeYgXj34vUKOULAKygm0Bh9zTjTi6bqZQ2qvDDW2zMfLhEprT71q1xLVWn1OlYBPS4HrzsZrL5etOukHtAgDUNvEG+qbcreWL3EOz9BYLVnW4MKxBN+gm3pAxPluztGsWenXqqJjT4SBYfbUm+++LXTZ7qEknzVKxyx1G7f13BNOAUKNU1aQqpUIIH0gKidyFJF/PlNsDqcArI006qqyuXVrg9Pjfzx6rX7KqVgPJG2pQPmtxilR7MIXK1O8B3GoKVPWCDf0N8accOpqp1YeOUEvmPKcx2ZzrO7/td3KFvE8kp7BMXlTcY5W7KZupTWlUrhkRmdQwazOZYzu0kk7nc9cewL2PpzPeN6QAMJux1G0O4i4gj7sPrPXYPVh9zy7I9ltNVajlaoCaIh5EWUhgSRC26Y1zw8UatOuqDTTDkqajEktuRqsPh8MHP9j6fKtVHpp/FcQ8S7LL3envahBsZ0yZ5SFHlhM8OaW7oNTwp2keD9tqUZuo2wZwfkPxBxlJmykgAXM39MEf9IuXjMahJlm1cwPZj03+OMY8HqHxRFrA7ny8sasckoR1PsZ8zqb+pRBkYny9RgfasYBxAwIsRcWPuxLQUkiBsZPuuflhjKRezNYuTqdjqMm9iRF4FuQ+GIuIVQSXJJZp1HraOWITVEm+I6zSD6YBIt00evZLOhsvmKg+3TP/AI/lil2X4DReky1ATUIjUT8CI6dDibsLl1enVoEMVq6ahabAgxoB5Dw/fg34r2YpUqQNAEOpG7ElgAZHrbHOy45ZIzlDm7HZVFQjF80eX5LI1KGYp1GkikxLIJGoja2xuBjuWYr+1ayzHM0yrWjxatQc+hJ+OCfN5rKlqaFYrX1hhcmTZX3nywyi+R1sMwGSY7uNTT9oeFTfaB64ZhzJ1C6dWJ1QSBjvXXL0KNOoyNQqNVDzcEzCrBstzvuT0xrZ/tG7INVJO/gp3sX0EcoMK241EbG0YMMh2dydVAyJUA5E6kPwYA/LFpuyOWPJ/wCP9DGzTP2Jqg/J5blc3prUAYgVUM6hA8QH44O+Mf8AzBgNnygJ/wCSo3/vxNnewWVYhmNUkGR4hy22XEPHF/43Lt9uhWp/DQ34HCc0Holfj+B+KS1JIyuGt4d5i1xfD62/P8MSd6mthsTc9MQuN+fljCvJpZTqZYkmI94OFiX9pH2X/hwsMtg0epPxFF3PWwuYEztv7sDHbKvTc0nho7t7QVNyIBnY3PwxqZ86VdgCDTQson2iFbcfWG24wK8X4itWlRJZmHd7jc9Tfc6p+GGZ80qce5hTqW3IZZTOrRy9KTAC00vv/drEk7CeeMjP9qGCuUFyLRvz8V4UQAT54zON8WVlSnTOqILCTEaQsE2k+E4yOI12qEgwNbFmF4A8rzYW3xn6jrZJ6YsS3fBQz6945apedgskWgBAFU2jcnDaAe5g7zqsCN9/CSF9YFhi7w2gTIpqVBgGXN/ddsXOOcPrLQB1kqw5FidpERJiBvjIpuTpb+fAzHDyKlkXWhTrWrC5EywH719hI35WPUjF7QcXq90z03PhI1eAFV8pKkE+v4YnyDZkUXorVHd06KuSZOpaqloUnfnjJyqa8rVX7Waor8Ztjp48UEuDVpSXBcq9lszmKGt3GsLK0igF+Y1A6Q3oAMSdjOAPQc1KwQVRp0U5UupaQGY/Vnl78GmQbTTdtLEGY0rJ2PIYCexmSrUapD0nJd0Y+EiNE3JYecziLfHykn2XYNRSm0o3X6BQ7lnv4jbfmTtfBrwXh4o09MyxOpj1J+4RYYAcvnB3qDq0+4KY+Yx6HlawKj9chi//AD8aUXJ8k66btRXBYxzCxzHSOecxzHccOIQWMrtPmxToFrkqQQBckzYe/F3NZjSMBuf7Sa3dDp0gBoYNqa+4mIgwdjy64TnyRhBtvfeiXQLZOgKupqlIEsTYj5+o6+WK3HeHtTpPUp01OmGIPtBR7Wk87Xjy9xk4jxV1aqQhYkliNWkAAAbwZuNvPAjxntHXqqaeoKlwQs+IHkSdx8McnBjnOd9vr/oBYm5arso5l6TszMry0bRE2n3WxFlqgEQL87WIA+/DcostB2OLy5Wk1klvObemOo6So0qKMgIL3P69+I2O+NX+rD9kjzOKGbpi0e+dwemGKVlNUevdhpLrBhDplY9oS3Pl/PHo3GZ7toMEAmekXHzGPMuw2ZClGYwAlz6MJJ9Bgr4/xVnX6JgFLLDhh4gZJjyBAEncyIxkxyUYysb1DtxS8A4Oy9avXbu1FOmWlqotK8ggO4Iv5kmZjBHmeyZBmlU57NaP9JA5Y1eEELSQbeEfdi8KmDh0cHH5lbe5lqinwmlWUFa2lo2cGSfIiBfz54uthF8RO+NcY0qIMzRtgZ7QmK2Vfo9QfxUz+WCHNPbGB2gWVosN0rqf4ldP/wCsLyxuMvo/4G4pVJfUwK1UBzMdCR+v1OHvUCAFjiDM0fpDI67c/Tph9WSnisNwPLoT1OOXBbG98lduIr1b+HHcVWy6G97+uFhulA6jR4t2qzBMF1VTAgWkjmG3j34oU8z9DpJMICBf5eW+KWczIcbkAGINif8ATP32xa4ZSGkzEAD7v18MVli/TUp87mCMfmtlzJUje8fWNuvnv+hi3KAQFJJtbYj0FzvzIucMytULT2km9+swPz9wxLk1YsYW4FybROwxyFGc5PSrAV8l/hqNJjneQIA6AbW+/wAtsbGaqaqQVgDHoQeVwSAcYCVWXpOHpxQqRKlhz/ROAfTdVvpi6f5DU26OcUikldnVlNWmqqWYEMVptbSlk5DzO2B7skAad/8A6xG/hR2HzGNPtJmGroAqsAJMR5W2OMPszlHRyxV/aJFjHsnqI547vTRmsHzqnQ1PdfkF/Y/ME5Zmk7SL7eGcQ9k+KvVo0zUbUwA8R3OoHfrdfnjJ4dmHoUzTpyARBDEHlHn8sS9klamAh+qpv6OI+ROG54xcVpXAeByUnq7hLxQA00b7NRT7idJ+/BDlqpAGAirxkmmUNIzG4M33B+ONpe0Yt9Gxt5fjjStKt/QztTdKvIVJWw7v8C69p150m+Ix3+1Kf5b/AC/PBakBol4Cc18RVMxgbbtQvKm/y/PHD2mU/wCG/wAR+eL1LyTRLwaPEHJEAxPOPjv5Y8+rpVLVCKaqQSBpgQF9nwm4ve2Catx6f8N/l+eBnL9uc1TLK6lgGIAZAbTaDpk/HC8uOGSNPcB45y4ko/VN2ZfaCsxod3HdmSLX16twbeGLmeeBVsmcGvEeJ5jOj6RIRDKgJHKDyk4o0+HkH2ZHT+eEQxrGqiOhFpU2m/KVAt+xMCGGOZKpUpBoANuY54NBk1G6kfGB6gYhr8GB2JP+mRg3vswlYJPxGqd1WPQ/nitmKRZiYjBc3BG+yx9bn44gqcBc7K3wP4YtJLgjvubPYclqtIDpPuB8XyGNfiGSz1V6qkt3a1WNKEIGiTp9lSGt9+Mfs9k6tJlbSQU2kGDfmcdzea4lTzFR6a1NLsWCq5gTuAA0YuEYpNPyBlUptVKq9rCLs5+3LmNNcnue7gSpFxESSo88Fyvjzrgufz5zAqZjUKYVrO5i46FvngmHHX/9Pyvh0ZRSoWoSXe/eqCHXhrPgfHHnO2j4ziB+0zCxNOfX+eC9SBNEjfzT2x5hlONV6ub7lqjtT79oB2hWJQbWgqIwW1e0TER9H8f54G8pkSMyKi1VhqksgMbzsLzBPlzwnNJSg9LHYFpfzGhxNYYdfLFetmTYMhA2J5et+WLPEJCyDNyPPEOZmEJkyY25Hr6Y5cHtRtnyM7l+QtywsWdPnhYaCDlPIkXZgTjbyGWTQC1/EthbwxB9SYj34P8ALdkKaCEYD0QT8Zk4rVOBhUd2qmE71jCXhGnr0xozYpTpIxqSBbJ1AGaoQZaWEiyibCedjy8sWcgSEB0iXJc+rEnGhneH06dY0DUMplXrWW1oXra/rz6Y1eGdmfoaZ16SUUkFLgkbb4TDHOKqK+/JLSQPVA0yFWPOZ+7EwYc6Q+P8sE47NiI7w/wj88L+zSz/AHhj/SMbIKVK1+5V+4Kx+6B88dVG539388Fw7PUvtP8AL8sOPZ+lyZx8PywWj2/cmr3BAUT9gfwjDTTIuEAN+QHrgw/s+n228tv0cdXs/T5s/wAvyxWi+xer3Ac0G6ke4YY+Xf7Z+AwcN2apHm3y/LDx2do/vH3j8sTR7Favc8/OXf7R9+F+zv8Ab+Awev2bpE2ZgOlvywqvZuidtQ98/eMVofgvX7gD+ytzZsSCh5sfefwwa/2Xp/bbysML+zFP7bfAYmhk1LyCFOh+pOJ0SP8Ac/ngoHZhPtn+EfniRezlLmz/ACH4YmiRNUQWqAlGVW0sQdJuQDyMTf0x0Ow2VPiR9wwTns3S+0/y/LDT2bp/bb5YHRImqIOiqeekfE/jjupvtKfRT+eCI9mqP2n+I/LDV7NIP8RvgMTRLwXriDj6xsy/wn/3YajVDuy+5T+eCb+zif5jx7scPZqn9t5935YmiXgmuINsz8nHw/nivWNT7Sn0XBZ/Zel9t/liWl2boDcFvU/lienImuICV8uTcy3qfwxXOVnanOPRR2dy/wBkj/mOJV4HQH1J9Wb88X6cia4nmT5cIPYifT588QNTTlTI9w/PHqTdn8ud6I+J/PHF7N5b/JX3z+Jxfpy9itUTyh4+y3xw3KEd4nhadQ3jqMeuf1Bl/wDIp/wjGZ2myuXy+WqMKVNWPhU6ROprWO8xJ92KlGWllx0toCOMVlPhFog+8zufMYiq1lKqDN4/3xkPlg9SoweJIYzLTAiAJsIE4tIZABM2iR06456iovY2t2rNL3j4Y7ivbp88LDKFnrs4887V9qQq1aQJpu7ZilcTH91qgr6mCftfBYWOizFAhzuZ7zidZFBhEp5XUWvLMjFjO8w4/wB8elDCwsBD8TCnwhThThYWGizs4WFhYhBTjs4WFiEFOOThYWIQWFhYWIQWFOFhYhDk4RwsLEIcnHCcLCxCHJwpwsLEIKcdBwsLEIdwpwsLEIdnHQcLCxCA52z4vVoGmKb6SQxMiQbiL3iL8jvjBy/a/Mo5aoyslgABLEkgRcADefzxzCwuQSJ+K9s6yrrQXnSACNO5BLalmZjacYnaHi9fNoihkIp6ncwR9X0GqBIEAb4WFgZN6Q1yBearsrlQZMwCLTPSdp88T0c4QdJ9CN4/PCwsZ5xQ6LZo/toP+2FhYWBGH//Z",

              "data:image/jpeg;base64,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",

              "data:image/jpeg;base64,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",
            ]}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={{ height: 100 }} />
            )}
          />
          <FlatGrid
            itemDimension={130}
            data={[
              "data:image/png;base64,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",
              "data:image/jpeg;base64,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",
              "data:image/jpeg;base64,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",
              "data:image/jpeg;base64,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",
            ]}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={{ height: 100 }} />
            )}
          />
        </ScrollView>
      </View>
    </ScrollView>

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
const styles = StyleSheet.create({
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
    <View style={{ width: 350, justifyContent: "space-evenly" }}>
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
