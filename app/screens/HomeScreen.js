import * as React from "react";
import { View, StyleSheet } from "react-native";

// import Feed from '../components/Feed';
import Screen, { ScreenScrollView } from "../components/Screen";
import AppText from "../components/AppText";
import Feed from "../components/Feed";
import NewTweetButton from "../components/NewTweetButton";

export default function HomeScreen() {
  return (
    <Screen>
      <Feed></Feed>
      <NewTweetButton />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
