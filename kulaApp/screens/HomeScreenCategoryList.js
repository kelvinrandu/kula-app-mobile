import React, { useState, useContext, useEffect,useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, Text, SafeAreaView, ScrollView,Image,TouchableOpacity } from "react-native";
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
import BoxShadow from "../components/BoxShadow";



const auth = Firebase.auth();

const HomeScreenCategoryList = ({ route,navigation }) => {
  // const [restaurantData, setRestaurantData] = useState(localRestaurants)
  const [restaurantData, setRestaurantData] = useState(localRestaurants);
  const [query, setQuery] = useState("");
  const animation = useRef(null);
  const { user } = useContext(AuthenticatedUserContext);

  useEffect(() => {
    // setRestaurantData(restaurantData);
    console.log("changed");
    // setRestaurantData(restaurantData);
  }, [restaurantData]);
  // useEffect(() => {
  //   setRestaurantData(localRestaurants);
  //   console.log(" query changed");
  //   // setRestaurantData(restaurantData);
  // }, [query]);
  const search = (query) => {
    console.log(query);
    let resti = localRestaurants.filter((price) =>
      price.categories.find((o) => o.title === query)
    );
    let result = resti;
    setQuery(query);
    setRestaurantData(result);
  };
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
      {/* <View style={{ backgroundColor: "white", padding: 15 }}>
        <StatusBar style="dark-content" />
        <IconButton
          name="logout"
          size={24}
          color="#fff"
          onPress={handleSignOut}
        />
        <HeaderTabs color={""} />

    
      </View> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <SearchText text={"Choose a Category"} />
        <Categories search={search} /> */}
        <TouchableOpacity
          style={{
            // backgroundColor: props.activeTab === props.text ? "black" : "white",
            // color: props.activeTab === props.text ? "black" : "white",
            paddingVertical: 20,
            paddingHorizontal: 16,
            borderRadius: 30,
          }}
        >
          <Text
            style={{
              // color: props.activeTab === props.text ? "white" : "black",
              fontSize: 20,
              fontWeight: "900",
            }}
          >
            {route.params.name}
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
  shadow: {
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    shadowOpacity: 1,
    elevation: 3,
    // background color must be set
    backgroundColor: "#0000", // invisible color
  },
});
export default HomeScreenCategoryList;


//  const data2= {"prompt": form.prompt}