import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DoctorListScreen from "../screens/DoctorListScreen";
import TimeSlotScreen from "../screens/TimeSlotsScreen";
import ConsultationScreen from "../screens/ConsultationDetailScreen";
import ListingEditScreen from "../screens/ListingEditScreen";
import OpenScheduleScreen from "../screens/OpenScheduleScreen";
import GlobalContext from "../context/Context";
import { useRoute } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

function SubmitNavigator() {
  const { userData } = useContext(GlobalContext);
  const route = useRoute();
  const timeSlots = route.params.timeSlot;
  return (
    <Stack.Navigator
      screenOptions={{ presentation: "modal", headerShown: false }}
    >
      {userData.role.label == "Doctor" ? (
        <Stack.Screen
          name="OpenSchedule"
          // component={OpenScheduleScreen}
          children={() => (
            <OpenScheduleScreen timeSlots={timeSlots}></OpenScheduleScreen>
          )}
        ></Stack.Screen>
      ) : (
        <Stack.Screen
          name="ListingEdit"
          component={ListingEditScreen}
        ></Stack.Screen>
      )}
    </Stack.Navigator>
  );
}

export default SubmitNavigator;
