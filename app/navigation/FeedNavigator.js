import React, { useContext, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import ListingsScreen from "../screens/ListingsScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import ProfilePicture from "../components/ProfilePicture";
import colors from "../config/colors";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import ProfileTestScreen from "../screens/ProfileTestScreen";
import GlobalContext from "../context/Context";

const Stack = createNativeStackNavigator();

Stack.navigationOptions;

function FeedNavigator() {
  const navigation = useNavigation();
  const { userData } = useContext(GlobalContext);
  return (
    <Stack.Navigator initialRouteName="Listings">
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
        <Stack.Screen name="Listings" component={ListingsScreen}></Stack.Screen>
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
              onPress={() => navigation.navigate("Listings")}
            />
          ),
        }}
      >
        <Stack.Screen
          options={{ headerShown: true }}
          name="ListingDetails"
          component={ListingDetailsScreen}
        ></Stack.Screen>
        <Stack.Screen
          options={{ headerShown: true }}
          name="ProfileTest"
          component={ProfileTestScreen}
        ></Stack.Screen>
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default FeedNavigator;
