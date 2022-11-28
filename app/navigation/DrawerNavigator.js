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
import {
  DrawerActions,
  getFocusedRouteNameFromRoute,
  useNavigation,
} from "@react-navigation/native";
import AppNavigator from "./AppNavigator";

function CustomDrawerContent(props) {
  // console.log("test", props.state.routes[0].state.index);
  // console.log(whereTab);
  const { whereTab, userData } = useContext(GlobalContext);
  // console.log(whereTab);
  return (
    <View style={{ flex: 1, backgroundColor: "#141f27" }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.topContainer}>
          <Image source={{ uri: userData.photoURL }} style={styles.profile} />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {/* <Text style={styles.title}>appdevblog</Text> */}
            {/* <Ionicons name="ios-arrow-down" size={20} color="#00acee" /> */}
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
            props.navigation.navigate("AppNavigator", {
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
          label={() => <Text style={styles.label}>Wallets</Text>}
          onPress={() => props.navigation.navigate("Lists")}
          icon={() => <Ionicons name="wallet" size={22} color="#898f93" />}
        />
        {/* <DrawerItem
            label={() => <Text style={styles.label}>Topics</Text>}
            onPress={() => props.navigation.navigate("Topics")}
            icon={() => (
              <MaterialCommunityIcons
                name="chat-processing"
                size={22}
                color="#898f93"
              />
            )}
          /> */}

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

export default function DrawerNavigator({ navigation }) {
  const { whereTab, setWhereTab } = useContext(GlobalContext);
  console.log("whereTab", whereTab);

  return (
    <Drawer.Navigator
      drawerType="front"
      edgeWidth={100}
      initialRouteName="AppNavigator"
      useLegacyImplementation={true}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      // screenOptions={{ swipeEnabled: false }}
    >
      <Drawer.Group screenOptions={{ headerShown: false }}>
        <Drawer.Screen
          name="AppNavigator"
          component={AppNavigator}
          options={({ route }) => {
            console.log("route", route);
            const routeName =
              getFocusedRouteNameFromRoute(route) ?? "AppNavigator";
            console.log("routeName", routeName);
            setWhereTab(routeName);

            // if (routeName == "SubmitSchedule") return { swipeEnabled: false };
          }}
        />
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
              onPress={() => navigation.navigate("AppNavigator")}
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
