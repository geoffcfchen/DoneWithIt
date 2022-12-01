import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, FlatList, Text } from "react-native";
import { db } from "../../firebase";
import tweets from "../data/tweets";
import Tweet from "./Tweet/Tweet";

const postsQuery = query(collection(db, "posts"));

function Feed() {
  // console.log("tweets", tweets);
  const [parsedPosts, setParsedPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(postsQuery, (querySnapshot) => {
      // querySnapshot.docs.map((doc) => console.log("doc", doc.data()));
      const parsedPosts = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // console.log(parsedPosts);
      setParsedPosts(parsedPosts);
    });
    return () => unsubscribe();
  }, []);

  const newTweets = [...tweets, ...parsedPosts];
  console.log(newTweets);

  return (
    <View style={{ width: "100%" }}>
      <FlatList
        // style={{ flex: 1 }}
        data={newTweets}
        renderItem={({ item }) => <Tweet tweet={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default Feed;
