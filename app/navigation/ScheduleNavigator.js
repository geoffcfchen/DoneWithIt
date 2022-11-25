import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import DoctorListScreen from "../screens/DoctorListScreen";
import TimeSlotScreen from "../screens/TimeSlotsScreen";
import ConsultationScreen from "../screens/ConsultationDetailScreen";
import IndividualDayScreen from "../screens/IndividualDayScreen";
import ProfilePicture from "../components/ProfilePicture";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import colors from "../config/colors";
import ProfileTestScreen from "../screens/ProfileTestScreen";

const Stack = createNativeStackNavigator();

function ScheduleNavigator() {
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
        <Stack.Screen
          name="DoctorList"
          component={DoctorListScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="IndividualDay"
          component={IndividualDayScreen}
        ></Stack.Screen>
        <Stack.Screen
          // screenOptions={{ presentation: "modal" }}
          name="Consultation"
          component={ConsultationScreen}
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
              onPress={() => navigation.navigate("DoctorList")}
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

export default ScheduleNavigator;
