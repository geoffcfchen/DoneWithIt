import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import ConsultationScreen from "../screens/ConsultationDetailScreen";
import IndividualDayScreen from "../screens/IndividualDayScreen";
import GlobalContext from "../context/Context";
import OpenScheduleScreen from "../screens/OpenScheduleScreen";
import ProfilePicture from "../components/ProfilePicture";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import colors from "../config/colors";
import ProfileInfoScreen from "../screens/ProfileInfoScreen";
import { auth } from "../../firebase";
import FollowScreen from "../screens/FollowScreen";
// import { useRoute } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

function SubmitNavigator() {
  const { userData, timeSlots } = useContext(GlobalContext);
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
              userData={userData}
            />
          ),
        }}
      >
        <Stack.Screen
          name="OpenSchedule"
          // component={IndividualDayScreen}
          children={() => (
            <IndividualDayScreen timeSlots={timeSlots}></IndividualDayScreen>
          )}
        ></Stack.Screen>
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
              onPress={() => navigation.navigate("OpenSchedule")}
            />
          ),
        }}
      >
        <Stack.Screen
          options={{ headerShown: true }}
          name="Consultation"
          component={ConsultationScreen}
        ></Stack.Screen>
        <Stack.Screen
          options={{ headerShown: true }}
          name="ProfileInfo"
          component={ProfileInfoScreen}
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

export default SubmitNavigator;
