import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Divider } from "react-native-elements";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";



const foods = [
  {
    title: "Ethiopian Platter",
    description:
      "Vegan Ethiopian Platter is a colorful and flavorful dish that features a variety of traditional Ethiopian vegan dishes served on a large platter.This dish typicaly includes...",
    price: "$13.50",
    category: "Main Dishes",
    image:
      "https://www.modernhoney.com/wp-content/uploads/2019/08/Classic-Lasagna-14-scaled.jpg",
  },
  {
    title: "Roasted Herbed Potatoes",
    description:
      "Roasted Herbed Potatoes are a delicous ans savory dish that will elevate any meal.Made from fresh potatoes that are roasted...",
    price: "$19.20",
    category: "Main Dishes",
    image: "https://i.ytimg.com/vi/BKxGodX9NGg/maxresdefault.jpg",
  },
  {
    title: "Pea & Potato Samosa",
    description:
      "Pea & Potato Samosas are a mouth-watering Inndian snack that combines the sweetness of peas and earthiness of potatoes wrapped in a crispy,golden brown pastry",
    price: "$14.50",
    category: "Main Dishes",
    image:
      "https://i2.wp.com/chilipeppermadness.com/wp-content/uploads/2020/11/Chilaquales-Recipe-Chilaquiles-Rojos-1.jpg",
  },
  {
    title: "Oat Porridge with Banana & Cinamon",
    description:
      "One can never go wrong with a chicken caesar salad. Healthy option with greens and proteins!",
    price: "$21.50",
    category: "Main Dishes",
    image:
      "https://images.themodernproper.com/billowy-turkey/production/posts/2019/Easy-italian-salad-recipe-10.jpg?w=1200&h=1200&q=82&fm=jpg&fit=crop&fp-x=0.5&fp-y=0.5&dm=1614096227&s=c0f63a30cef3334d97f9ecad14be51da",
  },
  {
    title: "Avocado & Tomato",
    description:
      "Chapati Wrap with Avocado & Tomato is a fresh and favourful lunch option that combines the soft and chewy texture of a traditional Indian flatbread with the...",
    price: "$13.50",
    category: "Chapati Wraps",
    image:
      "https://thestayathomechef.com/wp-content/uploads/2017/08/Most-Amazing-Lasagna-2-e1574792735811.jpg",
  },
  {
    title: "Vegan Beef Shawarma",
    description:
      "Vegan Beef Shawarma is a plant-based take on the classic Middle Eastern dish that is traditionally made with meat.This vegan version uses a meat substitute that...",
    price: "$21.50",
    category: "Chapati Wraps",
    image:
      "https://images.themodernproper.com/billowy-turkey/production/posts/2019/Easy-italian-salad-recipe-10.jpg?w=1200&h=1200&q=82&fm=jpg&fit=crop&fp-x=0.5&fp-y=0.5&dm=1614096227&s=c0f63a30cef3334d97f9ecad14be51da",
  },
  {
    title: "Banana ,Peanut Butter & Cinnamon",
    description:
      "Chapati Wrap with Banana,Peanut Butter & Cinamon is a delicious and indulgent breakfast or snack option that combines the sweatness of bananas with the rich and...",
    price: "$13.50",
    category: "Chapati Wraps",
    image:
      "https://thestayathomechef.com/wp-content/uploads/2017/08/Most-Amazing-Lasagna-2-e1574792735811.jpg",
  },
  {
    title: "Cacao Tribe",
    description:
      "Smoothie Bowl Cacao Tribe is a delicious and healthy breakfast or snack option that is packed with nutrients and flavour .This smoothie bowl features a blend of ripe...",
    price: "$13.50",
    category: "Smoothies Bowls",
    image:
      "https://thestayathomechef.com/wp-content/uploads/2017/08/Most-Amazing-Lasagna-2-e1574792735811.jpg",
  },
];

const styles = StyleSheet.create({
  menuItemStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#616161",
  },
  priceStyle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#616161",
  },
  listWrapper: {
    flex: 1,
    flexGrow: 1,
    width: "100%",
    height: 2000,
  },
  contentContainer: {
    paddingVertical: 20,
  },
});
export default function MenuItems({ restaurantName}) {

  const dispatch = useDispatch();
  const selectItem = (item, checkboxValue) => dispatch({
    type: 'ADD_TO_CART', payload: {item, restaurantName: restaurantName, checkboxValue:checkboxValue,}
  });
  const cartItems = useSelector(
    (state) => state.cartReducer.selectedItems.items
  );
  

  const isFoodInCart = (food, cartItems) =>{
      return Boolean(cartItems.find((item) => item.item.title === food.title)); 

  }
  
  
  return (
    <View>
      {/* <ScrollView style={styles.listWrapper}> */}
        {foods.map((food, index) => (
          <View key={index}>
            <View style={styles.menuItemStyle}>
              <BouncyCheckbox
                iconStyle={{ borderColor: "lightgray", borderRadius: 0 }}
                fillColor="green"
                onPress={(checkboxValue) => selectItem(food,checkboxValue)}
                isChecked={isFoodInCart(food, cartItems)}
                // onPress={isFoodInCart(food, cartItems)}
              />

              <FoodInfo food={food} />
              {/* <FoodImage food={food} /> */}
            </View>
            {/* <Divider
              width={0.5}
              orientation="vertical"
              style={{ marginHorizontal: 20 }}
            /> */}
          </View>
        ))}
      {/* </ScrollView> */}
    </View>
  );
}


const FoodInfo = (props) =>{
    return (
      <View style={{ width:220, justifyContent:"space-evenly"}}>
        <Text style={ styles.titleStyle }>{props.food.title}</Text> 
        <Text>{props.food.description}</Text>
        <Text style={ styles.priceStyle }>{props.food.price}</Text>
      </View>
    );

}
const FoodImage =(props)=>(
  <View>
    <Image source={{uri:props.food.image}} style={{ width:100,height:100,borderRadius:8}}/>
  </View>
)
