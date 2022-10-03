import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";

const Stack = createNativeStackNavigator();

function AccountNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Account" component={AccountScreen}></Stack.Screen>
      <Stack.Screen name="Messages" component={MessagesScreen}></Stack.Screen>
    </Stack.Navigator>
  );
}

export default AccountNavigator;
