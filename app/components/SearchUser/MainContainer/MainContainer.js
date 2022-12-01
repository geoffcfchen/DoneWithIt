import React from "react";
import { View, Text, Image } from "react-native";
import { StyleSheet } from "react-native";

import { Entypo } from "@expo/vector-icons";
import moment from "moment";

import Footer from "./Footer";
import AppButton from "../../AppButton";
import FollowButton from "../../FollowButton";

function MainContainer({ tweet }) {
  console.log("tweet", tweet.user);
  return (
    <View style={styles.container}>
      {/* <Text>test</Text> */}
      <View style={styles.tweetHeaderContainer}>
        <View style={styles.tweetHeaderNames}>
          <Text style={styles.name}>{tweet.user.displayName}</Text>
          {/* <Text style={styles.username}>@{tweet.user.username}</Text> */}
        </View>
        <FollowButton userBData={tweet.user}></FollowButton>
      </View>
      <View>
        {tweet.selfIntro && <Text style={styles.content}>{tweet.content}</Text>}
        {!tweet.selfIntro && (
          <Text style={styles.content}>
            Hi! this is Dr. {tweet.user.displayName}!
          </Text>
        )}
        {/* {!!tweet.selfIntro && (
          <Image style={styles.image} source={{ uri: tweet.image }} />
        )} */}
      </View>
      {/* <Footer tweet={tweet} /> */}
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

export default MainContainer;