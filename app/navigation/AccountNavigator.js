import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";
import MessagesDetailsScreen from "../screens/MessagesDetailScreen.js";
import ContactsScreen from "../screens/ContactsScreen";
import BalanceScreen from "../screens/BalanceScreen";
import ProfilePicture from "../components/ProfilePicture";
import colors from "../config/colors";
import ProfileTestScreen from "../screens/ProfileTestScreen";

const Stack = createNativeStackNavigator();

function AccountNavigator() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          headerRightContainerStyle: {
            marginRight: 15,
          },
          headerLeftContainerStyle: {
            marginLeft: 15,
          },
          headerTitle: () => (
            <MaterialCommunityIcons
              name={"palm-tree"}
              size={40}
              color={colors.tint}
            />
          ),
          headerRight: () => (
            <MaterialCommunityIcons
              name={"paw"}
              size={30}
              color={colors.tint}
            />
          ),
          headerLeft: () => (
            <ProfilePicture
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              size={40}
              image={"https://picsum.photos/200"}
            />
          ),
        }}
      >
        <Stack.Screen name="Account" component={AccountScreen}></Stack.Screen>
      </Stack.Group>

      <Stack.Screen name="Balance" component={BalanceScreen}></Stack.Screen>
      <Stack.Screen name="Messages" component={MessagesScreen}></Stack.Screen>
      <Stack.Screen
        name="MessagesDetail"
        component={MessagesDetailsScreen}
      ></Stack.Screen>
      <Stack.Screen name="Contacts" component={ContactsScreen}></Stack.Screen>
      <Stack.Group
        screenOptions={{
          headerRightContainerStyle: {
            marginRight: 15,
          },
          headerLeftContainerStyle: {
            marginLeft: 15,
          },
          headerLeft: () => (
            <MaterialCommunityIcons
              name="arrow-left"
              color={"black"}
              size={24}
              onPress={() => navigation.navigate("Account")}
            />
          ),
        }}
      >
        <Stack.Screen
          options={{ headerShown: true }}
          name="ProfileTest"
          component={ProfileTestScreen}
        ></Stack.Screen>
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default AccountNavigator;
