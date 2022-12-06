import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { db } from "../../firebase";
import AppButton from "../components/AppButton";
import BackButton from "../components/BackButton";
import Banner from "../components/Banner";
import FollowButton from "../components/FollowButton";
import Name from "../components/Name";
import ProfilePicture from "../components/ProfilePicture";
import RefreshArrow from "../components/RefreshArrow";
import Tweets from "../components/Tweets";
import GlobalContext from "../context/Context";
import {
  HEADER_HEIGHT_EXPANDED,
  HEADER_HEIGHT_NARROWED,
  PROFILE_PICTURE_URI,
} from "../../constants";
import generateTweets from "../utility/generateTweets";
import Followers from "../components/Followers";
import Following from "../components/Following";

const TWEETS = generateTweets(30);

export default function ProfileInfoScreen({ route }) {
  // const scrollY = useRef(new Animated.Value(0)).current;
  const userBData = route.params.ProfileUser;
  console.log(userBData);
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: "white" }]}>
      <View style={styles.container}>
        {/* <Image
          source={{
            uri: PROFILE_PICTURE_URI,
          }}
          style={{
            width: 75,
            height: 75,
            borderRadius: 40,
            borderWidth: 4,
            borderColor: "black",
            marginTop: 10,
          }}
        /> */}

        <ProfilePicture userData={userBData} size={75}></ProfilePicture>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
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
          <FollowButton userBData={userBData}></FollowButton>
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
          {userBData.email}
        </Text>

        <Text style={[styles.text, { marginBottom: 15, fontSize: 15 }]}>
          Same @ on every social media
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    marginLeft: 10,
    marginTop: 5,
  },

  tweet: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(255, 255, 255, 0.25)",
  },
});
