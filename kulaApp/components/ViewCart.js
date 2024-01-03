import React, { useState, useContext, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import OrderItem from "./OrderItem";
import OrderItemTotal from "./OrderItemTotal";
import CartDetailsItem from "./CartDetailsItem";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import Firebase, { Firestore } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import FeesItem from "./FeesItem";
import CartDetailsItem2 from "./CartDetailsItem2";
import MapComponent from "./MapComponent";
import { Button } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Stack, IconButton } from "@react-native-material/core";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { useDispatch } from "react-redux";
import LottieView from "lottie-react-native";

const details = [
  {
    id:0,
    title: "Add your Address",
    description: "With butter lettuce, tomato and sauce bechamel",
  },
];
const details2 = [
  {
    id:0,
    title: "Standard",
    price: "30-60 Min",
  },
];
const details3 = [
  {
    id:0,
    title: "Add your Payment option",
    description: "With butter lettuce, tomato and sauce bechamel",
  },
];
const fees = [
  {
    id:0,
    title: "Products",
    price: "$12",
  },
  {
    id:1,
    title: "Services",
    price: "$12",
  },

  {
    id:2,
    title: "Delivery",
    price: "$1",
  },
];
const delivery = [
  {
    id:0,
    title: "placo",
    price: "$12",
  },
];

