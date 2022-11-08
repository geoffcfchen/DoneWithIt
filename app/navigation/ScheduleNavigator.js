import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DoctorListScreen from "../screens/DoctorListScreen";
import TimeSlotScreen from "../screens/TimeSlotsScreen";
import ConsultationScreen from "../screens/ConsultationDetailScreen";
import IndividualDayScreen from "../screens/IndividualDayScreen";

const Stack = createNativeStackNavigator();

function ScheduleNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="DoctorList"
        component={DoctorListScreen}
      ></Stack.Screen>
      <Stack.Screen
        name="IndividualDay"
        component={IndividualDayScreen}
      ></Stack.Screen>
      <Stack.Screen
        screenOptions={{ presentation: "modal" }}
        name="Consultation"
        component={ConsultationScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

export default ScheduleNavigator;
