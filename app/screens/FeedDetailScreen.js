import * as React from "react";
import { View, StyleSheet } from "react-native";

// import Feed from '../components/Feed';
import Screen, { ScreenScrollView } from "../components/Screen";
import AppText from "../components/AppText";
import FeedDetails from "../components/FeedDetails";

export default function FeedDetailScreen({ route }) {
  const tweet = route.params.tweet;
  return (
    <View>
      <FeedDetails tweet={tweet}></FeedDetails>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
