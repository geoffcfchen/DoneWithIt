import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import react, { useContext, useEffect } from "react";
import { auth } from "../../firebase";

import ProfilePicture from "../components/ProfilePicture";
import colors from "../config/colors";
import GlobalContext from "../context/Context";
import CallingScreen from "../screens/CallingScreen";
import FeedDetailScreen from "../screens/FeedDetailScreen";
import FollowScreen from "../screens/FollowScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileEditScreen from "../screens/ProfileEditScreen";
import ProfileInfoAnimatedScreen from "../screens/ProfileInfoAnimatedScreen";
import ProfileInfoListScreen from "../screens/ProfileInfoListScreen";
import SubscriptionScreen from "../screens/SubscriptionScreen";

const Stack = createNativeStackNavigator();

function HomeNavigator({ create }) {
  const navigation = useNavigation();
  const { userData } = useContext(GlobalContext);

  return (
    <Stack.Navigator screenOptions={{ fullScreenGestureEnabled: true }}>
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
              onPress={() => navigation.pop()}
            />
          ),
        }}
      >
        <Stack.Screen
          options={{ headerShown: true }}
          name="ProfileInfo"
          // component={ProfileInfoListScreen}
          children={() => (
            <ProfileInfoListScreen create={create}></ProfileInfoListScreen>
          )}
        ></Stack.Screen>
        <Stack.Screen
          options={{ headerShown: false, presentation: "modal" }}
          name="ProfileEdit"
          component={ProfileEditScreen}
        ></Stack.Screen>
        <Stack.Screen
          options={{ headerShown: true }}
          name="FeedDetail"
          component={FeedDetailScreen}
        ></Stack.Screen>
        <Stack.Screen
          options={{ headerShown: true, title: auth.currentUser.displayName }}
          name="FollowScreen"
          component={FollowScreen}
        ></Stack.Screen>
        <Stack.Screen
          options={{ headerShown: true }}
          name="Subscription"
          component={SubscriptionScreen}
        ></Stack.Screen>
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default HomeNavigator;
