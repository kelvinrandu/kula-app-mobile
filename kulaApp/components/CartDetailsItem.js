import React ,{useState,useEffect}from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
} from "react-native";
import { CheckBox } from "@rneui/themed";
import MapComponent from './MapComponent';
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";


export default function CartDetailsItem({ item,type,location,setLocation,phone,setPhone }) {
  const { title, price } = item;
   const [mapModalVisible, setMapModalVisible] = useState(false);
      // const [location, setLocation] = useState(null);
            const [region, setRegion] = useState({
     
      });
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
       modalPaymentCheckoutContainer: {
         backgroundColor: "white",
         padding: 16,
         height: 500,

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
       inputText: {
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
               useEffect(() => {
                 (async () => {
                   let { status } =
                     await Location.requestForegroundPermissionsAsync();
                   if (status !== "granted") {
                     setErrorMsg("Permission to access location was denied");
                     return;
                   }

                   let location = await Location.getCurrentPositionAsync({});
           
                   let _region = {
                     latitude: parseFloat(location?.coords?.latitude),
                     longitude: parseFloat(location?.coords?.longitude),
                     latitudeDelta: 0.01,
                     longitudeDelta: 0.01,
                   };
                   let _location = {
                     latitude: parseFloat(location?.coords?.latitude),
                     longitude: parseFloat(location?.coords?.longitude),
                   };

                   setRegion(_region);
                   setLocation(_location);
                 })();
               }, []);
               console.log('region',region)
         return (
           <View style={styles.modalContainer}>
             <View style={styles.modalMapCheckoutContainer}>
               <Text style={styles.restaurantName}>here</Text>
               <MapComponent
                 setLocation={setLocation}
                 location={location}
                 setRegion={setRegion}
                 region={region}
               />

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
                   onPress={() => setMapModalVisible(false)}
                 >
                   <Text style={{ color: "white", fontSize: 20 }}> Done</Text>
                   {/* <Text style ={{ position:'absolute',color:"white",right:20 ,fontSize:15,top:17}}>{total ? totalUSD : ""}</Text> */}
                 </TouchableOpacity>
               </View>
             </View>
           </View>
         );
       };

        const PaymentModalContent = () => {
          const [active, setActive] = useState(false);
          const [isSelected, setIsSelected] = useState(false);
          const [check, setCheck] = useState(false);

          const [checkbox, setCheckbox] = useState(0);

          const [checkboxes, setCheckboxes] = useState([
            {
              id: 1,
              title: "Mpsea",
              checked: false,
            },
            {
              id: 2,
              title: "Paypal",
              checked: false,
            },
            {
              id: 3,
              title: "visa",
              checked: false,
            },
          ]);
          const setSelection = () => {};

          const onButtonPress = (e, value) => {
            console.log("here", e.target.checked, value);
            setCheckbox(value);
            setCheck(true);
            // const selectedCheckBoxes = checkboxes.find(
            //   (cb) => cb.checked === true
            // );
            // selectedCheckBoxes will have checboxes which are selected
          };
          // const checBoxesView = checkboxes.map((cb, index) => {
          return (
            <>
              <Modal
                animationType="slide"
                visible={check}
                transparent={true}
                onRequestClose={() => setCheck(false)}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalPaymentCheckoutContainer}>
                    <Text style={styles.restaurantName}>
                      Input Mpesa Number
                    </Text>
                    <View
                      style={{ flexDirection: "row", justifyContent: "center" }}
                    >
                      <TextInput
                        style={{
                          height: 40,
                          width: 300,

                          textAlign: "center",
                          borderColor: "gray",
                          borderWidth: 1,
                          position: "relative",

                          placeholderTextColor: "gray",
                        }}
                        onChangeText={(text) => setPhone(text)}
                        value={phone}
                        type="text"
                        placeholder="Enter phone "
                      />
                    </View>

                    <View
                      style={{ flexDirection: "row", justifyContent: "center" }}
                    >
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
                        onPress={() => setMapModalVisible(false)}
                      >
                        <Text style={{ color: "white", fontSize: 20 }}>
                          {" "}
                          Done
                        </Text>
                        {/* <Text style ={{ position:'absolute',color:"white",right:20 ,fontSize:15,top:17}}>{total ? totalUSD : ""}</Text> */}
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
              <View style={styles.modalContainer}>
                <View style={styles.modalMapCheckoutContainer}>
                  <Text style={styles.restaurantName}>Payment Options</Text>
                  {checkboxes.map((item, index) => (
                    <View>
                      {/* <CheckBox
              value={isSelected}
              onValueChange={setSelection}
              style={styles.checkbox}
            /> */}
                      <CheckBox
                        key={index}
                        index={index}
                        value={isSelected}
                        checked={checkbox == item.id ? true : false}
                        onPress={(e) => onButtonPress(e, item.id)}
                        // checked
                        title={item.title}
                      />
                    </View>
                  ))}

                  {/* 
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
              onPress={() => setMapModalVisible(false)}
            >
              <Text style={{ color: "white", fontSize: 20 }}> Done</Text>
             
            </TouchableOpacity>
          </View> */}
                </View>
              </View>
            </>
          );
          // });
        };
       
  return (
    <>
      <Modal
        animationType="slide"
        visible={mapModalVisible}
        transparent={true}
        onRequestClose={() => setMapModalVisible(false)}
      >
        {type == "map" ? MapModalContent() : PaymentModalContent(phone,setPhone)}
      </Modal>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          paddingTop:0,
          paddingBottom:0,
          borderBottomWidth: 1,
          borderBottomColor: "#616161",
        }}
      >
        <TouchableOpacity
          style={{
            marginTop: 10,

            // alignItems: "center",
            // padding: 5,
            paddingTop:5,
            paddingBottom:0,
            marginBottom:0,
            borderRadius: 8,
            width: 300,
            position: "relative",
          }}
          onPress={() => setMapModalVisible(true)}
        >
          <Text style={{ fontWeight: "600", fontSize: 16 }}>{title}</Text>
          <Text style={{ opacity: 0.7, fontSize: 16 }}>{price}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
