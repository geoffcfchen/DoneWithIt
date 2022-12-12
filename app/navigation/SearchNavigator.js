import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import react, { useContext, useEffect } from "react";
import { auth } from "../../firebase";

import ProfilePicture from "../components/ProfilePicture";
import colors from "../config/colors";
import GlobalContext from "../context/Context";
import FollowScreen from "../screens/FollowScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileInfoAnimatedScreen from "../screens/ProfileInfoAnimatedScreen";
import ProfileInfoListScreen from "../screens/ProfileInfoListScreen";
import ProfileInfoScreen from "../screens/ProfileInfoScreen";
import SearchScreen from "../screens/SearchScreen";

const Stack = createNativeStackNavigator();

function SearchNavigator() {
  const navigation = useNavigation();
  const { userData } = useContext(GlobalContext);
  // console.log(userData);

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
              userData={userData}
            />
          ),
        }}
      >
        <Stack.Screen
          options={{ headerShown: true }}
          name="SearchScreen"
          component={SearchScreen}
        />
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
              onPress={() => navigation.pop()}
            />
          ),
        }}
      >
        <Stack.Screen
          options={{ headerShown: true }}
          name="ProfileInfo"
          component={ProfileInfoListScreen}
        ></Stack.Screen>
        <Stack.Screen
          options={{ headerShown: true, title: auth.currentUser.displayName }}
          name="FollowScreen"
          component={FollowScreen}
        ></Stack.Screen>
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default SearchNavigator;
