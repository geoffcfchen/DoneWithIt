import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Text, TouchableHighlight } from "react-native";
import { navigationRef } from "../../navigation/rootNavigation";
import LeftContainer from "./LeftContainer";
import MainContainer from "./MainContainer/MainContainer";

function Tweet({ tweet }) {
  const navigation = useNavigation();
  console.log("tweet", tweet);
  return (
    <TouchableHighlight
      onPress={() => {
        navigation.push("FeedDetail", { tweet: tweet });
      }}
      activeOpacity={0.99}
      underlayColor="#DDDDDD"
    >
      <View style={styles.container}>
        <LeftContainer userB={tweet.user} />
        <MainContainer tweet={tweet} />
      </View>
    </TouchableHighlight>
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
