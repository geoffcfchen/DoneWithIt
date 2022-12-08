import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { auth, db } from "../../firebase";
import GlobalContext from "../context/Context";
import tweets from "../data/tweets";
import AppText from "./AppText";
import Comment from "./Tweet/Comment";
import LeftContainer from "./Tweet/LeftContainer";
import LeftContainerCommentHeader from "./Tweet/LeftContainerCommentHeader";
import MainContainer from "./Tweet/MainContainer/MainContainer";
import MainContainerCommentHeader from "./Tweet/MainContainer/MainContainerCommentHeader";
import Tweet from "./Tweet/Tweet";

function FeedDetails({ tweet }) {
  const [parsedComments, setParsedComments] = useState([]);

  const allUserCommentsRef = collection(db, "posts", tweet.id, "comments");

  useEffect(() => {
    const unsubscribe = onSnapshot(allUserCommentsRef, (querySnapshot) => {
      // querySnapshot.docs.map((doc) => console.log("doc", doc.data()));
      const parsedComments = querySnapshot.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .sort(
          (a, b) =>
            b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime()
        );
      setParsedComments(parsedComments);
    });
    return () => unsubscribe();
  }, []);

  // console.log("newTweets", newTweets);

  const header = () => {
    return (
      <View style={styles.container}>
        <LeftContainerCommentHeader userB={tweet.user} />
        <MainContainerCommentHeader tweet={tweet} />
      </View>
    );
  };

  return (
    <View style={{ width: "100%" }}>
      <FlatList
        // style={{ flex: 1 }}
        ListHeaderComponent={header}
        data={parsedComments}
        renderItem={({ item }) => <Comment tweet={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // flexDirection: "row",
    padding: 15,
    borderBottomWidth: 0.5,
    borderColor: "lightgrey",
  },
});

export default FeedDetails;
