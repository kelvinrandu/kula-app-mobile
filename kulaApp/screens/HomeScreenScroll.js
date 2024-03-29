import React, { useRef, useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Image,
  Animated,
  Modal,
  Text,
  TouchableOpacity,
} from "react-native";
import { Divider } from "react-native-elements";
import CarouselCards from "../components/Carousel/Carousel";

import {
  Ionicons,
  AntDesign,
  EvilIcons,
  Octicons,
  Entypo,
} from "@expo/vector-icons";
import { BANNER_H } from "../components/constants";
import TopNavigation from "../components/TopNavigation";
import DummyText from "../components/DummyText";
import HeaderTabs from "../components/HeaderTabs";
import AnimatedHeader from "../components/AnimatedHeader";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { doc, getDoc,getDocs,onSnapshot } from "firebase/firestore";
import Firebase, { Firestore } from "../config/firebase";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import ViewCart from "../components/ViewCart";

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
const picsumImages = new Array(11).fill("http://placeimg.com/640/360/any");
function renderItem({ item }) {
  return <Image source={{ uri: item }} style={{ height: 100 }} />;
}
const HomeScreenScroll = ({ route, navigation }) => {
  const btnRef = React.useRef();
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [select, setSelect] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(1);
  const [ind, setInd] = useState(0);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [foods, setfoods] = useState(food_array);
  const [images, setImages] = React.useState(picsumImages);
  const [active, setActive] = useState(0);
  const [query, setQuery] = useState("");
  const [todos, setTodos] = useState([]);
  const [category, setCategory] = useState([]);
  const scrollA = useRef(new Animated.Value(0))?.current;

  useEffect(() => {
    const todoRef = Firestore.collection("menu").where("restaurantId", '==', route.params.id);
     const categoryRef = Firestore.collection("category").where("restaurantId", '==', route.params.id);
  
    const subscriber = onSnapshot(todoRef, {
      next: (snapshot) => {
        const todos = [];
        snapshot.docs.forEach((doc) => {
          todos.push({
            id: doc.id,
            ...doc.data()
          });
        });

        
  
        setTodos(todos);
      }
    });
  
    const cat = onSnapshot(categoryRef, {
      next: (snapshot) => {
        const category = [];
        snapshot.docs.forEach((doc) => {
          category.push({
            id: doc.id,
            ...doc.data()
          });
        });

        setCategory(category)
        // setTodos(todos);
        if(category[0]?.name){
          setQuery(category[0]?.name)
          setActive(category[0]?.id)
        }
        // setQuery()
      }
    });
  
    // // Unsubscribe from events when no longer in use
    return () =>{ cat();subscriber(); }
  }, []);
  const search = (query) => {
    console.log('query',query);
    let resti = todos.filter((food) => food.category === query);
    // let result = resti;
    setQuery(query);
    console.log('tot',resti)
    // setfoods(result);
    setTodos(resti)
  };
  // useEffect(() => {
  //   search(query);
  // }, [query]);
  useEffect(() => {}, [quantity]);
  useEffect(() => {
    const todoRef = Firestore.collection("menu").where("restaurantId", '==', route.params.id);

  
    const subscriber = onSnapshot(todoRef, {
      next: (snapshot) => {
        const todos = [];
        snapshot.docs.forEach((doc) => {
          todos.push({
            id: doc.id,
            ...doc.data()
          });
        });
        let resti = todos.filter((food) => food.category === query);
        
  
        setTodos(resti);
      }
    });

    return () =>{ subscriber();}
  }, [query]);
  const decreasePrice = () => {
    if (quantity > 1) {
      let price_update = quantity - 1;
      let total_price = Number(select?.price.replace("ksh", ""));
      setQuantity(price_update);
      let _total_price = total_price * price_update + " ksh";
      setPrice(_total_price);
      // setPrice(select?.price * price_update);
    } else {
      console.log('remove from cart')
      setModalVisible(false);
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
  const offset = useRef(new Animated.Value(0))?.current;

  const dispatch = useDispatch();
  const selectItem = (item, ind,quantity) => {
    console.log('iteems',item,quantity)
    let _item = {
      category: item?.category,
      description: item?.description,
      id: item?.id,
      price: item?.price,
      quantity:quantity,
      total:price,
      restaurantId: item?.restaurantId,
      title: item?.title,

    }
    // console.log('item & quantity',_item)

  

    dispatch({
      type: "ADD_TO_CART",
      payload: {
        item:_item,
        restaurantName: route.params.name,
   
        // quantity:quantity ,
        quantity:price,
        total: price,
      },
    });
    setQuantity(1)
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
    useEffect(() => {
 
    
      // // Unsubscribe from events when no longer in use
      return () =>{    dispatch({
        type: "RESET_CART"
      });console.log('modal destroy')}
    }, []);
    console.log('select',select)
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
              {select?.description}
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
                  : selectItem(select, ind,quantity,price);
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
              btnRef={btnRef}
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
              style={{
                alignItems: "center",
                marginRight: 30,
                marginTop: 10,
              }}
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

  console.log('category',cartItems.length)
  return (
    <View>
      <TopNavigation
        active={active}
        setActive={setActive}
        search={search}
        query={query}
        setQuery={setQuery}
        items={category}
        title={route.params.name}
        scrollA={scrollA}
      />
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
              uri: route.params.image,
            }}
          
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
          {category.map((item, index) => (
            <View
              onPress={() => console.log("here")}
              key={index}
              style={{
                alignItems: "center",
                // marginRight: 30,
                marginHorizontal: 10,
                paddingHorizontal: 10,
                marginTop: 20,
                // marginBottom: 5,
              }}
            >
              <TouchableOpacity
                  key={index}
                style={
                  active == item.id ? styles.activeCategory : styles.category
                }
                onPress={() => {
                  setActive(item.id);
                  search(item.name);
                }}
              >
                {/* <Image
                source={item.image}
                style={{ width: 50, height: 40, resizeMode: "contain" }}
              /> */}
                <Text
                    key={index}
                  style={
                    active == item.id
                      ? styles.activeTextCategory
                      : styles.textCategory
                  }
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View style={{ marginRight: 30, marginTop: 10 }}>
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
           {query}
          </Text>
        </View>
        {todos.map((food, index) => (
          <View key={index}>
            <View key={index} style={styles.menuItemStyle}>
              <TouchableOpacity
              key={index}
                onPress={(index) => {
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

        <View style={styles.menuItemStyle2}></View>
        {/* <DummyText /> */}
      </Animated.ScrollView>
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

      <View    style={styles.action}>
      {cartItems.length >0?(

             <ViewCart

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
      ):(<></>)}
        {/* <ViewCart

          setModalVisible2={setModalVisible2}
          isFoodInCart={isFoodInCart}
          selectItem={selectItem}
          cartItems={cartItems}
          modalVisible2={modalVisible2}
          setSelect={setSelect}
          select={select}
          navigation={navigation}
          restaurantName={route.params.name}
        /> */}
      </View>
    </View>
  );
};
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
    {/* carousel start */}
    <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
      <Text> images</Text>
      <CarouselCards />
      {/* <Carousel
        layout={"default"}
        ref={(ref) => (props.btnRef = ref)}
        data={im}
        sliderWidth={300}
        itemWidth={300}
        renderItem={renderItem}
        // onSnapToItem={(index) => this.setState({ activeIndex: index })}
      /> */}
    </View>
    {/* carousel end */}
    {/* view to handle modal  start */}

    {/* view to handle modal stop */}
  </>
);
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
    // backgroundColor: "white",
    // color: "white",
    alignItems: "center",
    padding: 10,
    borderRadius: 30,
  },
  menuItemStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    paddingHorizontal: 10,
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
    justifyContent: "center",
    alignItems:"center",
    bottom: 5,
    marginLeft:100,
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
