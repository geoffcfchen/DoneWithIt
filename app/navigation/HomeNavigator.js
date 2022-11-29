import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import react, { useContext, useEffect } from "react";

import ProfilePicture from "../components/ProfilePicture";
import colors from "../config/colors";
import GlobalContext from "../context/Context";
import HomeScreen from "../screens/HomeScreen";
import ProfileInfoScreen from "../screens/ProfileInfoScreen";

const Stack = createNativeStackNavigator();

function HomeNavigator() {
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
          name="HomeScreen"
          component={HomeScreen}
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
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      >
        <Stack.Screen
          options={{ headerShown: true }}
          name="ProfileInfo"
          component={ProfileInfoScreen}
        ></Stack.Screen>
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default HomeNavigator;
