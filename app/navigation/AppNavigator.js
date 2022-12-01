import React, { useContext, useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";

import AccountNavigator from "./AccountNavigator";

import FeedNavigator from "./FeedNavigator";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import ScheduleNavigator from "./ScheduleNavigator";
import AuthContext from "../auth/context";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import GlobalContext from "../context/Context";
import SubmitNavigator from "./SubmitNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfilePicture from "../components/ProfilePicture";
import colors from "../config/colors";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import {
  DrawerActions,
  getFocusedRouteNameFromRoute,
  useNavigation,
} from "@react-navigation/native";
import HomeNavigator from "./HomeNavigator";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const { user } = useContext(AuthContext);
  const { setUserData, userData, setTimeSlots, setWhereTab } =
    useContext(GlobalContext);
  const navigation = useNavigation();

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
      initialRouteName="Home"
      screenOptions={{ tabBarShowLabel: false }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home"
              color={color}
              size={size}
            ></MaterialCommunityIcons>
          ),
        })}
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

// function AppNavigatorWrapper() {
//   const navigation = useNavigation();
//   const Stack = createNativeStackNavigator();
//   return (
//     <Stack.Navigator initialRouteName="AppScreen">
//       <Stack.Screen name="AppScreen" component={AppNavigator} />
//     </Stack.Navigator>
//   );
// }

const styles = StyleSheet.create({
  circleStyle: {
    height: 60.0,
    width: 60.0,
    backgroundColor: "#F5F5F5",
    borderRadius: 30.0,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    height: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    paddingRight: 0,
    backgroundColor: "#141f27",
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  icon: {
    height: 50,
    width: 50,
  },
  topContainer: {
    padding: 15,
    borderBottomWidth: 0.2,
    borderBottomColor: "#2b353c",
  },
  profile: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  title: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 10,
  },
  username: {
    fontSize: 18,
    color: "#898f93",
  },
  data: {
    flexDirection: "row",
    marginTop: 15,
  },
  following: {
    flexDirection: "row",
    marginRight: 15,
  },
  followers: {
    flexDirection: "row",
  },
  number: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  text: {
    fontSize: 16,
    color: "#898f93",
  },
  label: {
    fontSize: 18,
    color: "#fff",
  },
  optionText: {
    fontSize: 18,
    color: "#fff",
    // fontWeight: 'bold',
  },
  bottomContainer: {
    padding: 10,
    position: "absolute",
    bottom: 0,
    height: 50,
    borderTopWidth: 0.2,
    borderTopColor: "#2b353c",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  bottomIcon: {
    height: 40,
    width: 40,
  },
});
