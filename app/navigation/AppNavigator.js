import React, { useContext, useEffect } from "react";
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
import { db } from "../../firebase";
import GlobalContext from "../context/Context";
import OpenScheduleScreen from "../screens/OpenScheduleScreen";

const Tab = createBottomTabNavigator();

function AppNavigator() {
  const { user } = useContext(AuthContext);
  const { setUserData, userData } = useContext(GlobalContext);

  const questionsQuery = query(
    collection(db, "customers"),
    where("email", "==", user.email)
  );
  console.log("test");
  console.log("userData", userData);
  useEffect(() => {
    const unsubscribe = onSnapshot(questionsQuery, (querySnapshot) => {
      querySnapshot.docs.map((doc) => setUserData(doc.data()));
      // const parsedQuestions = querySnapshot.docs.map((doc) => ({
      //   ...doc.data(),
      //   id: doc.id,
      //   userB: doc.data().participants.find((p) => p.email !== user.email),
      // }));
      // .sort(
      //   (a, b) =>
      //     b.lastMessage.createdAt.toDate().getTime() -
      //     a.lastMessage.createdAt.toDate().getTime()
      // );
      // console.log("parsedQuestions", parsedQuestions);
      // setUnfilteredQuestions(parsedQuestions);
      // setQuestions(parsedQuestions.filter((doc) => doc.lastMessage));
    });
    return () => unsubscribe();
  }, []);

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
      {userData.role.label == "Doctor" ? (
        <Tab.Screen
          name="OpenSchedule"
          component={OpenScheduleScreen}
          options={({ navigation }) => ({
            headerShown: false,
            tabBarButton: () => (
              <NewListingButton
                onPress={() => navigation.navigate(routes.OPENSCHEDULE)}
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
      ) : (
        <Tab.Screen
          name="ListingEdit"
          component={ListingEditScreen}
          options={({ navigation }) => ({
            headerShown: false,
            tabBarButton: () => (
              <NewListingButton
                onPress={() => navigation.navigate(routes.LISTINGEDIT)}
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
