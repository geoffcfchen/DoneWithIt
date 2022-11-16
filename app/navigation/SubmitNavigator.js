import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ConsultationScreen from "../screens/ConsultationDetailScreen";
import IndividualDayScreen from "../screens/IndividualDayScreen";
// import { useRoute } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

function SubmitNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ presentation: "modal", headerShown: false }}
    >
      <Stack.Screen
        name="OpenSchedule"
        component={IndividualDayScreen}
        // children={() => (
        //   <OpenScheduleScreen timeSlots={timeSlots}></OpenScheduleScreen>
        // )}
      ></Stack.Screen>
      <Stack.Screen
        name="Consultation"
        component={ConsultationScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

export default SubmitNavigator;
