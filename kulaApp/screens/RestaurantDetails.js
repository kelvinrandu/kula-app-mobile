import React, { useRef } from "react";
import { View, Text,Image, Animated, ScrollView } from "react-native";
import { Divider } from 'react-native-elements'
import About from '../components/About'
import MenuItems from '../components/MenuItems'
import ViewCart from '../components/ViewCart'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaView from "react-native-safe-area-view";
import AnimatedHeader from "../components/AnimatedHeader";

const H_MAX_HEIGHT = 150;
const H_MIN_HEIGHT = 52;
const H_SCROLL_DISTANCE = H_MAX_HEIGHT - H_MIN_HEIGHT;

export default function RestaurantDetails({ route ,navigation}) {
   const offset = useRef(new Animated.Value(0)).current;

    return (
      // <View>
      //   <About route={route} />
      //   <Divider width={1.8} style={{ marginVertical: 20 }} />

      //   <ScrollView
      //     showsVerticalScrollIndicator={true}
      //     stickyHeaderIndices={[0]}
      //   >
      //     <ViewCart
      //       navigation={navigation}
      //       restaurantName={route.params.name}
      //     />
      //     <MenuItems restaurantName={route.params.name} />
      //   </ScrollView>
      // </View>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }} forceInset={{ top: "always" }}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <AnimatedHeader animatedValue={offset} />
            <Text>Open up App.js to start working on your app!</Text>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
}
