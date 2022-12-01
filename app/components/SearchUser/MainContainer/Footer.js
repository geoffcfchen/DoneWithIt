import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather, EvilIcons, AntDesign } from "@expo/vector-icons";

const Footer = ({ tweet }) => (
  <View style={styles.container}>
    <View style={styles.iconContainer}>
      <Feather name={"message-circle"} size={20} color={"grey"} />
      <Text style={styles.number}>{tweet.numberOfComments}</Text>
    </View>
    <View style={styles.iconContainer}>
      <EvilIcons name={"retweet"} size={28} color={"grey"} />
      <Text style={styles.number}>{tweet.numberOfRetweets}</Text>
    </View>
    <View style={styles.iconContainer}>
      <AntDesign name={"hearto"} size={20} color={"grey"} />
      <Text style={styles.number}>{tweet.numberOfLikes}</Text>
    </View>
    <View style={styles.iconContainer}>
      <EvilIcons name={"share-google"} size={28} color={"grey"} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  number: {
    marginLeft: 5,
    color: "grey",
    textAlign: "center",
  },
});

export default Footer;
