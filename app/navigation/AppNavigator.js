import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ListingEditScreen from "../screens/ListingEditScreen";
import FeedNavigator from "./FeedNavigator";
import AccountNavigator from "./AccountNavigator";
import NewListingButton from "./NewListingButton";
import routes from "./routes";

const Tab = createBottomTabNavigator();

function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Feed"
        component={FeedNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home"
              color={color}
              size={size}
            ></MaterialCommunityIcons>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="ListingEdit"
        component={ListingEditScreen}
        options={({ navigation }) => ({
          headerShown: false,
          tabBarButton: () => (
            <NewListingButton
              onPress={() => navigation.navigate(routes.LISTINGEDIT)}
            ></NewListingButton>
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={color}
              size={size}
            ></MaterialCommunityIcons>
          ),
        })}
      ></Tab.Screen>
      <Tab.Screen
        name="AccountNav"
        component={AccountNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account"
              color={color}
              size={size}
            ></MaterialCommunityIcons>
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}

export default AppNavigator;