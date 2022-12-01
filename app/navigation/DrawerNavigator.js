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
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase";
import GlobalContext from "../context/Context";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import AppNavigator from "./AppNavigator";

const Drawer = createDrawerNavigator();

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

export default function DrawerNavigator({ navigation }) {
  const { setWhereTab, setAllUsersThatUserFollowing } =
    useContext(GlobalContext);

  return (
    <Drawer.Navigator
      drawerType="front"
      edgeWidth={100}
      initialRouteName="AppNavigator"
      useLegacyImplementation={true}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Group screenOptions={{ headerShown: false }}>
        <Drawer.Screen
          name="AppNavigator"
          component={AppNavigator}
          listeners
          options={({ route }) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? "";
            setWhereTab(routeName);
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
      ></Drawer.Group>
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props, { route }) {
  const { whereTab, userData, setAllUsersThatUserFollowing } =
    useContext(GlobalContext);
  const [followingNumber, setFollowingNumber] = useState(0);
  const [followerNumber, setFollowerNumber] = useState(0);

  const allUsersThatUserFollowingRef = collection(
    db,
    "following",
    auth.currentUser.uid,
    "userFollowing"
  );

  const FollowersOfUserRef = collection(
    db,
    "followers",
    auth.currentUser.uid,
    "userFollower"
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(
      allUsersThatUserFollowingRef,
      (querySnapshot) => {
        const allUsersThatUserFollowing = querySnapshot.docs.map((doc) => {
          const id = doc.id;
          return id;
        });
        setFollowingNumber(allUsersThatUserFollowing.length);
        setAllUsersThatUserFollowing(allUsersThatUserFollowing);
      }
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(FollowersOfUserRef, (querySnapshot) => {
      const FollowersOfUser = querySnapshot.docs.map((doc) => {
        const id = doc.id;
        return id;
      });
      setFollowerNumber(FollowersOfUser.length);
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#141f27" }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.topContainer}>
          {userData && (
            <Image source={{ uri: userData.photoURL }} style={styles.profile} />
          )}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {/* <Text style={styles.title}>appdevblog</Text> */}
            {/* <Ionicons name="ios-arrow-down" size={20} color="#00acee" /> */}
          </View>

          <Text style={styles.username}>@{auth.currentUser.displayName}</Text>
          <View style={styles.data}>
            <View style={styles.following}>
              <Text style={styles.number}>{followingNumber}</Text>
              <Text style={styles.text}> Following</Text>
            </View>
            <View style={styles.followers}>
              <Text style={styles.number}>{followerNumber}</Text>
              <Text style={styles.text}> Followers</Text>
            </View>
          </View>
        </View>
        <DrawerItem
          label={() => <Text style={styles.label}>Profile</Text>}
          onPress={() =>
            props.navigation.navigate("AppNavigator", {
              screen: whereTab,
              params: {
                screen: "ProfileInfo",
                params: { ProfileUser: userData },
              },
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
