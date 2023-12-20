import React ,{useState,useContext,useEffect}from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Octicons from "react-native-vector-icons/Octicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { doc, getDoc,getDocs,onSnapshot } from "firebase/firestore";
import Firebase, { Firestore } from "../config/firebase";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";

// import { normalize } from "path";
export const localRestaurants = [
  {
    name: "Tribeearth  VEGAN ",
    image_url:
      "https://firebasestorage.googleapis.com/v0/b/linkedin-ba98a.appspot.com/o/tribearth.jpeg?alt=media&token=b00c8cb9-6a47-4377-81e1-be7cabd30efb",
    categories: [{ title: "American" }, { title: "Comfort Food" }],
    price: "$$",
    reviews: 1244,
    rating: 4.5,
  },

];

export default function RestaurantItem({navigation, ...props}) {
  //  const [restaurants, setRestaurants] = useState();
   const [restaurants, setRestaurants] = useState(props.restaurantData);
    const [rests, setRests] = useState();
    const [todos, setTodos] = useState([]);


    useEffect(() => {
      const todoRef = Firestore.collection("restaurants");
    
      const subscriber = onSnapshot(todoRef, {
        next: (snapshot) => {
          const todos = [];
          snapshot.docs.forEach((doc) => {
            todos.push({
              id: doc.id,
              ...doc.data()
            });
          });
    
          setTodos(todos);
        }
      });
    
      // // Unsubscribe from events when no longer in use
      return () => subscriber();
    }, []);

    
    


//   (async () => {
// try {
//   const _orders = [];
//     const query = Firestore.collection("restaurants");
//     const docsSnap = await getDocs(query);
//     docsSnap.forEach((doc) => {
//       let dat={data:doc.data(),id:doc.id} 
//       _orders.push(dat);
//     });
//     setRests(_orders);

// } catch (e) {
//   console.log("Error getting cached document:", e);
// }
//   })();

    const ModalContent = () => {
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
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    // padding: 20,
                    paddingBottom: 20,
                    paddingTop: 20,
                    // borderBottomWidth: 1,
                    borderBottomColor: "999",
                  }}
                >
                  <></>
                  <Text style={{ fontWeight: "600", fontSize: 16 }}>
                    {select?.title}
                  </Text>
                  <Text style={{ fontWeight: "600", fontSize: 16 }}>
                    {" "}
                    {select?.price}
                  </Text>
                </View>

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
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {food_category.map((item, index) => (
                      <View
                        onPress={() => console.log("here")}
                        key={index}
                        style={{
                          // alignItems: "center",
                          // marginRight: 30,
                          marginHorizontal: 0,
                          // marginTop: 20,
                          paddingHorizontal: 2,
                          marginBottom: 5,
                        }}
                      >
                        <TouchableOpacity
                          style={styles.activeCategory}
                          onPress={() => {
                            setActive(item.id);
                            search(item.text);
                          }}
                        >
                          <Text style={styles.activeTextCategory}>
                            {item.text}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </ScrollView>
                </View>
                <View>
                  <Text style={{ opacity: 0.7, fontSize: 16 }}>
                    Ethiopian platter is a very healthy vegan platter with
                    lentils, vegetables, and fermented flatbread Injera. The
                    platter is rich in fiber, gluten-free, and a combination of
                    complex flavors. Moreover, this recipe has 7 different side
                    dishes with different vegetables and lentils. Some recipes
                    call for an Ethiopian spice blend called Berbere or with
                    simple spices.
                  </Text>
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

                  backgroundColor: "white",
                  borderColor: "gray",
                  border: "1px solid gray",
                  alignItems: "center",
                  padding: 13,
                  borderRadius: 8,
                  width: 180,
                  borderWidth: 1,
                  marginRight: 15,
                  // borderBottomWidth:{(title=="Deliver option") ? 0: 1}
                  // borderBottomWidth: 1,
                  borderColor: "#616161",

                  position: "relative",
                }}
              >
                <View
                  spacing={6}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 10,
                  }}
                >
                  <AntDesign
                    style={{
                      paddingLeft: 10,
                    }}
                    name="minus"
                    onPress={() => decreasePrice()}
                    size={30}
                    color="black"
                  />
                  <Text
                    style={{
                      fontWeight: "600",
                      fontSize: 20,
                      paddingRight: 20,
                      paddingLeft: 20,
                    }}
                  >
                    {" "}
                    {quantity}
                  </Text>

                  <Ionicons
                    style={{
                      paddingRight: 10,
                    }}
                    onPress={() => {
                      // updateItem(select);
                      increasePrice();
                    }}
                    name="add"
                    size={30}
                    color="black"
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginTop: 20,
                  backgroundColor: "green",
                  alignItems: "center",
                  padding: 15,
                  paddingLeft: 10,
                  borderRadius: 8,
                  width: 200,
                  position: "relative",
                }}
                onPress={() => {
                  // setModalVisible1(true);
                  isFoodInCart(select, cartItems)
                    ? console.log("here")
                    : selectItem(select, ind);
                  setModalVisible(false);
                }}
              >
                {/* <Text style={{ color: "white", fontSize: 20 }}> Checkout</Text> */}
                <Text style={{ color: "white", fontSize: 20 }}>
                  {select?.price ? "Add ( " + price + " )" : ""}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    };
  return (
    <>
{todos?console.log('here',todos):console.log('not here')}
    {/* {props.restaurantData.map((restaurant, index) => ( */}
        {todos.map((restaurant, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={1}
          // style={{
          //   marginBottom: 10,
          //   borderTopRightRadius: 20,
          //   borderTopLeftRadius: 20,
          // }}
          // onPress={() =>
          //   navigation.navigate("RestaurantDetails", {
          //     name: restaurant.name,
          //     image: restaurant.image_url,
          //     categories: restaurant.categories,
          //     price: restaurant.price,
          //     reviews: restaurant.reviews,
          //     rating: restaurant.rating,
          //   })
          // }
          onPress={() =>
            navigation.navigate("HomeScreenScroll", {
              name: restaurant.name,
              image: restaurant.image_url,
              categories: restaurant.categories,
              price: restaurant.price,
              reviews: restaurant.reviews,
              rating: restaurant.rating,
              setNotification: props.setNotification,
            })
          }
        >
          <View
            style={{
              marginTop: 10,
              padding: 4,
              borderTopRightRadius: 20,
              // borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              // borderBottomLeftRadius: ,
              borderBottomEndRadius: 20,
              borderBottomStartRadius: 15,
              borderBottomRightRadius: 20,
              // borderColor: "black",
              // borderWidth:2,
              // borderStyle:"dashed",
              // shadowColor: "#171717",
              // shadowOffset: { width: -2, height: 4 },
              // shadowOpacity: 0.2,
              // shadowRadius: 3,
              // borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.23,
              shadowRadius: 2.62,

              elevation: 4,
            }}
          >
            <RestaurantImage image={restaurant.image_url} />
            <RestaurantInfo name={restaurant.name} rating={restaurant.rating} />
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
}

const RestaurantImage = (props) => (
  <>
    <Image
      source={{
        uri: props.image,
      }}
      style={{ width: "100%", height: 180,borderTopRightRadius:20,borderTopLeftRadius:20}}
    />
    <TouchableOpacity style={{ position: "absolute", right: 20, top: 20 }}>
      <MaterialCommunityIcons name="heart-outline" size={25} color="#fff" />
    </TouchableOpacity>
  </>
);

const RestaurantInfo = (props) => (
  <View
    style={{
      borderColor: "black",
      // borderWidth:  1,  borderStyle:  'dashed',
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10,
      padding: 10,
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
      <Text> {props.name}</Text>

      <Text style={{ fontSize: 13, color: "gray" }}>
        {" "}
        <Octicons
          style={{ marginRight: 13 }}
          name="stopwatch"
          size={20}
          color="black"
        />{" "}
        Open till 8pm{" "}
        <MaterialCommunityIcons name="motorbike" size={25} color="black" /> 250
        ksh {" "}<MaterialIcons name="restaurant-menu" size={20} color="black" />
        {" "}vegan
      </Text>
    </View>
    <View
      style={{
        backgroundColor: "#eee",
        height: 30,
        width: 30,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
      }}
    >
      <Text> {props.rating} </Text>
    </View>
  </View>
);
