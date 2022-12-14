import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { StyleSheet } from "react-native";

import { Entypo } from "@expo/vector-icons";
import moment from "moment";

import Footer from "./Footer";

function MainContainerCommentHeader({ tweet }) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.content}>{tweet.content}</Text>
        {!!tweet.image && (
          <Image style={styles.image} source={{ uri: tweet.image }} />
        )}
        <Text style={styles.createdAt}>
          {moment(tweet.createdAt.toDate()).format("hh:mm A, MM/DD/YYYY")}
        </Text>
      </View>
      <Footer tweet={tweet} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  tweetHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tweetHeaderNames: {
    flexDirection: "row",
  },
  name: {
    marginRight: 5,
    fontWeight: "bold",
  },
  username: {
    marginRight: 5,
    color: "grey",
  },
  createdAt: {
    marginRight: 5,
    color: "grey",
  },
  content: {
    marginTop: 5,
    lineHeight: 18,
  },
  image: {
    marginVertical: 10,
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 15,
    overflow: "hidden",
  },
});

export default MainContainerCommentHeader;
