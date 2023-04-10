import React from 'react'
import MpaView from 'react-native-maps'
import {View ,Text,StyleSheet} from 'react-native'
import MapView,{ PROVIDER_GOOGLE}from 'react-native-maps'
import { StatusBar } from 'expo-status-bar'

export default function MapComponent() {
  return (
    <View>
      <Text></Text>
      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{ height: "50%", width: "100%" }}
        showsUserLocation={true}
        PROVIDER={PROVIDER_GOOGLE}
      />
      <StatusBar />
    </View>
  );
}

const styles =StyleSheet.create({
    container:{

        flex:1,
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center',

    }
})