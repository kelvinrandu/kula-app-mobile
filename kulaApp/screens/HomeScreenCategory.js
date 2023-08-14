import React, { useState, useContext, useEffect,useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Modal,
  ScrollView,
  Image,
  TouchableOpacity,
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
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import { createDrawerNavigator } from "@react-navigation/drawer";


const auth = Firebase.auth();
  const checkoutModal2Content = (
    setModalVisible,
    navigation,
    restaurantData,title
  ) => {
    const food_category = [
      {
        id: 0,
        image: require("../assets/images/deals.png"),
        text: "Vegan",
        category: "Groceries",
      },
      {
        id: 1,
        image: require("../assets/images/fast-food.png"),
        text: "Vegetable",
        category: "African",
      },
      {
        id: 2,
        image: require("../assets/images/soft-drink.png"),
        text: "Lentice",
        category: "American",
      },
      {
        id: 3,
        image: require("../assets/images/coffee.png"),
        text: "Serves two",
        category: "African",
      },
    ];
    return (
      <View style={styles.modalContainer}>
        <View style={styles.modalCheckout2Container}>
          <ScrollView>
            <>
              <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <TouchableOpacity
                    // key={index}
                    // activeOpacity={1}
                    style={{
                      marginTop: 10,
                      marginBottom: 10,
                    }}
                    onPress={() => setModalVisible(false)}
                  >
                    <AntDesign name="left" size={25} color="black" />
                  </TouchableOpacity>
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
                      {title}
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
                </ScrollView>
              </SafeAreaView>
            </>
          </ScrollView>
        </View>
      </View>
    );
  };
const HomeScreenCategory = ({navigation}) => {
  // const [restaurantData, setRestaurantData] = useState(localRestaurants)
   const [restaurantData, setRestaurantData] = useState(localRestaurants);
   const [query, setQuery] = useState('');
   const [title, setTitle] = useState("");
     const [modalVisible, setModalVisible] = useState(false);
    const animation = useRef(null);
    const { user } = useContext(AuthenticatedUserContext);

    useEffect(() => {

    }, [restaurantData]);

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
            // navigation.navigate("HomeScreenCategoryList", {
            //   name: "The best restaurants",
            // })
            {
              setTitle('The best restaurants') 
              setModalVisible(true)}
       
          }
        >
          <View
            style={{
              borderColor: "black",
              // borderWidth:  1,  borderStyle:  'dashed',
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 10,
              // padding: 10,
            }}
          >
            <View
              style={{
                fontSize: 16,
                fontStyle: "normalize",
                fontWeight: 900,
                color: "#616161",
                // fontSize: 16px;
                lineHeight: "24px",
                // /* identical to box height, or 150% */

                // letter-spacing: -0.408px

                color: "#616161",
              }}
            >
              <Text
                style={{
                  // color: props.activeTab === props.text ? "white" : "black",
                  fontSize: 15,
                  fontWeight: "500",
                }}
              >
                The best restaurants :
              </Text>
            </View>
            <View
              style={{
                // backgroundColor: "#eee",
                // height: 30,
                // width: 30,
                color: "green",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 15,
              }}
            >
              <Text
                style={{
                  color: "green",
                }}
              >
                {" "}
                See All{" "}
              </Text>
            </View>
          </View>
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
          onPress={
            () => {
                 setTitle("Restaurants next to you"); 
              setModalVisible(true)
            // navigation.navigate("HomeScreenCategoryList", {
            //   name: "Restaurants next to you",
            // })
          }}
        >
          <View
            style={{
              borderColor: "black",
              // borderWidth:  1,  borderStyle:  'dashed',
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 10,
              // padding: 10,
            }}
          >
            <View
              style={{
                fontSize: 16,
                fontStyle: "normalize",
                fontWeight: 900,
                color: "#616161",
                // fontSize: 16px;
                lineHeight: "24px",
                // /* identical to box height, or 150% */

                // letter-spacing: -0.408px

                color: "#616161",
              }}
            >
              <Text
                style={{
                  // color: props.activeTab === props.text ? "white" : "black",
                  fontSize: 15,
                  fontWeight: "500",
                }}
              >
                Restaurants next to you :
              </Text>
            </View>
            <View
              style={{
                // backgroundColor: "#eee",
                // height: 30,
                // width: 30,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 15,
              }}
            >
              <Text
                style={{
                  color: "green",
                }}
              >
                {" "}
                See All{" "}
              </Text>
            </View>
          </View>
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
        <Modal
          animationType="slide"
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          {checkoutModal2Content(setModalVisible, navigation, restaurantData,title)}
        </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "white",
    // backgroundColor: "rgba(0,0,0,0.7)",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 10,

    // backgroundColor: "#eee",
    backgroundColor: "white",
  },
  modalCheckout2Container: {
    backgroundColor: "white",

    // height: 500,
    height: "100%",
    borderWidth: 1,
  },
});
export default HomeScreenCategory;


//  const data2= {"prompt": form.prompt}