import React, { useContext, useLayoutEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import DoctorListScreen from "../screens/DoctorListScreen";
import TimeSlotScreen from "../screens/TimeSlotsScreen";
import ConsultationScreen from "../screens/ConsultationDetailScreen";
import IndividualDayScreen from "../screens/IndividualDayScreen";
import ProfilePicture from "../components/ProfilePicture";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import colors from "../config/colors";
import ProfileInfoScreen from "../screens/ProfileInfoScreen";
import GlobalContext from "../context/Context";

const Stack = createNativeStackNavigator();

function ScheduleNavigator(props) {
  const navigation = useNavigation();
  const { userData } = useContext(GlobalContext);
  useLayoutEffect(() => {
    console.log(props);
  }, []);
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
          name="DoctorList"
          component={DoctorListScreen}
        ></Stack.Screen>
      </Stack.Group>
      <Stack.Group
        screenOptions={{ headerBackTitleVisible: false }}

        // screenOptions={{
        //   headerRightContainerStyle: {
        //     marginRight: 15,
        //   },
        //   headerLeftContainerStyle: {
        //     marginLeft: 15,
        //   },
        //   headerLeft: () => (
        //     <MaterialCommunityIcons
        //       name="arrow-left"
        //       color={"black"}
        //       size={24}
        //       // onPress={() => navigation.navigate("DoctorList")}
        //     />
        //   ),
        // }}
      >
        <Stack.Screen
          name="IndividualDay"
          component={IndividualDayScreen}
        ></Stack.Screen>
        <Stack.Screen
          // screenOptions={{ presentation: "modal" }}
          name="Consultation"
          component={ConsultationScreen}
        ></Stack.Screen>
        <Stack.Screen
          options={{ headerShown: true }}
          name="ProfileInfo"
          component={ProfileInfoScreen}
        ></Stack.Screen>
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default ScheduleNavigator;
