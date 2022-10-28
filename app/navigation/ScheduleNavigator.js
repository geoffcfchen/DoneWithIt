import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DoctorListScreen from "../screens/DoctorListScreen";
import TimeSlotScreen from "../screens/TimeSlotsScreen";
import ConsultationScreen from "../screens/ConsultationDetailScreen";

const Stack = createNativeStackNavigator();

function ScheduleNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ presentation: "modal", headerShown: false }}
    >
      <Stack.Screen
        name="DoctorList"
        component={DoctorListScreen}
      ></Stack.Screen>
      <Stack.Screen name="TimeSlots" component={TimeSlotScreen}></Stack.Screen>
      <Stack.Screen
        name="Consultation"
        component={ConsultationScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

export default ScheduleNavigator;
