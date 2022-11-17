import React from "react";
import { View, FlatList, Text } from "react-native";
import tweets from "../data/tweets";
import Tweet from "./Tweet/Tweet";

function Feed() {
  // console.log("tweets", tweets);
  return (
    <View style={{ width: "100%" }}>
      <FlatList
        // style={{ flex: 1 }}
        data={tweets}
        renderItem={({ item }) => <Tweet tweet={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default Feed;
