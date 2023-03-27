import React, { useRef } from "react";
import { View, Text,Image,StyleSheet, Animated, ScrollView } from "react-native";
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
console.log(H_SCROLL_DISTANCE);


export default function RestaurantDetails({ route ,navigation}) {
   const offset = useRef(new Animated.Value(0)).current;
   console.log('offset',offset)

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
        <SafeAreaView
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          forceInset={{ top: "always" }}
        >
          <AnimatedHeader route={route} animatedValue={offset} />

          <Divider width={1.8} style={{ marginVertical: 10 }} />
          <ScrollView
            style={{ flex: 1, backgroundColor: "white" }}
            contentContainerStyle={{
              // alignItems: "center",
              alignItems: "flex-start",
              paddingTop: 200,
              zIndex: 1,
              // paddingHorizontal: 20,
            }}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: offset } } }],
              { useNativeDriver: false }
            )}
          >
            <RestaurantTitle name={route.params.name} />
            <RestaurantDescription />

            <MenuItems restaurantName={route.params.name} />
          </ScrollView>
          <View style={styles.action}>
            <ViewCart
              navigation={navigation}
              restaurantName={route.params.name}
            />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
}
const RestaurantDescription = (props) => (
  <>
    <Text
      style={{
        marginTop: 10,
        marginHorizontal: 15,
        fontWeight: "700",
        fontSize: 15.5,
      }}
    >
      4.4 -vegan
    </Text>
    <Text
      style={{
        color: "gray",

        marginHorizontal: 15,
        fontWeight: "400",
        fontSize: 15.5,
      }}
    >
      Open till 8.pm
    </Text>
    <Text
      style={{
        color: "gray",
        marginHorizontal: 15,
        fontWeight: "400",
        fontSize: 15.5,
      }}
    >
      Click to get more information about the restaurant
    </Text>
    
    </>
)
const RestaurantTitle = (props) => (
  <Text
    style={{
      fontSize: 29,
      zIndex: 10,
      fontWeight: "600",
      marginTop: 0,
      marginHorizontal: 15,
    }}
  >
    {props.name}
  </Text>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    marginHorizontal: 20,
  },
  text: {
    fontSize: 30,
  },
  action: {
    flexDirection: "row",
    // borderWidth: 1,
    // borderRadius: 25,
    padding: 15,
    position: "absolute",
    bottom: 5,
    // backgroundColor: "#000",
    width: "50%",
    justifyContent: "space-around",
  },
  actionItem: {
    color: "#fff",
  },
});

