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
import MapComponent from './MapComponent';

import { getFirestore, doc, Timestamp } from "firebase/firestore";

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
  const [location, setLocation] = useState(null);
  const [phone, setPhone] = useState(null);
    const [mapModalVisible, setMapModalVisible] = useState(false);
  const {items, restaurantName} = useSelector((state)=> state.cartReducer.selectedItems);  
  const { user } = useContext(AuthenticatedUserContext);
  console.log(items);
  // console.log(user.email)
  const total = items
    .map((item) => Number(item.item.price.replace("ksh", "")))
    .reduce((prev, curr) => prev + curr, 0);
 
  const totalFinal = total +100;
    const totalKES = totalFinal.toLocaleString("en", {
      style: "currency",
      currency: "KES",
    });
  
  const totalUSD = total.toLocaleString("en", {
    style: "currency",
    currency: "KES",
  });
  const addOrderToFirebase =()=>{
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
  }

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
                  backgroundColor: "green",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  padding: 15,
                  borderRadius: 8,
                  width: 300,
                  height: 60,
                  position: "relative",
                }}
                onPress={() => setModalVisible(true)}
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
