import React from 'react'
import { View, Text , Image } from 'react-native'


const title = "Soul food";
const description = "African •  Fast Food • $$  • 🎫 •4 ⭐ (2913+)";
 
export default function About() {
    return (
      <View>
        <RestaurantImage />
        <RestaurantTitle title={title} />
        <RestaurantDescription description={description} />
      </View>
    );
}

const RestaurantImage = (props) => (
  <Image
    source={require("../assets/images/foodthai.jpg")}
    style={{ width: "100%", height: 180 }}
  />
);

const RestaurantTitle = (props)=>(
    <Text style={{ fontSize:29,fontWeight:"600",marginTop:10,marginHorizontal:15,}}>{props.title}</Text>
)

const RestaurantDescription=(props)=>(
    <Text style={{ marginTop:10, marginHorizontal:15,fontWeight: '400', fontSize:15.5,
    }} >{props.description}</Text>

)