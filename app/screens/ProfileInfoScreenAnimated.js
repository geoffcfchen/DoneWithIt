import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
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

export default function ProfileInfoScreen({ route }) {
  const scrollY = useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      {/* <StatusBar barStyle="light-content" /> */}

      {/* Back button */}
      {/* <BackButton /> */}

      {/* Refresh arrow */}
      {/* <RefreshArrow scrollY={scrollY} /> */}

      {/* Name + tweets count */}
      {/* <Name scrollY={scrollY} /> */}

      {/* Banner */}
      {/* <Banner scrollY={scrollY} /> */}

      {/* Tweets/profile */}
      <Tweets scrollY={scrollY} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
