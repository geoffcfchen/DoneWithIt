import React from "react";
import { View, StyleSheet, Text } from "react-native";
import LeftContainer from "./LeftContainer";
import MainContainer from "./MainContainer/MainContainer";

function ListUser({ tweet, Follow = "Follow", Following = "Following" }) {
  return (
    <View style={styles.container}>
      <LeftContainer user={tweet} />
      <MainContainer tweet={tweet} Follow={Follow} Following={Following} />
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

export default ListUser;
