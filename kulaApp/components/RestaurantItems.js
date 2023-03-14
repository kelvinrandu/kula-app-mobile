import React ,{useState,useContext,useEffect}from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { doc, getDoc,getDocs } from "firebase/firestore";
import Firebase, { Firestore } from "../config/firebase";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
export const localRestaurants = [
  {
    name: "Tiki Bar",
    image_url:
      "https://www.google.com/maps/uv?pb=!1s0x184048ba74acb361%3A0xf9e71858980d8906!3m1!7e115!4shttps%3A%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipOH8btX3xQCR3_sgZb0f-9f-fx4W45i5seaDD3l%3Dw213-h160-k-no!5stikibar%20-%20Google%20Search!15sCgIgAQ&imagekey=!1e10!2sAF1QipNOgs8PFA3tYxJpYfWKQtxXls0nZKUWYJszUM0D&hl=en&sa=X&ved=2ahUKEwiqhJX8p67zAhW4BGMBHcjiB9kQoip6BAh-EAM#",
    categories: [{ title: "American" }, { title: "Comfort Food" }],
    price: "$$",
    reviews: 1244,
    rating: 4.5,
  },
  {
    name: "Panorama",
    image_url:
      "https://www.google.com/maps/uv?pb=!1s0x184048ba74acb361%3A0xf9e71858980d8906!3m1!7e115!4shttps%3A%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipOH8btX3xQCR3_sgZb0f-9f-fx4W45i5seaDD3l%3Dw213-h160-k-no!5stikibar%20-%20Google%20Search!15sCgIgAQ&imagekey=!1e10!2sAF1QipNOgs8PFA3tYxJpYfWKQtxXls0nZKUWYJszUM0D&hl=en&sa=X&ved=2ahUKEwiqhJX8p67zAhW4BGMBHcjiB9kQoip6BAh-EAM#",
    categories: [{ title: "African" }, { title: "Comfort Food" }],
    price: "$$",
    reviews: 1244,
    rating: 4.5,
  },
  {
    name: "Amigos Bar",
    image_url:
      "https://www.google.com/maps/uv?pb=!1s0x184048ba74acb361%3A0xf9e71858980d8906!3m1!7e115!4shttps%3A%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipOH8btX3xQCR3_sgZb0f-9f-fx4W45i5seaDD3l%3Dw213-h160-k-no!5stikibar%20-%20Google%20Search!15sCgIgAQ&imagekey=!1e10!2sAF1QipNOgs8PFA3tYxJpYfWKQtxXls0nZKUWYJszUM0D&hl=en&sa=X&ved=2ahUKEwiqhJX8p67zAhW4BGMBHcjiB9kQoip6BAh-EAM#",
    categories: [{ title: "African" }, { title: "Comfort Food" }],
    price: "$$",
    reviews: 1244,
    rating: 4.5,
  },
  {
    name: "Soul food",
    image_url:
      "https://www.google.com/maps/uv?pb=!1s0x184048ba74acb361%3A0xf9e71858980d8906!3m1!7e115!4shttps%3A%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipOH8btX3xQCR3_sgZb0f-9f-fx4W45i5seaDD3l%3Dw213-h160-k-no!5stikibar%20-%20Google%20Search!15sCgIgAQ&imagekey=!1e10!2sAF1QipNOgs8PFA3tYxJpYfWKQtxXls0nZKUWYJszUM0D&hl=en&sa=X&ved=2ahUKEwiqhJX8p67zAhW4BGMBHcjiB9kQoip6BAh-EAM#",
    categories: [{ title: "American" }, { title: "Comfort Food" }],
    price: "$$",
    reviews: 1244,
    rating: 4.5,
  },
  {
    name: "Chillspot Bar",
    image_url:
      "https://www.google.com/maps/uv?pb=!1s0x184048ba74acb361%3A0xf9e71858980d8906!3m1!7e115!4shttps%3A%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipOH8btX3xQCR3_sgZb0f-9f-fx4W45i5seaDD3l%3Dw213-h160-k-no!5stikibar%20-%20Google%20Search!15sCgIgAQ&imagekey=!1e10!2sAF1QipNOgs8PFA3tYxJpYfWKQtxXls0nZKUWYJszUM0D&hl=en&sa=X&ved=2ahUKEwiqhJX8p67zAhW4BGMBHcjiB9kQoip6BAh-EAM#",
    categories: [{ title: "African" }, { title: "Comfort Food" }],
    price: "$$",
    reviews: 1244,
    rating: 4.5,
  },
];

export default function RestaurantItem({navigation, ...props}) {
   const [restaurants, setRestaurants] = useState(props.restaurantData);
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
     
      // setRestaurants({ ...doc.data()});
    });

} catch (e) {
  console.log("Error getting cached document:", e);
}
  })();
  // console.log('restaurants-->',restaurants)
  useEffect(() => {
    console.log('hereerr')
  }, [restaurants]);
  
  return (
    <>
      {props.restaurantData.map((restaurant, index) => (

        <TouchableOpacity
          key={index}
          activeOpacity={1}
          style={{ marginBottom: 10 }}
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
            style={{ marginTop: 10, padding: 15, backgroundColor: "white" }}
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
      style={{ width: "100%", height: 180 }}
    />
    <TouchableOpacity style={{ position: "absolute", right: 20, top: 20 }}>
      <MaterialCommunityIcons name="heart-outline" size={25} color="#fff" />
    </TouchableOpacity>
  </>
);

const RestaurantInfo = (props) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10,
    }}
  >
    <View style={{ fontSize: 15, fontWeight: "bold" }}>
      <Text> {  props.name }</Text>
      <Text style={{ fontSize: 13, color: "gray" }}> 35-45 • min </Text>
    </View>
    <View style={{ backgroundColor: "#eee", height: 30, width: 30 ,alignItems:"center",justifyContent:"center",borderRadius:15,}} >
      <Text> {props.rating} </Text>
    </View>
  </View>
);
