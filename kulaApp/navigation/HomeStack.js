import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import HomeScreenCategory from "../screens/HomeScreenCategory";
import HomeScreenCategoryList from "../screens/HomeScreenCategoryList";
import HomeScreenScroll from "../screens/HomeScreenScroll";
import RestaurantDetails from "../screens/RestaurantDetails";
import { Provider as ReduxProvider} from "react-redux";
import configureStore from "../redux/store";
const store = configureStore();
const Stack = createStackNavigator();
  const screenOptions = {
    headerShown: false,
  };

export default function HomeStack() {
  return (
    <ReduxProvider store={store}>
      <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="RestaurantDetails" component={RestaurantDetails} />
        <Stack.Screen
          name="HomeScreenCategory"
          component={HomeScreenCategory}
        />
        <Stack.Screen
          name="HomeScreenCategoryList"
          component={HomeScreenCategoryList}
        />
        <Stack.Screen name="HomeScreenScroll" component={HomeScreenScroll} />
      </Stack.Navigator>
    </ReduxProvider>
  );
}
