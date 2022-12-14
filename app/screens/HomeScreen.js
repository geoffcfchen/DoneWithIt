import * as React from "react";
import { View, StyleSheet } from "react-native";

// import Feed from '../components/Feed';
import Screen, { ScreenScrollView } from "../components/Screen";
import AppText from "../components/AppText";
import Feed from "../components/Feed";
import NewTweetButton from "../components/NewTweetButton";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Feed></Feed>
      <NewTweetButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
