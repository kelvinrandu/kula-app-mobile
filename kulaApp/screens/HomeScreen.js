import React, { useState, useContext, useEffect,useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, Text, SafeAreaView, ScrollView,Image ,Modal,TouchableOpacity} from "react-native";
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
import AntDesign from "react-native-vector-icons/AntDesign";


const auth = Firebase.auth();
  const checkoutModal2Content = (
    setModalVisible,
    navigation,
    restaurantData,
    title
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
const HomeScreen = ({navigation}) => {
  // const [restaurantData, setRestaurantData] = useState(localRestaurants)
   const [restaurantData, setRestaurantData] = useState(localRestaurants);
   const [query, setQuery] = useState('');
   const [title, setTitle] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const animation = useRef(null);
    const { user } = useContext(AuthenticatedUserContext);

    useEffect(() => {
      // setRestaurantData(restaurantData);
      console.log("changed");
      // setRestaurantData(restaurantData);
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
        <Categories
          setModalVisible={setModalVisible}
          setTitle={setTitle}
          //  search={search}
        />
        <SearchText
          navigation={navigation}
          restaurantData={restaurantData}
          text={"Choose a Category"}
        />
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
          {checkoutModal2Content(
            setModalVisible,
            navigation,
            restaurantData,
            title,
            setTitle,
          )}
        </Modal>
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
    marginTop: 30,
    // backgroundColor: "#eee",
    backgroundColor: "white",
  },
  shadow: {
    // borderColor: "black",
    // borderWidth: 5,
    // bordrerStyle: "dashed",
    padding: -2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  modalCheckout2Container: {
    backgroundColor: "white",

    // height: 500,
    height: "100%",
    borderWidth: 1,
  },
});
export default HomeScreen;


//  const data2= {"prompt": form.prompt}