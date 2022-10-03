import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListingsScreen from "../screens/ListingsScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";

const Stack = createNativeStackNavigator();

function FeedNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ presentation: "modal", headerShown: false }}
    >
      <Stack.Screen name="Listings" component={ListingsScreen}></Stack.Screen>
      <Stack.Screen
        name="ListingDetails"
        component={ListingDetailsScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

export default FeedNavigator;