export default function ViewCart({
  setModalVisible2,
  modalVisible2,
  selectItem,
  setSelect,
  ind,
  cartItems,
  isFoodInCart,
  select,
  navigation,
  setNotification
}) {
  const animation = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [modalVisible4, setModalVisible4] = useState(false);
  const [modalVisible5, setModalVisible5] = useState(false);
  const [address, setAddress] = useState(false);
  const [pay, setpay] = useState(false);
  const [location, setLocation] = useState(null);
  const [price, setPrice] = useState(select?.price);
  useEffect(() => {
    setPrice(select?.price);
  }, [select?.price, price]);

  const [phone, setPhone] = useState(null);
  const [ loc, setLoc] = useState(null);
  
  const [itemPrice, setItemPrice] = useState(1);
  const dispatch = useDispatch();
  const updateItem = (item) => {
    dispatch({
      type: "UPDATE_CART",
      payload: {
        item,
        // quantity
      },
    });
  };
  const [mapModalVisible, setMapModalVisible] = useState(false);
  const { items, restaurantName } = useSelector(
    (state) => state.cartReducer.selectedItems
  );

  const { user } = useContext(AuthenticatedUserContext);
  const total = items
    .map((item) =>
      Number(item?.item?.price?.replace("ksh", "") * item?.item?.quantity)
    )
    .reduce((prev, curr) => prev + curr, 0);

  const totalFinal = total + 100;
  const totalKES = totalFinal.toLocaleString("en", {
    style: "currency",
    currency: "KES",
  });

  const totalUSD = total.toLocaleString("en", {
    style: "currency",
    currency: "KES",
  });
  const decreasePrice = () => {
    if (itemPrice > 1) {
      let price_update = itemPrice - 1;
      setItemPrice(price_update);
      setPrice(select?.price * itemPrice);
    } else {
    }
  };
  const increasePrice = () => {
    let price_update = itemPrice + 1;
    setItemPrice(price_update);
    setPrice(select?.price * price_update);
  };
  const payment = (phone, amount) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer 3MyNRoaH76k24uQEeNGMHmg7FXUM",
    };
    const data = {
      BusinessShortCode: "174379",
      Password:
        "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMTYwMjE2MTY1NjI3",
      Timestamp: "20160216165627",
      TransactionType: "CustomerPayBillOnline",
      Amount: totalKES,
      PartyA: phone,
      PartyB: "174379",
      PhoneNumber: phone,
      CallBackURL: "https://mydomain.com/pat",
      AccountReference: "Test",
      TransactionDesc: "Test",
    };
    let url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

    axios
      .post(url, data, {
        headers: headers,
      })
      .then((response) => {
        dispatch({
          type: FOUND_USER,
          data: response.data[0],
        });
      })
      .catch((error) => {
        dispatch({
          type: ERROR_FINDING_USER,
        });
      });
  };
  const addOrderToFirebase = () => {
    (async () => {
      try {
        Firestore.collection("orders").add({
          items: items,
          total: totalKES,
          restaurantName: restaurantName,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          // user: user.email,
          location: location,
          phone: phone,
          user: {},
          checked: false,
        });

        console.log("Document written with ID: ");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    })();

    setModalVisible1(false);

     setModalVisible4(true);

    //  payment function should be here
     setTimeout(() => {
      setModalVisible4(false);
      setModalVisible5(true);
    }, 6000);
     
  };
  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0,0,0,0.7)",
    },
    modalContainer2: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "white",
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
      height: 500,
      borderWidth: 1,
    },
    modalCheckout3Container: {
      backgroundColor: "white",
      padding: 16,
      // height: 500,
      height: 500,
      borderWidth: 1,
    },
    restaurantName: {
      textAlign: "left",
      fontWeight: "800",
      color: "#303030",
      fontSize: 20,
      marginBottom: 10,
    },
    subtotalContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 15,
    },
    animationContainer: {
      // backgroundColor: "#fff
      // backgroundColor: "#eee",
      alignItems: "center",
      justifyContent: "center",
      // flex: 1,
    },
    activeCategory: {
      backgroundColor: "#DADADA",
      alignItems: "center",
      padding: 10,
      borderRadius: 10,
    },
    textCategory: {
      fontSize: 15,
      fontWeight: "600",
      color: "black",
    },
    activeTextCategory: {
      fontSize: 12,
      fontWeight: "600",
      color: "black",
    },
    subtotalText: {
      textAlign: "left",
      fontWeight: "600",
      fontSize: 15,
      marginBottom: 10,
    },
  });
  const MapModalContent = () => {
    return (
      <View style={styles.modalContainer}>
        <View style={styles.modalMapCheckoutContainer}>
          <Text style={styles.restaurantName}>here</Text>
          <Map />

          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity
              style={{
                marginTop: 20,
                backgroundColor: "black",
                alignItems: "center",
                padding: 13,
                borderRadius: 8,
                width: 300,
                position: "relative",
              }}
              onPress={() => console.log("set map")}
            >
              <Text style={{ color: "white", fontSize: 20 }}> Checkout</Text>
              {/* <Text style ={{ position:'absolute',color:"white",right:20 ,fontSize:15,top:17}}>{total ? totalUSD : ""}</Text> */}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  const checkoutModalContent = () => {
    return (
      <View style={styles.modalContainer}>
        <View style={styles.modalCheckoutContainer}>
          {/* <Text style={styles.restaurantName}>{restaurantName}</Text> */}
          <Text style={styles.restaurantName}>Checkout </Text>
          <ScrollView>
            <OrderItemTotal total={totalKES} items={items} />
            {/* {loc ? <CartDetailsItem2 title={loc} price={phone} /> : null} */}
            {details.map((item, index) => (
              <CartDetailsItem
             
                setMapModalVisible={setMapModalVisible}
                location={location}
                icon={"md-home-outline"}
                setLocation={setLocation}
                loc={loc}
                setLoc={setLoc}
                phone={phone}
                payee={false}
                setPhone={setPhone}
                key={item.id}
                item={item}
                type={"map"}
              />
            ))}
            <View
              style={{
                // padding: 20,
                paddingBottom: 20,
                paddingTop: 20,
              }}
            >
              <Text style={{ fontWeight: "600", fontSize: 16 }}>
                Delivery option
              </Text>
            </View>
            {details2.map((item, index) => (
              <CartDetailsItem2
                key={item.id}
             
                title={item.title}
                price={item.price}
              />
            ))}
            <View
              style={{
                // padding: 20,
                paddingBottom: 10,
                paddingTop: 20,
              }}
            >
              <Text style={{ fontWeight: "600", fontSize: 16 }}>
                Payment option
              </Text>
            </View>
            {phone ? <CartDetailsItem2 title={"Mpesa"} price={phone} /> : null}
            {details3.map((item, index) => (
              <CartDetailsItem
                icon={"creditcard"}
                phone={phone}
                setPhone={setPhone}
                payee={true}
                payment={payment}
                key={item.id}
                item={item}
                type={"payment"}
              />
            ))}
            <Text style={{ paddingTop: 20, fontWeight: "600", fontSize: 16 }}>
              Order Overview
            </Text>
            {items.map((item, index) => (
              <OrderItem key={index} item={item} />
            ))}
            <TouchableOpacity
              style={{
                marginTop: 20,

                padding: 5,
                borderRadius: 8,
                width: 300,
                position: "relative",
              }}
              onPress={() => setModalVisible2(true)}
            >
              <Text style={styles.subtotalText}>
                {" "}
                Fees{" "}
                <Text style={{ color: "#6EBE76" }}>(How our fees work)</Text>
              </Text>
            </TouchableOpacity>
            {fees.map((item, index) => (
              <FeesItem total={total}  key={index} item={item} />
            ))}
          </ScrollView>
          <View style={styles.subtotalContainer}>
            <Text style={styles.subtotalText}> Total</Text>
            <Text>
              {totalKES} {"ksh"}
            </Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity
              style={{
                marginTop: 20,
                backgroundColor: "green",
                alignItems: "center",
                padding: 13,
                borderRadius: 8,
                width: 300,
                position: "relative",
              }}
              onPress={() => addOrderToFirebase()}
            >
              <Text style={{ color: "white", fontSize: 20 }}> Checkout</Text>
              {/* <Text style ={{ position:'absolute',color:"white",right:20 ,fontSize:15,top:17}}>{total ? totalUSD : ""}</Text> */}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  const checkoutModal3Content = () => {
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              // padding: 20,
              paddingBottom: 20,
              paddingTop: 20,
            }}
          >
            <></>
            <Text style={{ fontWeight: "800", fontSize: 20 }}>
              {restaurantName}
            </Text>
          </View>

          <ScrollView>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                // padding: 20,
                paddingBottom: 20,
                paddingTop: 20,
                borderBottomWidth: 1,
                borderColor: "#616161",
              }}
            >
              <></>

              <Text style={{ fontWeight: "600", opacity: 0.7, fontSize: 16 }}>
                Quantity item
              </Text>
              <Text style={{ fontWeight: "600", opacity: 0.7, fontSize: 16 }}>
                {"subtotal: "} {totalKES} {"ksh"}
              </Text>
            </View>
            {items.map((item,index)=>(
              <View
              key={item.item.title}
                // index={index}
              >       
          
       <View
       key={item.item.title}
         // index={index}
         style={{
           flexDirection: "row",
           justifyContent: "space-between",
           // padding: 20,
           paddingBottom: 20,
           paddingTop: 20,
           // borderBottomWidth: 1,
         }}
       >
      
         <Text style={{ fontWeight: "600", fontSize: 16 }}>
           {item?.item?.title}
         </Text>
         <Text style={{ fontWeight: "600", fontSize: 16 }}>
           {item?.item?.price}
         </Text>
       </View>
       <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    // padding: 20,
                    paddingBottom: 20,
                    // borderBottomWidth: 1,
                  }}
                ></View>
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
                  style={{
                    // padding: 20,
                    paddingBottom: 20,
                    paddingTop: 20,
                  }}
                ></View>
                <View
                  index={index}
                  key={index}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    // padding: 20,
                    paddingBottom: 20,
                    // paddingTop: 20,
                    // borderBottomWidth: 1,
                    borderBottomColor: "999",
                  }}
                >
                  <></>
                  <TouchableOpacity
                    index={index}
                    key={index}
                    style={{
                      backgroundColor: "white",
                      borderColor: "gray",
                      border: "1px solid gray",
                      alignItems: "center",
                      padding: 5,
                      borderRadius: 50,
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
                      <Ionicons
                        style={{
                          paddingRight: 10,
                        }}
                        name="add"
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
                        {itemPrice}
                      </Text>
                      <AntDesign
                        style={{
                          paddingLeft: 10,
                        }}
                        name="minus"
                        size={30}
                        color="black"
                      />
                    </View>
                  </TouchableOpacity>
                  <Text style={{ fontWeight: "600", fontSize: 16 }}>
                    {item?.item?.price}
                  </Text>
                </View>
           </View>

       
       
   ))}
            {/* {items.map((item, index) => ( */}
               {/* <><Text>     {item?.item?.title}</Text> */}
                {/* <View
                key={item.item.title}
                  // index={index}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    // padding: 20,
                    paddingBottom: 20,
                    paddingTop: 20,
                    // borderBottomWidth: 1,
                  }}
                >
                  <></>
                  <Text style={{ fontWeight: "600", fontSize: 16 }}>
                    {item?.item?.title}
                  </Text>
                  <Text style={{ fontWeight: "600", fontSize: 16 }}>
                    {item?.item?.price}
                  </Text>
                </View> */}

                {/* <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    // padding: 20,
                    paddingBottom: 20,
                    // borderBottomWidth: 1,
                  }}
                ></View>
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
                  style={{
                    // padding: 20,
                    paddingBottom: 20,
                    paddingTop: 20,
                  }}
                ></View>
                <View
                  index={index}
                  key={index}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    // padding: 20,
                    paddingBottom: 20,
                    // paddingTop: 20,
                    // borderBottomWidth: 1,
                    borderBottomColor: "999",
                  }}
                >
                  <></>
                  <TouchableOpacity
                    index={index}
                    key={index}
                    style={{
                      backgroundColor: "white",
                      borderColor: "gray",
                      border: "1px solid gray",
                      alignItems: "center",
                      padding: 5,
                      borderRadius: 50,
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
                      <Ionicons
                        style={{
                          paddingRight: 10,
                        }}
                        name="add"
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
                        {itemPrice}
                      </Text>
                      <AntDesign
                        style={{
                          paddingLeft: 10,
                        }}
                        name="minus"
                        size={30}
                        color="black"
                      />
                    </View>
                  </TouchableOpacity>
                  <Text style={{ fontWeight: "600", fontSize: 16 }}>
                    {item?.item?.price}
                  </Text>
                </View> */}
               {/* </>
            // ))} */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                // padding: 20,
                paddingBottom: 20,
                paddingTop: 20,
                // borderBottomWidth: 1,
                // borderColor: "#616161",
              }}
            >
              <></>

              <Text style={{ fontWeight: "600", opacity: 0.7, fontSize: 16 }}>
                Subtotal
              </Text>
              <Text style={{ fontWeight: "600", opacity: 0.7, fontSize: 16 }}>
                {totalKES} {"ksh"}
              </Text>
            </View>
          </ScrollView>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              paddingHorizontal: 10,
              padding: 3,
            }}
          >
            <TouchableOpacity
              style={{
                marginTop: 20,
                backgroundColor: "green",
                alignItems: "center",
                padding: 15,
                paddingLeft: 10,
                borderRadius: 8,
                width: "90%",
                position: "relative",
              }}
              onPress={() => {
                setModalVisible3(false);
            
                setModalVisible1(true)
                console.log("here", modalVisible, modalVisible4);
              }}
            >
              {/* <Text style={{ color: "white", fontSize: 20 }}> Checkout</Text> */}
              <Text style={{ color: "white", fontSize: 20 }}>
                {/* {total ? "Add ( " + totalUSD + "ksh )" : ""} */}
                Checkout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
    const checkoutModal4Content = () => {
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


            <ScrollView
              style={{
                backgroundColor: "white",
              }}
            >
              <View style={styles.animationContainer}>
                <LottieView
                  autoPlay
                  ref={animation}
                  style={{
                    width: 400,
                    height: 400,
                    // backgroundColor: "#eee",
                  }}
                  // Find more Lottie files at https://lottiefiles.com/featured
                  source={require("../assets/animations/scanner.json")}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  // padding: 20,
                  paddingBottom: 20,
                  paddingTop: 20,
                  // borderBottomWidth: 1,
                  // borderColor: "#616161",
                }}
              >
                <></>

                <Text style={{ fontWeight: "600", opacity: 0.7, fontSize: 16 }}>
                  Subtotal
                </Text>
                <Text style={{ fontWeight: "600", opacity: 0.7, fontSize: 16 }}>
                  {totalKES} {"ksh"}
                </Text>
              </View>
            </ScrollView>
            <View
              style={{
                flexDirection: "row",
                
                justifyContent: "center",
                // padding: 20,
           
                paddingTop: 20,
              }}
            >
              <></>
              <Text style={{ fontWeight: "600", fontSize: 16 }}>
                Payment Request underway
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                // padding: 20,
                paddingBottom: 20,
                paddingTop: 20,
              }}
            >
              <></>
              <Text style={{ fontWeight: "400", fontSize: 16 }}>
                Your payment request is on its way! Please note that this process can take up to 60 seconds.We appreciate your patience as we work on getting the payment details for you
              </Text>
            </View>

          </View>
        </View>
      );
    };
    const checkoutModal5Content = (setNotification) => {
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
        <View style={styles.modalCheckout3Container}>
        
              <View style={styles.animationContainer}>
                <LottieView
                  autoPlay
                  ref={animation}
                  style={{
                    width: 300,
                    height: 300,
                    // backgroundColor: "#eee",
                  }}
                  // Find more Lottie files at https://lottiefiles.com/featured
                  source={require("../assets/animations/cooking.json")}
                />
              </View>

     
         
            <View
              style={{
                flexDirection: "row",
                
                justifyContent: "center",
                // padding: 20,
           
                // paddingTop: 20,
                paddingBottom: 10,
              }}
            >
              <></>
              <Text style={{ fontWeight: "600", fontSize: 16 }}>
                Payment Successful,Bon Appetit!
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                // padding: 20,
                paddingBottom: 20,
                // paddingTop: 20,
              }}
            >
              <></>
              <Text style={{ fontWeight: "400", fontSize: 16 }}>
                Your payment request is on its way! Please note that this process can take up to 60 seconds.We appreciate your patience as we work on getting the payment details for you
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                paddingHorizontal: 10,
                padding: 3,
              }}
            >
              <TouchableOpacity
                style={{
                  // marginTop: 20,
                  backgroundColor: "green",
                  alignItems: "center",
                  padding: 15,
                  paddingLeft: 10,
                  borderRadius: 8,
                  width: "90%",
                  position: "relative",
                }}
                onPress={() => {
                  setModalVisible5(false);
                  setNotification(true);
                  navigation.navigate("Home")
                  // setModalVisible1(true);
                  // setModalVisible1(true);
                  console.log("here", modalVisible, modalVisible4);
                }}
              >
                {/* <Text style={{ color: "white", fontSize: 20 }}> Checkout</Text> */}
                <Text style={{ color: "white", fontSize: 20 }}>
                  {/* {total ? "Add ( " + totalUSD + "ksh )" : ""} */}
                  close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    };
  const checkoutModal2Content = () => {
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
                  How our fees work
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  // padding: 20,
                  paddingBottom: 10,
                  // borderBottomWidth: 1,
                  borderBottomColor: "999",
                }}
              ></View>
              <View>
                <Text style={{ opacity: 0.7, fontSize: 14 }}>
                  Every order you place, every meal you savored, echoes our
                  mission: to deliver top-quality food, right to your doorstep.
                  Service fees, though they might seem small, serve as stepping
                  stones to this mission. They fund the training for our
                  delivery heroes, ensuring your meals arrive just as you'd
                  expect: hot, fresh, and handled with utmost care. They also
                  maintain our app's accessibility, ensuring that everyone can
                  savor the joy of a delivered meal. Service fees help us
                  promise you not just food, but a taste of safety, quality, and
                  commitment. By contributing to our environmental initiatives,
                  they also let us all give back to the community and the world
                  we share. Simply put, these fees are not just about sustaining
                  service, but about nurturing joy, spreading love, and making
                  every meal a celebration. Thank you for being a part of this
                  beautiful journey.
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
                backgroundColor: "green",
                alignItems: "center",
                padding: 15,
                paddingLeft: 10,
                borderRadius: 8,
                width: 300,
                position: "relative",
              }}
              onPress={() => {
                setModalVisible2(false);
              }}
            >
              {/* <Text style={{ color: "white", fontSize: 20 }}> Checkout</Text> */}
              <Text style={{ color: "white", fontSize: 20 }}>close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
