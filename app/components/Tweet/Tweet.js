import React from "react";
import { View, StyleSheet, Text } from "react-native";
import LeftContainer from "./LeftContainer";
import MainContainer from "./MainContainer/MainContainer";

function Tweet({ tweet }) {
  //   console.log("tweet", tweet.user);
  return (
    <View style={styles.container}>
      <LeftContainer userB={tweet.user} />
      <MainContainer tweet={tweet} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 0.5,
    borderColor: "lightgrey",
  },
});

export default Tweet;
