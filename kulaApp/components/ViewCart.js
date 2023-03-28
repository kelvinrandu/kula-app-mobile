import React,{ useState,useContext} from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useSelector } from 'react-redux';
import OrderItem from './OrderItem';
import CartDetailsItem from './CartDetailsItem';
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import Firebase, { Firestore } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore"; 
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import FeesItem from './FeesItem';
import CartDetailsItem2 from './CartDetailsItem2';

import { getFirestore, doc, Timestamp } from "firebase/firestore";
// import "firebase/firestore";
// import firebase from "firebase";

// const details = [
//   {
//     title: "Add your Address",
//     description: "With butter lettuce, tomato and sauce bechamel",

//   },
//   {
//     title: "Add delivery note",
//     description:
//       "Amazing Indian dish with tenderloin chicken off the sizzles 🔥",

//   },
//   {
//     title: "Deliver option",
//     description:
//       "Chilaquiles with cheese and sauce. A delicious mexican dish 🇲🇽",

//   },
//   {
//     title: "Paymement option",
//     description:
//       "One can never go wrong with a chicken caesar salad. Healthy option with greens and proteins!",
//   },
//   {
//     title: "Order overview",
//     description: "With butter lettuce, tomato and sauce bechamel",

//   },

// ];
const details = [
  {
    title: "Add your Address",
    description: "With butter lettuce, tomato and sauce bechamel",
  },

];
const details2 = [
  {
    title: "Standard",
    description: "30-60 Min",
  },

];
const details3= [
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


export default function ViewCart() {
  const [modalVisible,setModalVisible] = useState(false);
  const {items, restaurantName} = useSelector((state)=> state.cartReducer.selectedItems);  
  const { user } = useContext(AuthenticatedUserContext);
  console.log(items);
  // console.log(user.email)
  const total = items
    .map((item) => Number(item.item.price.replace("$", "")))
    .reduce((prev, curr) => prev + curr, 0);
  const totalUSD = total.toLocaleString("en", {
    style: "currency",
    currency: "USD",
  });
  const addOrderToFirebase =()=>{
    (async () => {
  
  try {

    	Firestore.collection("orders").add({
        items: items,
        total: totalUSD,
        restaurantName: restaurantName,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        // user: user.email,
        user:{},
        checked: false,
      });
    


    console.log("Document written with ID: ");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
})();

    setModalVisible(false)


  }
  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0,0,0,0.7)",
    },
    modalCheckoutContainer: {
      backgroundColor: "white",
      padding: 16,
      height: 500,
      borderWidth: 1,
    },
    restaurantName : {
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
    subtotalText: {
      textAlign: "left",
      fontWeight: "600",
      fontSize: 15,
      marginBottom: 10,
    },
  });
  const checkoutModalContent =() =>{
    return (
      <View style={styles.modalContainer}>
        <View style={styles.modalCheckoutContainer}>
          <Text style={styles.restaurantName}>{restaurantName}</Text>
          <ScrollView>
            {items.map((item, index) => (
              <OrderItem key={index} item={item} />
            ))}
            {details.map((item, index) => (
              <CartDetailsItem key={index} item={item} />
            ))}
            <View
              style={{
                padding: 20,
              }}
            >
              <Text style={{ fontWeight: "600", fontSize: 16 }}>
                Delivery option
              </Text>
            </View>
            {details2.map((item, index) => (
              <CartDetailsItem2 key={index} item={item} />
            ))}
            <Text style={{ fontWeight: "600", fontSize: 16 }}>
              Payment option 
            </Text>
            {details3.map((item, index) => (
              <CartDetailsItem key={index} item={item} />
            ))}

            {fees.map((item, index) => (
              <FeesItem key={index} item={item} />
            ))}
          </ScrollView>
          <View style={styles.subtotalContainer}>
            <Text style={styles.subtotalText}> subtotal</Text>
            <Text>{totalUSD}</Text>
          </View>
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
              onPress={() => addOrderToFirebase()}
            >
              <Text style={{ color: "white", fontSize: 20 }}> Checkout</Text>
              {/* <Text style ={{ position:'absolute',color:"white",right:20 ,fontSize:15,top:17}}>{total ? totalUSD : ""}</Text> */}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

    return (
      <>
        <Modal
          animationType="slide"
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          {checkoutModalContent()}
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
                  backgroundColor: "#282828",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  // alignItems: "center",
                  padding: 15,
                  borderRadius: 8,
                  width: 300,
                  height: 60,
                  position: "relative",
                }}
                onPress={() => setModalVisible(true)}
              >
                <Text style={{ color: "white", fontSize: 20, marginRight: 30 }}>
                  Basket( ${totalUSD})
                </Text>
                <Text style={{ color: "white", fontSize: 20, marginRight: 30 }}>
                  {/* ${totalUSD} */}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <></>
        )}
      </>
    );
}
