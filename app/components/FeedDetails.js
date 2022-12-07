import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { View, FlatList, Text } from "react-native";
import { auth, db } from "../../firebase";
import GlobalContext from "../context/Context";
import tweets from "../data/tweets";
import AppText from "./AppText";
import Tweet from "./Tweet/Tweet";

const postsQuery = query(collection(db, "posts"));

function FeedDetails({ tweet }) {
  const [parsedPosts, setParsedPosts] = useState([]);
  const { allUsersThatUserFollowing } = useContext(GlobalContext);

  useEffect(() => {
    const allUsersThatUserFollowingAndSelf = [
      ...allUsersThatUserFollowing,
      auth.currentUser.uid,
    ];
    const unsubscribe = onSnapshot(postsQuery, (querySnapshot) => {
      // querySnapshot.docs.map((doc) => console.log("doc", doc.data()));
      const parsedPosts = querySnapshot.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .filter((doc) =>
          allUsersThatUserFollowingAndSelf.includes(doc.user.uid)
        )
        .sort(
          (a, b) =>
            b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime()
        );
      setParsedPosts(parsedPosts);
    });
    return () => unsubscribe();
  }, [allUsersThatUserFollowing]);

  const newTweets = [...tweets, ...parsedPosts].sort(
    (a, b) => b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime()
  );

  // console.log("newTweets", newTweets);

  const header = () => {
    return (
      <View>
        <AppText> Coffee list</AppText>
      </View>
    );
  };

  return (
    <View style={{ width: "100%" }}>
      <FlatList
        // style={{ flex: 1 }}
        ListHeaderComponent={header}
        data={newTweets}
        renderItem={({ item }) => <Tweet tweet={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default FeedDetails;
