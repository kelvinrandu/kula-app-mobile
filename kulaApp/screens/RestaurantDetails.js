import React from 'react'
import { View, Text, ScrollView } from "react-native";
import { Divider } from 'react-native-elements'
import About from '../components/About'
import MenuItems from '../components/MenuItems'
import ViewCart from '../components/ViewCart'


export default function RestaurantDetails({ route ,navigation}) {
    return (
      <View>
        <About route={route} />
        <Divider width={1.8} style={{ marginVertical: 20 }} />

        <ScrollView
          showsVerticalScrollIndicator={true}
          stickyHeaderIndices={[0]}
        >
          <ViewCart
            navigation={navigation}
            restaurantName={route.params.name}
          />
          <MenuItems restaurantName={route.params.name} />
        </ScrollView>
      </View>
    );
}
