import React, { useRef } from "react";
import { View, Text,Image, Animated, ScrollView } from "react-native";
import { Divider } from 'react-native-elements'
import About from '../components/About'
import MenuItems from '../components/MenuItems'
import ViewCart from '../components/ViewCart'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaView from "react-native-safe-area-view";
import AnimatedHeader from "../components/AnimatedHeader";

const DATA = [
  {
    id: 1,
    title: "The Hunger Games",
  },
  {
    id: 2,
    title: "Harry Potter and the Order of the Phoenix",
  },
  {
    id: 3,
    title: "To Kill a Mockingbird",
  },
  {
    id: 4,
    title: "Pride and Prejudice",
  },
  {
    id: 5,
    title: "Twilight",
  },
  {
    id: 6,
    title: "The Book Thief",
  },
  {
    id: 7,
    title: "The Chronicles of Narnia",
  },
  {
    id: 8,
    title: "Animal Farm",
  },
  {
    id: 9,
    title: "Gone with the Wind",
  },
  {
    id: 10,
    title: "The Shadow of the Wind",
  },
  {
    id: 11,
    title: "The Fault in Our Stars",
  },
  {
    id: 12,
    title: "The Hitchhiker's Guide to the Galaxy",
  },
  {
    id: 13,
    title: "The Giving Tree",
  },
  {
    id: 14,
    title: "Wuthering Heights",
  },
  {
    id: 15,
    title: "The Da Vinci Code",
  },
];

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
          <AnimatedHeader route={route} animatedValue={offset} />

          <Divider width={1.8} style={{ marginVertical: 20 }} />

          {/* <ScrollView
            style={{ flex: 1, backgroundColor: "white" }}
            contentContainerStyle={{
              alignItems: "center",
              paddingTop: 220,
              paddingHorizontal: 20,
            }}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: offset } } }],
              { useNativeDriver: false }
            )}
          >
            <MenuItems restaurantName={route.params.name} />
          </ScrollView> */}
          <ScrollView
            style={{ flex: 1, backgroundColor: "white" }}
            contentContainerStyle={{
              // alignItems: "center",
              alignItems: "flex-start",
              paddingTop: 300,
              zIndex: 1,
              paddingHorizontal: 20,
            }}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: offset } } }],
              { useNativeDriver: false }
            )}
          >
            <ViewCart
              navigation={navigation}
              restaurantName={route.params.name}
            />
            <MenuItems restaurantName={route.params.name} />
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    );
}
