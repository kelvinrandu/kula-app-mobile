import React ,{useState,useEffect}from 'react'

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,TextInput,
} from "react-native";
import MapView,{ PROVIDER_GOOGLE,Marker}from 'react-native-maps'
import { StatusBar } from 'expo-status-bar'
import * as Location from "expo-location";

export default function MapComponent({
  region,
  setRegion,
  setLocation,
  location,
  loc,
  setLoc,
  setMapModalVisible,
}) {
  // const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const userCoords = {
    latitude: parseFloat(region?.coords?.latitude),
    longitude: parseFloat(region?.coords?.longitude),
  };
  // const [region, setRegion]=useState({})
  // const [region, setRegion] = useState({
  //   latitude: 33.8220918,
  //   longitude: -117.9199742,
  //   latitudeDelta: 0.05,
  //   longitudeDelta: 0.05,
  // });
  // const tokyoRegion = {
  //   latitude: 35.6762,
  //   longitude: 139.6503,
  //   latitudeDelta: 0.01,
  //   longitudeDelta: 0.01,
  // };
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
    })();
  }, []);
  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <MapView
        style={styles.map}
        initialRegion={region}

        showsUserLocation={true}
        // PROVIDER={PROVIDER_GOOGLE}
        // onRegionChangeComplete={(region) => console.log("route", region)}
      >
        <Marker
          // pinColor="green"
          draggable
          coordinate={location}
          title="Home"
          onDragEnd={(e) => {
            setLocation(e.nativeEvent.coordinate);
            console.log("dragEnd", e.nativeEvent.coordinate);
          }}
        >
          <Image
            source={require("../assets/splash.png")}
            style={{ height: 45, width: 45 }}
          />
        </Marker>
      </MapView>
      <StatusBar />
      <View style={{ flexDirection: "column", justifyContent: "center" }}>
        <View>
          <TextInput
            style={{
              height: 40,
              width: 300,
              marginBottom: 20,

              textAlign: "center",
              borderColor: "gray",
              borderWidth: 1,
              position: "relative",

              placeholderTextColor: "black",
            }}
            onChangeText={(text) => setLoc(text)}
            value={loc}
            type="text"
            placeholder="House/apartment/door"
          />
          <TextInput
            style={{
              height: 40,
              width: 300,

              textAlign: "center",
              borderColor: "gray",
              borderWidth: 1,
              position: "relative",

              placeholderTextColor: "black",
            }}
            //  onChangeText={(text) => setPhone(text)}
            //  value={phone}
            type="number"
            placeholder="Notes "
          />
        </View>
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
          onPress={() => setMapModalVisible(false)}
        >
          <Text style={{ color: "white", fontSize: 20 }}> Done</Text>
          {/* <Text style ={{ position:'absolute',color:"white",right:20 ,fontSize:15,top:17}}>{total ? totalUSD : ""}</Text> */}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});