console.log('items',items)
  return (
    <>
      <Modal
        animationType="slide"
        visible={mapModalVisible}
        transparent={true}
        onRequestClose={() => setMapModalVisible(false)}
      >
        {MapModalContent()}
      </Modal>
      <Modal
        animationType="slide"
        visible={modalVisible2}
        transparent={true}
        onRequestClose={() => setModalVisible2(false)}
      >
        {checkoutModal2Content()}
      </Modal>
      <Modal
        animationType="slide"
        visible={modalVisible1}
        transparent={true}
        onRequestClose={() => setModalVisible1(false)}
      >
        {checkoutModalContent()}
      </Modal>
      <Modal
        animationType="slide"
        visible={modalVisible3}
        transparent={true}
        onRequestClose={() => setModalVisible3(false)}
      >
        {checkoutModal3Content()}
      </Modal>
      <Modal
        animationType="slide"
        visible={modalVisible4}
        transparent={true}
        onRequestClose={() => setModalVisible4(false)}
      >
        {checkoutModal4Content()}
      </Modal>
      <Modal
        animationType="slide"
        visible={modalVisible5}
        transparent={true}
        onRequestClose={() => setModalVisible5(false)}
      >
        {checkoutModal5Content(setNotification)}
      </Modal>
   
      {total ? (
        <View
        key={ind}
          style={{
            flex: 2,
            alignItems: "center",
            flexDirection: "column",
            postion: "absolute",
            bottom: 0,
            zIndex: -100,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <TouchableOpacity
              style={{
                marginTop: 20,
                backgroundColor: "green",
                flexDirection: "row",
                justifyContent: "center",
                alignItems:"center",
                padding: 15,
                borderRadius: 8,
                width: 300,
                height: 60,
                position: "relative",
              }}
              onPress={() => setModalVisible3(true)}
            >
              <Text style={{ color: "white", fontSize: 20 }}>
                Basket( {totalUSD} ksh )
              </Text>
         
            </TouchableOpacity>
          </View>
        </View>
      ) :(<></>)}
    </>
  );
}
