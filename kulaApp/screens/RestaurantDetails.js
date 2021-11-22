import React from 'react'
import { View, Text, ScrollView } from "react-native";
import { Divider } from 'react-native-elements'
import About from '../components/About'
import MenuItems from '../components/MenuItems'

export default function RestaurantDetails() {
    return (
      <View>
        <About />
        <Divider width={1.8} style={{ marginVertical: 20 }} />
        <ScrollView
          showsVerticalScrollIndicator={true}
        >
          <MenuItems />
        </ScrollView>
      </View>
    );
}
