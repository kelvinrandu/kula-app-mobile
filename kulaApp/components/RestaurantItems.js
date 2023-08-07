import React ,{useState,useContext,useEffect}from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Octicons from "react-native-vector-icons/Octicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { doc, getDoc,getDocs } from "firebase/firestore";
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
     useEffect(() => {
       console.log("reached",restaurants);
     }, [props.restaurantData]);
  
    // const docRef = doc(Firestore, "restaurants");
  (async () => {


try {
    const query = Firestore.collection("restaurants");
    // console.log("data", query);
    // const docSnap = query
    const docsSnap = await getDocs(query);
    docsSnap.forEach((doc) => {
      //  setCompany({ ...docSnap.data() });
     
      // setRests({ ...doc.data()});
    });
    // console.log('restaurants',rests)
 

} catch (e) {
  console.log("Error getting cached document:", e);
}
  })();
  console.log('restaurants-->',restaurants)
  useEffect(() => {
    console.log('hereerr')
  }, [restaurants]);
  
  return (
    <>
      {props.restaurantData.map((restaurant, index) => (
        // {rests.map((restaurant, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={1}
          // style={{
          //   marginBottom: 10,
          //   borderTopRightRadius: 20,
          //   borderTopLeftRadius: 20,
          // }}
          onPress={() =>
            navigation.navigate("RestaurantDetails", {
              name: restaurant.name,
              image: restaurant.image_url,
              categories: restaurant.categories,
              price: restaurant.price,
              reviews: restaurant.reviews,
              rating: restaurant.rating,
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
