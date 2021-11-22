import React from 'react'
import { View, Text , Image } from 'react-native'


// const title = "Soul food";
// const description = "African •  Fast Food • $$  • 🎫 •4 ⭐ (2913+)";
// const restaurantInfo = {
//   name: "Soul food",
//   image: "",
//   price: "$$",
//   reviews: "1500",
//   rating: 4.5,
//   categories: [{ title: "African" }, { title: "Comfort Food" }],
// };
export default function About(props) {
  const {name,image,price,reviews,rating,categories} = props.route.params;
  const formattedCategories = categories.map((cat) => cat.title).join(" • ");
  const description = `${formattedCategories} ${
    price ? " • " + price : ""
  }   •🎫 • ${rating} ⭐  (${reviews}+)`;
    return (
      <View>
        <RestaurantImage image={image}/>
        <RestaurantTitle name={name} />
        <RestaurantDescription description={description} />
      </View>
    );
}

const RestaurantImage = (props) => (
  <Image
    source={{
      uri: props.image,
    }}
    style={{ width: "100%", height: 180 }}
  />
);

const RestaurantTitle = (props)=>(
    <Text style={{ fontSize:29,fontWeight:"600",marginTop:10,marginHorizontal:15,}}>{props.name}</Text>
)

const RestaurantDescription=(props)=>(
    <Text style={{ marginTop:10, marginHorizontal:15,fontWeight: '400', fontSize:15.5,
    }} >{props.description}</Text>

)