import React, { useState, useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, Text, SafeAreaView, ScrollView } from "react-native";
import Categories from "../components/Categories";
import HeaderTabs from "../components/HeaderTabs";
import BottomTabs from "../components/BottomTabs";
import { Divider } from "react-native-elements";
import RestaurantItems, { localRestaurants } from "../components/RestaurantItems";
import SearchBar from "../components/SearchBar";
import Firebase from "../config/firebase";
import { IconButton } from "../components";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";


const auth = Firebase.auth();

const HomeScreen = ({navigation}) => {
  // const [restaurantData, setRestaurantData] = useState(localRestaurants)
   const [restaurantData, setRestaurantData] = useState(localRestaurants);
    const { user } = useContext(AuthenticatedUserContext);

    useEffect(() => {
      // setRestaurantData(restaurantData);
      console.log("changed", restaurantData);
      setRestaurantData(restaurantData);
      
    }, [restaurantData]);
  const search=( query) =>{
    let resti = restaurantData.filter(
      
      (price) => price.categories.find((o) => o.title === "African")
    );
      let result = resti;
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
        <HeaderTabs />
        <SearchBar search={search} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories  search={search} />
        <RestaurantItems
          navigation={navigation}
          restaurantData={restaurantData}
        />
      </ScrollView>
      <Divider width={1} />
      <BottomTabs />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    marginTop: 30,
    backgroundColor:"#eee",
    
  },
});
export default HomeScreen;
