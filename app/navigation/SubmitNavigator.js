import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ConsultationScreen from "../screens/ConsultationDetailScreen";
import IndividualDayScreen from "../screens/IndividualDayScreen";
import GlobalContext from "../context/Context";
import OpenScheduleScreen from "../screens/OpenScheduleScreen";
// import { useRoute } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

function SubmitNavigator() {
  const { userData, timeSlots } = useContext(GlobalContext);
  return (
    <Stack.Navigator
      screenOptions={{ presentation: "modal", headerShown: false }}
    >
      <Stack.Screen
        name="OpenSchedule"
        // component={IndividualDayScreen}
        children={() => (
          <IndividualDayScreen timeSlots={timeSlots}></IndividualDayScreen>
        )}
      ></Stack.Screen>
      <Stack.Screen
        name="Consultation"
        component={ConsultationScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

export default SubmitNavigator;
