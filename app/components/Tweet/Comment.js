import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Text, TouchableHighlight } from "react-native";
import { navigationRef } from "../../navigation/rootNavigation";
import LeftContainer from "./LeftContainer";
import MainContainer from "./MainContainer/MainContainer";
import MainContainerComment from "./MainContainer/MainContainerComment";

function Comment({ tweet }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <LeftContainer userB={tweet.user} />
      <MainContainerComment tweet={tweet} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 0.5,
    borderColor: "lightgrey",
  },
});

export default Comment;
