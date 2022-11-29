import React, { useContext } from "react";
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
import ProfileInfoScreen from "../screens/ProfileInfoScreen";
import GlobalContext from "../context/Context";

const Stack = createNativeStackNavigator();

function AccountNavigator() {
  const navigation = useNavigation();
  const { userData } = useContext(GlobalContext);

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
              image={userData.photoURL}
            />
          ),
        }}
      >
        <Stack.Screen name="Account" component={AccountScreen}></Stack.Screen>
      </Stack.Group>

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
        <Stack.Screen name="Balance" component={BalanceScreen}></Stack.Screen>
        <Stack.Screen name="Messages" component={MessagesScreen}></Stack.Screen>
        <Stack.Screen
          name="MessagesDetail"
          component={MessagesDetailsScreen}
        ></Stack.Screen>
        <Stack.Screen name="Contacts" component={ContactsScreen}></Stack.Screen>
        <Stack.Screen
          options={{ headerShown: true }}
          name="ProfileInfo"
          component={ProfileInfoScreen}
        ></Stack.Screen>
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default AccountNavigator;
