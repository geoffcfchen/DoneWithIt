import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";
import MessagesDetailsScreen from "../screens/MessagesDetailScreen.js";
import ContactsScreen from "../screens/ContactsScreen";

const Stack = createNativeStackNavigator();

function AccountNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Account" component={AccountScreen}></Stack.Screen>
      <Stack.Screen name="Messages" component={MessagesScreen}></Stack.Screen>
      <Stack.Screen
        name="MessagesDetail"
        component={MessagesDetailsScreen}
      ></Stack.Screen>
      <Stack.Screen name="Contacts" component={ContactsScreen}></Stack.Screen>
    </Stack.Navigator>
  );
}

export default AccountNavigator;
