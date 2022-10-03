import * as React from "react";
import { View, Text, Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import "expo-dev-menu";

import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import LoginScreen from "./app/screens/LoginScreen";
import navigationTheme from "./app/navigation/navigationTheme";
import RegisterScreen from "./app/screens/RegisterScreen";
import routes from "./app/navigation/routes";
import Screen from "./app/components/Screen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <AppNavigator></AppNavigator>
      {/* <Stack.Navigator>
        <Stack.Screen
          name="AuthNavigator"
          component={AuthNavigator}
        ></Stack.Screen>
      </Stack.Navigator>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveBackgroundColor: "tomato",
          tabBarActiveTintColor: "white",
          tabBarInactiveBackgroundColor: "#eee",
          tabBarInactiveTintColor: "black",
        }}
      >
        <Tab.Screen
          name="Feed"
          component={TweetAll}
          options={{
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <MaterialCommunityIcons
                name="home"
                size={size}
                color={color}
              ></MaterialCommunityIcons>
            ),
          }}
        ></Tab.Screen>
        <Tab.Screen name="Account" component={Account}></Tab.Screen>
      </Tab.Navigator> */}
    </NavigationContainer>
  );
}
