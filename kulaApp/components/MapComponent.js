import React from 'react'

import {View ,Text,StyleSheet} from 'react-native'
import MapView,{ PROVIDER_GOOGLE}from 'react-native-maps'
import { StatusBar } from 'expo-status-bar'

export default function MapComponent() {
  return (
    <View style={styles.container}>
      <Text></Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{ height: "100%", width: "100%" }}
        showsUserLocation={true}
        PROVIDER={PROVIDER_GOOGLE}
      />
      <StatusBar />
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