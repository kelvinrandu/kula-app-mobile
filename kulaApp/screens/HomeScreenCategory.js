import React, { useState, useContext, useEffect,useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native";
// import { View, Text, Image } from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import Categories from "../components/Categories";
import HeaderTabs from "../components/HeaderTabs";
import BottomTabs from "../components/BottomTabs";
import { Divider } from "react-native-elements";
import RestaurantItems, { localRestaurants } from "../components/RestaurantItems";
import SearchBar from "../components/SearchBar";
import Firebase from "../config/firebase";
import { IconButton } from "../components";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import SearchText from "../components/SearchText";
import LottieView from "lottie-react-native";



const auth = Firebase.auth();

const HomeScreenCategory = ({navigation}) => {
  // const [restaurantData, setRestaurantData] = useState(localRestaurants)
   const [restaurantData, setRestaurantData] = useState(localRestaurants);
   const [query, setQuery] = useState('');
    const animation = useRef(null);
    const { user } = useContext(AuthenticatedUserContext);

    useEffect(() => {
      // setRestaurantData(restaurantData);
      console.log("changed", restaurantData[0].image_url);
      // setRestaurantData(restaurantData);
    }, [restaurantData]);
        // useEffect(() => {
        //   setRestaurantData(localRestaurants);
        //   console.log(" query changed");
        //   // setRestaurantData(restaurantData);
        // }, [query]);
  const search=(query) =>{
    console.log(query)
    let resti = localRestaurants.filter((price) =>
      price.categories.find((o) => o.title === query)
    );
      let result = resti;
      setQuery(query);
      setRestaurantData(result);
     

    }
    const handleSignOut = async () => {
      try {
        await auth.signOut();
      } catch (error) {
        console.log(error);
      }
    };
    // console.log("res->", restaurantData);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ backgroundColor: "white", padding: 15 }}>
        <StatusBar style="dark-content" />
        <IconButton
          name="logout"
          size={24}
          color="#fff"
          onPress={handleSignOut}
        />
        <HeaderTabs color={""} />

        {/* <SearchBar search={search} /> */}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchText text={"Choose a Category"} />
        <Categories search={search} />
        {/* <SearchText text={"The best restaurants"} /> */}
        <TouchableOpacity
          style={{
            // backgroundColor: props.activeTab === props.text ? "black" : "white",
            // color: props.activeTab === props.text ? "black" : "white",
            paddingVertical: 6,
            paddingHorizontal: 16,
            borderRadius: 30,
          }}
          onPress={() =>
            navigation.navigate("HomeScreenCategoryList", {
              name: "The best restaurants",
            })
          }
        >
          <Text
            style={{
              // color: props.activeTab === props.text ? "white" : "black",
              fontSize: 15,
              fontWeight: "500",
            }}
          >
            The best restaurants
          </Text>
        </TouchableOpacity>
        <View style={styles.shadow}>
          <RestaurantItems
            navigation={navigation}
            restaurantData={restaurantData}
          />
          <RestaurantItems
            navigation={navigation}
            restaurantData={restaurantData}
          />
          <RestaurantItems
            navigation={navigation}
            restaurantData={restaurantData}
          />
        </View>
        <TouchableOpacity
          style={{
            // backgroundColor: props.activeTab === props.text ? "black" : "white",
            // color: props.activeTab === props.text ? "black" : "white",
            paddingVertical: 10,
            paddingHorizontal: 16,
            borderRadius: 30,
          }}
          onPress={() =>
            navigation.navigate("HomeScreenCategoryList", {
              name: "Restaurants next to you",
            })
          }
        >
          <Text
            style={{
              // color: props.activeTab === props.text ? "white" : "black",
              fontSize: 15,
              fontWeight: "500",
            }}
          >
            Restaurants next to you
          </Text>
        </TouchableOpacity>
        <View style={styles.shadow}>
          <RestaurantItems
            navigation={navigation}
            restaurantData={restaurantData}
          />
          <RestaurantItems
            navigation={navigation}
            restaurantData={restaurantData}
          />
          <RestaurantItems
            navigation={navigation}
            restaurantData={restaurantData}
          />
        </View>
        {/* <RestaurantItems
          navigation={navigation}
          restaurantData={restaurantData}
        /> */}

        {/* <LottieView
          autoPlay
          ref={animation}
          style={{
            width: 200,
            height: 200,
            backgroundColor: "#eee",
          }}
          // Find more Lottie files at https://lottiefiles.com/featured
          source={
            "https://assets5.lottiefiles.com/packages/lf20_cAsTAnQtxv.json"
          }
        /> */}
      </ScrollView>
      {/* <Divider width={1} />
      <BottomTabs /> */}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    marginTop: 30,
    // backgroundColor: "#eee",
    backgroundColor: "white",
  },
});
export default HomeScreenCategory;


//  const data2= {"prompt": form.prompt}