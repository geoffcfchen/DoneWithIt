import React, { useContext, useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";

import AccountNavigator from "./AccountNavigator";

import FeedNavigator from "./FeedNavigator";
import { StyleSheet, View } from "react-native";
import ScheduleNavigator from "./ScheduleNavigator";
import AuthContext from "../auth/context";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import GlobalContext from "../context/Context";
import SubmitNavigator from "./SubmitNavigator";
import HomeNavigator from "./HomeNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfilePicture from "../components/ProfilePicture";
import colors from "../config/colors";

const Tab = createBottomTabNavigator();

function AppNavigator() {
  const { user } = useContext(AuthContext);
  const { setUserData, userData, setTimeSlots } = useContext(GlobalContext);

  const questionsQuery = query(
    collection(db, "customers"),
    where("email", "==", user.email)
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(questionsQuery, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());
      setUserData(...data);
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

      setTimeSlots(
        parsedTimesSlots.find((timeSlot) =>
          timeSlot.participantsArray.includes(user.email)
        )
      );
    });
    return () => unsubscribe();
  }, []);

  // useNotifications();
  return (
    <Tab.Navigator
      screenOptions={{
        // headerShown: true,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
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
      <Tab.Screen
        name="Questions"
        component={FeedNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="message-question-outline"
              color={color}
              size={size}
            ></MaterialCommunityIcons>
          ),
        }}
      ></Tab.Screen>
      {userData && userData.role.label == "Client" && (
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
      {userData && userData.role.label == "Doctor" && (
        <Tab.Screen
          name="SubmitSchedule"
          component={SubmitNavigator}
          options={() => ({
            headerShown: false,
            // tabBarButton: () => (
            //   <NewListingButton
            //     onPress={() =>
            //       navigation.navigate(routes.SUBMITSCHEDULE, { timeSlots })
            //     }
            //   ></NewListingButton>
            // ),
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="calendar-month"
                color={color}
                size={size}
              ></MaterialCommunityIcons>
            ),
          })}
        ></Tab.Screen>
      )}

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

function AppNavigatorWrapper() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
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
          <MaterialCommunityIcons name={"paw"} size={30} color={colors.tint} />
        ),
        headerLeft: () => (
          <ProfilePicture
            // onPress={() => navigation.dispatch(DrawerActions)}
            size={40}
            image={"https://picsum.photos/200"}
          />
        ),
      }}
    >
      <Stack.Screen name="AppScreen" component={AppNavigator} />
    </Stack.Navigator>
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

export default AppNavigatorWrapper;
