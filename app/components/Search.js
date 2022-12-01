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
import SearchUser from "./SearchUser/Searchuser";
import Tweet from "./Tweet/Tweet";

const postsQuery = query(collection(db, "posts"));

function Search() {
  const [parsedPosts, setParsedPosts] = useState([]);
  const { allUsersThatUserFollowing } = useContext(GlobalContext);

  useEffect(() => {
    const unsubscribe = onSnapshot(postsQuery, (querySnapshot) => {
      // querySnapshot.docs.map((doc) => console.log("doc", doc.data()));
      const parsedPosts = querySnapshot.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .filter((doc) => allUsersThatUserFollowing.includes(doc.user.uid))
        .sort(
          (a, b) =>
            b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime()
        );
      setParsedPosts(parsedPosts);
    });
    return () => unsubscribe();
  }, []);

  const newTweets = [...tweets, ...parsedPosts].sort(
    (a, b) => b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime()
  );
  // console.log("newTweets", newTweets);

  return (
    <View style={{ width: "100%" }}>
      <FlatList
        // style={{ flex: 1 }}
        data={newTweets}
        renderItem={({ item }) => <SearchUser tweet={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default Search;
