import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AccountScreen from "../screens/AccountScreen";
import ListingEditScreen from "../screens/ListingEditScreen";
import FeedNavigator from "./FeedNavigator";
import AccountNavigator from "./AccountNavigator";

const Tab = createBottomTabNavigator();

function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Feed"
        component={FeedNavigator}
        options={{ headerShown: false }}
      ></Tab.Screen>
      <Tab.Screen name="listingEdit" component={ListingEditScreen}></Tab.Screen>
      <Tab.Screen name="AccountNav" component={AccountNavigator}></Tab.Screen>
    </Tab.Navigator>
  );
}

export default AppNavigator;
