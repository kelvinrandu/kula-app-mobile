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
import TopNavigationOrder from "../components/TopNavigationOrder";
// import MapView from 'react-native-maps';
// import MapViewDirections from 'react-native-maps-directions';
import MapView,{ PROVIDER_GOOGLE,Marker}from 'react-native-maps'


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
  const ModalContent = (setModal1Visible) => {
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
  const origin = {latitude: 37.3318456, longitude: -122.0296002};
  const destination = {latitude: 37.771707, longitude: -122.4053769};
  const GOOGLE_MAPS_APIKEY = 'AIzaSyBEEGhDViP0-DC6KGIqx5H59qEFY2vQBWA';
    return (
      <View style={styles.modal1Container}>
        <View style={styles.modalCheckout2Container}>

   
          <ScrollView>
            <>
   

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  // padding: 20,
                  paddingBottom: 20,
                  // borderBottomWidth: 1,
                  borderBottomColor: "999",
                }}
              >
                {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              
                </ScrollView> */}
              </View>


              <View
                style={
                  {
                    // padding: 20,
                    // paddingBottom: 20,
                    // paddingTop: 20,
                  }
                }
              ></View>
            </>
          </ScrollView>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              paddingHorizontal: 10,
              // padding: 3,
            }}
          >
 
            <TouchableOpacity
              style={{
                marginTop: 20,
                // backgroundColor: "green",
                alignItems: "center",
                padding: 15,
                paddingLeft: 10,
                borderRadius: 8,
                width: 200,
                position: "relative",
              }}
              onPress={() => {
                setModal1Visible(false)
     
              }}
            >
              {/* <Text style={{ color: "white", fontSize: 20 }}> Checkout</Text> */}
              <Text style={{ color: "black", fontSize: 20 }}>
               call william
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  const checkoutModal5Content = (setModal2Visible,animation) => {
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
      <View style={styles.modal1Container}>
      <View style={styles.modalCheckout2Container}>
      <View
            style={{
              flexDirection: "row",
              
              // justifyContent: "center",
              // padding: 20,
         
              // paddingTop: 20,
              paddingBottom: 10,
            }}
          >
            <></>
            <Text style={{ fontWeight: "600", fontSize: 16 }}>
              Chakula yako yaandaliwa
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              // padding: 20,
              paddingBottom: 20,
              // paddingTop: 20,
            }}
          >
            <></>
            <Text style={{ fontWeight: "400", fontSize: 16 }}>
              Your order is being prepared
            </Text>
          </View>
            <View style={styles.animationContainer}>
              <LottieView
                autoPlay
                ref={animation}
                style={{
                  width: 300,
                  height: 300,
                  // backgroundColor: "#eee",
                }}
                // Find more Lottie files at https://lottiefiles.com/featured
                source={require("../assets/animations/cooking.json")}
              />
            </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              paddingHorizontal: 10,
              padding: 3,
            }}
          >
            <TouchableOpacity
              style={{
                // marginTop: 20,
                backgroundColor: "green",
                alignItems: "center",
                padding: 15,
                paddingLeft: 10,
                borderRadius: 8,
                width: "90%",
                position: "relative",
              }}
              onPress={() => {
                setModal2Visible(false);
          
              }}
            >
              {/* <Text style={{ color: "white", fontSize: 20 }}> Checkout</Text> */}
              <Text style={{ color: "white", fontSize: 20 }}>
                {/* {total ? "Add ( " + totalUSD + "ksh )" : ""} */}
                Support
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
const HomeScreen = ({navigation}) => {
  // const [restaurantData, setRestaurantData] = useState(localRestaurants)
   const [restaurantData, setRestaurantData] = useState(localRestaurants);
   const [query, setQuery] = useState('');
   const [title, setTitle] = useState('');
   const [showNotification, setNotification] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible1, setModal1Visible] = useState(false);
    const [modalVisible2, setModal2Visible] = useState(false);
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
    <>
          {showNotification ? (
   <TopNavigationOrder setModal2Visible={setModal2Visible} setModal1Visible={setModal1Visible}/>
      ) : (
        <></>
      )}
    
  
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
            setNotification={setNotification}
          />
          <RestaurantItems
            navigation={navigation}
            restaurantData={restaurantData}
            setNotification={setNotification}
          />
          <RestaurantItems
            navigation={navigation}
            restaurantData={restaurantData}
            setNotification={setNotification}
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
            setTitle
          )}
        </Modal>
        <Modal
          animationType="slide"
          visible={modalVisible1}
          transparent={true}
          onRequestClose={() => setModal1Visible(false)}
        >
          {ModalContent(
            setModal1Visible
     
          )}
        </Modal>
        <Modal
          animationType="slide"
          visible={modalVisible2}
          transparent={true}
          onRequestClose={() => setModal2Visible(false)}
        >
          {  checkoutModal5Content(
            setModal2Visible,animation
     
          )}
        </Modal>
      
      </ScrollView>
      {/* <Divider width={1} />
      <BottomTabs /> */}
    </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "white",
    // backgroundColor: "rgba(0,0,0,0.7)",
  },
  modal1Container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    // marginTop: 30,
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

    height: 500,

    borderWidth: 1,
  },
});
export default HomeScreen;