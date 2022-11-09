import React, { useContext, useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

import AccountNavigator from "./AccountNavigator";

import FeedNavigator from "./FeedNavigator";
import ListingEditScreen from "../screens/ListingEditScreen";
import NewListingButton from "./NewListingButton";
import routes from "./routes";
import useNotifications from "../hooks/useNotifications";
import { StyleSheet, View } from "react-native";
import ScheduleNavigator from "./ScheduleNavigator";
import AuthContext from "../auth/context";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase";
import GlobalContext from "../context/Context";
import OpenScheduleScreen from "../screens/OpenScheduleScreen";
import SubmitNavigator from "./SubmitNavigator";

const Tab = createBottomTabNavigator();

function AppNavigator() {
  const { user } = useContext(AuthContext);
  const { setUserData, userData } = useContext(GlobalContext);
  const [timeSlots, setTimeSlots] = useState([]);
  const [role, setRole] = useState();

  const questionsQuery = query(
    collection(db, "customers"),
    where("email", "==", user.email)
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(questionsQuery, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());
      setUserData(...data);
      setRole(data[0].role.label);
    });
    return () => unsubscribe();
  }, []);

  const timeSlotsQuery = query(
    collection(db, "timeSlots"),
    where("participantsArray", "array-contains", user.email)
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(timeSlotsQuery, (querySnapshot) => {
      const parsedTimesSlots = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setTimeSlots(parsedTimesSlots);
    });
    return () => unsubscribe();
  }, []);

  const timeSlot = timeSlots.find((timeSlot) =>
    timeSlot.participantsArray.includes(user.email)
  );

  useNotifications();
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
    >
      <Tab.Screen
        name="Questions"
        component={FeedNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home"
              color={color}
              size={size}
            ></MaterialCommunityIcons>
          ),
        }}
      ></Tab.Screen>

      {role && role != "Doctor" && (
        <Tab.Screen
          name="Schedules"
          component={ScheduleNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="calendar-alt" size={size} color={color} />
            ),
          }}
        ></Tab.Screen>
      )}

      <Tab.Screen
        name="SubmitSchedule"
        component={SubmitNavigator}
        options={({ navigation }) => ({
          headerShown: false,
          tabBarButton: () => (
            <NewListingButton
              onPress={() =>
                navigation.navigate(routes.SUBMITSCHEDULE, { timeSlot })
              }
            ></NewListingButton>
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={color}
              size={size}
            ></MaterialCommunityIcons>
          ),
        })}
      ></Tab.Screen>

      <Tab.Screen
        name="AccountNav"
        component={AccountNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account"
              color={color}
              size={size}
            ></MaterialCommunityIcons>
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  circleStyle: {
    height: 60.0,
    width: 60.0,
    backgroundColor: "#F5F5F5",
    borderRadius: 30.0,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AppNavigator;
