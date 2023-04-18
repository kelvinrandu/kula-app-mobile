import React, { useState, useContext } from "react";
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


const details = [
  {
    title: "Add your Address",
    description: "With butter lettuce, tomato and sauce bechamel",
  },
];
const details2 = [
  {
    title: "Standard",
    price: "30-60 Min",
  },
];
const details3 = [
  {
    title: "Add your Payment option",
    description: "With butter lettuce, tomato and sauce bechamel",
  },
];
const fees = [
  {
    title: "packages",
    price: "$12",
  },

  {
    title: "Delivery",
    price: "$1",
  },
];
const delivery = [
  {
    title: "placo",
    price: "$12",
  },
];

export default function ViewCart({
  setModalVisible2,
  modalVisible2,
  setSelect,
  select,

}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [location, setLocation] = useState(null);
  const [phone, setPhone] = useState(null);

  const [mapModalVisible, setMapModalVisible] = useState(false);
  const { items, restaurantName } = useSelector(
    (state) => state.cartReducer.selectedItems
  );
  const { user } = useContext(AuthenticatedUserContext);

  // console.log(user.email)
  const total = items
    .map((item) => Number(item.item.price.replace("ksh", "")))
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
  const payment=(phone,amount)=>{
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

  }
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
  };
  const styles = StyleSheet.create({
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
    restaurantName: {
      textAlign: "center",
      fontWeight: "600",
      fontSize: 18,
      marginBottom: 10,
    },
    subtotalContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 15,
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
          <Text style={styles.restaurantName}>{restaurantName}</Text>
          <ScrollView>
            {items.map((item, index) => (
              <OrderItem key={index} item={item} />
            ))}
            {details.map((item, index) => (
              <CartDetailsItem
                setMapModalVisible={setMapModalVisible}
                location={location}
                setLocation={setLocation}
                phone={phone}
                setPhone={setPhone}
                key={index}
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
              <CartDetailsItem2 key={index} item={item} />
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
            {details3.map((item, index) => (
              <CartDetailsItem
                phone={phone}
                setPhone={setPhone}
                payment={payment}
                key={index}
                item={item}
                type={"payment"}
              />
            ))}

            {fees.map((item, index) => (
              <FeesItem key={index} item={item} />
            ))}
          </ScrollView>
          <View style={styles.subtotalContainer}>
            <Text style={styles.subtotalText}> subtotal</Text>
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
            {items.map((item, index) => (
              <>
                <View
                  index={index}
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
                        1
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
              </>
            ))}
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
            {/* <TouchableOpacity
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
                  1
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
            </TouchableOpacity> */}
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
                setModalVisible1(true);
                console.log("here", modalVisible, modalVisible1);
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
                  {select?.title}
                </Text>
                <Text style={{ fontWeight: "600", fontSize: 16 }}>
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
                  1
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
                setModalVisible2(false);
                console.log("here", modalVisible, modalVisible1);
              }}
            >
              {/* <Text style={{ color: "white", fontSize: 20 }}> Checkout</Text> */}
              <Text style={{ color: "white", fontSize: 20 }}>
                {select?.price ? "Add ( " + select?.price + " )" : ""}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

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

      {total ? (
        <View
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
                justifyContent: "flex-end",
                padding: 15,
                borderRadius: 8,
                width: 300,
                height: 60,
                position: "relative",
              }}
              onPress={() => setModalVisible3(true)}
            >
              <Text style={{ color: "white", fontSize: 20, marginRight: 30 }}>
                Basket( {totalUSD} ksh )
              </Text>
              <Text
                style={{ color: "white", fontSize: 20, marginRight: 30 }}
              ></Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <></>
      )}
    </>
  );
}
