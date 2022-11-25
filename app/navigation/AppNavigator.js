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
import HomeNavigator from "./HomeNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfilePicture from "../components/ProfilePicture";
import colors from "../config/colors";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { DrawerActions, useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

function AppNavigator() {
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
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
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
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => {
                navigation.navigate("Home");
                setWhereTab("Home");
              }}
            />
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
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => {
                navigation.navigate("Questions");
                setWhereTab("Questions");
              }}
            />
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
            tabBarButton: (props) => (
              <TouchableOpacity
                {...props}
                onPress={() => {
                  navigation.navigate("Schedules");
                  setWhereTab("Schedules");
                }}
              />
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
            tabBarButton: (props) => (
              <TouchableOpacity
                {...props}
                onPress={() => {
                  navigation.navigate("SubmitSchedule");
                  setWhereTab("SubmitSchedule");
                }}
              />
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
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => {
                navigation.navigate("AccountNav");
                setWhereTab("AccountNav");
              }}
            />
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}

function AppNavigatorWrapper() {
  const navigation = useNavigation();
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="AppScreen">
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

function CustomDrawerContent(props) {
  // console.log("test", props.state.routes[0].state.index);
  // console.log(whereTab);
  const { whereTab } = useContext(GlobalContext);
  console.log(whereTab);
  return (
    <View style={{ flex: 1, backgroundColor: "#141f27" }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.topContainer}>
          <Image
            source={require("../assets/icon_black.png")}
            style={styles.profile}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.title}>appdevblog</Text>
            <Ionicons name="ios-arrow-down" size={20} color="#00acee" />
          </View>

          <Text style={styles.username}>APPDEVBLOG_2020</Text>
          <View style={styles.data}>
            <View style={styles.following}>
              <Text style={styles.number}>22</Text>
              <Text style={styles.text}> Following</Text>
            </View>
            <View style={styles.followers}>
              <Text style={styles.number}>44</Text>
              <Text style={styles.text}> Followers</Text>
            </View>
          </View>
        </View>
        <DrawerItem
          label={() => <Text style={styles.label}>Profile</Text>}
          onPress={() =>
            props.navigation.navigate("Tabs", {
              screen: whereTab,
              params: { screen: "ProfileTest" },
            })
          }
          icon={() => (
            <MaterialCommunityIcons
              name="account-outline"
              size={22}
              color="#898f93"
            />
          )}
        />
        <DrawerItem
          label={() => <Text style={styles.label}>Lists</Text>}
          onPress={() => props.navigation.navigate("Lists")}
          icon={() => (
            <MaterialCommunityIcons name="text" size={22} color="#898f93" />
          )}
        />
        <DrawerItem
          label={() => <Text style={styles.label}>Topics</Text>}
          onPress={() => props.navigation.navigate("Topics")}
          icon={() => (
            <MaterialCommunityIcons
              name="chat-processing"
              size={22}
              color="#898f93"
            />
          )}
        />
        <DrawerItem
          label={() => <Text style={styles.label}>Bookmarks</Text>}
          onPress={() => props.navigation.navigate("Bookmarks")}
          icon={() => (
            <MaterialCommunityIcons
              name="bookmark-outline"
              size={22}
              color="#898f93"
            />
          )}
        />
        <DrawerItem
          label={() => <Text style={styles.label}>Moments</Text>}
          onPress={() => props.navigation.navigate("Moments")}
          icon={() => (
            <MaterialCommunityIcons
              name="flash-outline"
              size={22}
              color="#898f93"
            />
          )}
        />
        <View style={{ height: 0.2, backgroundColor: "#2b353c" }} />
        <TouchableOpacity
          style={{ padding: 10, paddingLeft: 15 }}
          onPress={() => props.navigation.navigate("Settings")}
        >
          <Text style={styles.optionText}>Settings and privacy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: 10, paddingLeft: 15 }}
          onPress={() => props.navigation.navigate("Help")}
        >
          <Text style={styles.optionText}>Help and Centre</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
      <View style={styles.bottomContainer}>
        <TouchableWithoutFeedback>
          <Image
            source={require("../assets/2.jpg")}
            style={styles.bottomIcon}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Image
            source={require("../assets/1.jpg")}
            style={styles.bottomIcon}
          />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const Drawer = createDrawerNavigator();

// export default AppNavigatorWrapper;

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        onPress={() => navigation.navigate("Notifications")}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

function Profile() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#333333",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#fff", fontWeight: "bold" }}>Profile</Text>
    </View>
  );
}

function Lists() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#333333",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#fff", fontWeight: "bold" }}>Lists</Text>
    </View>
  );
}

function Topics() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#333333",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#fff", fontWeight: "bold" }}>Topics</Text>
    </View>
  );
}

function Bookmarks() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#333333",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#fff", fontWeight: "bold" }}>Bookmarks</Text>
    </View>
  );
}

function Moments() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#333333",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#fff", fontWeight: "bold" }}>Moments</Text>
    </View>
  );
}

function Settings() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#333333",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#fff", fontWeight: "bold" }}>Settings</Text>
    </View>
  );
}

function Help() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#333333",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#fff", fontWeight: "bold" }}>Help</Text>
    </View>
  );
}

function Home({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#424b52" }}>
      <View style={styles.header}>
        <TouchableWithoutFeedback
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Image
            source={require("../assets/icon_black.png")}
            style={styles.image}
          />
        </TouchableWithoutFeedback>
        <Icon name="twitter" size={28} color="#00acee" />
        <Image source={require("../assets/2.jpg")} style={styles.icon} />
      </View>
    </View>
  );
}

function Search({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#424b52" }}>
      <View style={styles.header}>
        <TouchableWithoutFeedback
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Image
            source={require("../assets/icon_black.png")}
            style={styles.image}
          />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

function Notification({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#424b52" }}>
      <View style={styles.header}>
        <TouchableWithoutFeedback
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Image
            source={require("../assets/icon_black.png")}
            style={styles.image}
          />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

function Messages({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#424b52" }}>
      <View style={styles.header}>
        <TouchableWithoutFeedback
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Image
            source={require("../assets/icon_black.png")}
            style={styles.image}
          />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

export default function MyDrawer({ navigation }) {
  return (
    <Drawer.Navigator
      drawerType="front"
      edgeWidth={100}
      initialRouteName="Tabs"
      useLegacyImplementation={true}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      // screenOptions={{ headerShown: false }}
    >
      <Drawer.Group screenOptions={{ headerShown: false }}>
        <Drawer.Screen name="Tabs" component={AppNavigator} />
      </Drawer.Group>
      <Drawer.Group
        screenOptions={{
          headerRightContainerStyle: {
            marginRight: 15,
          },
          headerLeftContainerStyle: {
            marginLeft: 15,
          },
          headerLeft: () => (
            <MaterialCommunityIcons
              name="arrow-left"
              color={"black"}
              size={24}
              onPress={() => navigation.navigate("Tabs")}
            />
          ),
        }}
      >
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Lists" component={Lists} />
        <Drawer.Screen name="Topics" component={Topics} />
        <Drawer.Screen name="Bookmarks" component={Bookmarks} />
        <Drawer.Screen name="Moments" component={Moments} />
        <Drawer.Screen name="Settings" component={Settings} />
        <Drawer.Screen name="Help" component={Help} />
      </Drawer.Group>
    </Drawer.Navigator>
  );
}

function App() {
  return (
    <Drawer.Navigator useLegacyImplementation={true} initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
    </Drawer.Navigator>
  );
}
