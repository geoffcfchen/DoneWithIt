import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useContext } from "react";
import { Animated, Image, Text, StyleSheet, View } from "react-native";

import * as React from "react";
import { useWindowDimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";

import {
  HEADER_HEIGHT_EXPANDED,
  HEADER_HEIGHT_NARROWED,
  PROFILE_PICTURE_URI,
} from "../../constants";
import colors from "../config/colors";
import GlobalContext from "../context/Context";
import BlankScreen from "../screens/BlankScreen";
import ListingsScreen from "../screens/ListingsScreen";
import ProfilePostsScreen from "../screens/ProfilePostsScreen";
import generateTweets from "../utility/generateTweets";
import ProfileEdiButton from "./EditProfileButton";
import FollowButton from "./FollowButton";
import Followers from "./Followers";
import Following from "./Following";
import ProfileInfoTestScreen from "../screens/ProfileInfoListScreen";

const TWEETS = generateTweets(10);

export default function Tweets({ scrollY, userBData }) {
  const { userData } = useContext(GlobalContext);

  const FirstRoute = () => <View style={{ flex: 1, backgroundColor: "red" }} />;

  const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
  ]);

  return (
    <View style={{ flex: 1 }}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { y: scrollY },
              },
            },
          ],
          { useNativeDriver: true }
        )}
        style={{
          zIndex: 3,
          marginTop: HEADER_HEIGHT_NARROWED,
          paddingTop: HEADER_HEIGHT_EXPANDED,
        }}
        nestedScrollEnabled={true}
      >
        <View style={[styles.container]}>
          <View
            style={[
              styles.container,
              {
                paddingHorizontal: 20,
              },
            ]}
          >
            <Animated.Image
              source={{
                uri: userBData.photoURL,
              }}
              style={{
                width: 75,
                height: 75,
                borderRadius: 40,
                borderWidth: 4,
                borderColor: "black",
                marginTop: -30,
                transform: [
                  {
                    scale: scrollY.interpolate({
                      inputRange: [0, HEADER_HEIGHT_EXPANDED],
                      outputRange: [1, 0.6],
                      extrapolate: "clamp",
                    }),
                  },
                  {
                    translateY: scrollY.interpolate({
                      inputRange: [0, HEADER_HEIGHT_EXPANDED],
                      outputRange: [0, 16],
                      extrapolate: "clamp",
                    }),
                  },
                ],
              }}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={[
                  styles.text,
                  {
                    fontSize: 24,
                    fontWeight: "bold",
                    marginTop: 10,
                  },
                ]}
              >
                {userBData.displayName}
              </Text>
              {userData.uid == userBData.uid ? (
                <ProfileEdiButton userBData={userBData}></ProfileEdiButton>
              ) : (
                <FollowButton userBData={userBData}></FollowButton>
              )}
            </View>

            <Text
              style={[
                styles.text,
                {
                  fontSize: 15,
                  color: "gray",
                  marginBottom: 15,
                },
              ]}
            >
              @{userBData.email}
            </Text>

            <Text style={[styles.text, { marginBottom: 15, fontSize: 15 }]}>
              {userBData.bio}
            </Text>

            {/* Profile stats */}
            <View
              style={{
                flexDirection: "row",
                marginBottom: 15,
              }}
            >
              <Following userBData={userBData}></Following>
              <Followers userBData={userBData}></Followers>
            </View>
          </View>

          <View>
            {/* <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{ width: layout.width }}
            /> */}
            {/* <ProfileInfoTestScreen></ProfileInfoTestScreen> */}
            {/* <Tab.Navigator>
              <Tab.Screen
                name="Post"
                component={ProfilePostsScreen}
              ></Tab.Screen>
              <Tab.Screen name="Questions" component={BlankScreen}></Tab.Screen>
              <Tab.Screen name="Likes" component={BlankScreen}></Tab.Screen>
            </Tab.Navigator> */}
            {TWEETS.map((item, index) => (
              <View key={item.key} style={styles.tweet}>
                <Image
                  source={{
                    uri: PROFILE_PICTURE_URI,
                  }}
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 25,
                    marginRight: 10,
                  }}
                />

                <View style={styles.container}>
                  <Text
                    style={[
                      styles.text,
                      {
                        fontWeight: "bold",
                        fontSize: 15,
                      },
                    ]}
                  >
                    {item.author}{" "}
                    <Text
                      style={{
                        color: "gray",
                        fontWeight: "normal",
                      }}
                    >
                      @{item.tag} · {index + 1}d
                    </Text>
                  </Text>

                  <Text style={[styles.text, { fontSize: 15 }]}>
                    {item.text}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: colors.black,
  },
  tweet: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(255, 255, 255, 0.25)",
  },
});
