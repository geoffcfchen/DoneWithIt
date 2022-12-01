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

const postsQuery = query(collection(db, "customers"));

function Search() {
  const [parsedCustomers, setParsedCustomers] = useState([]);
  const { allUsersThatUserFollowing } = useContext(GlobalContext);

  useEffect(() => {
    const unsubscribe = onSnapshot(postsQuery, (querySnapshot) => {
      // querySnapshot.docs.map((doc) => console.log("doc", doc.data()));
      const parsedCustomers = querySnapshot.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .filter((item) => item.role.label == "Doctor");

      setParsedCustomers(parsedCustomers);
    });
    return () => unsubscribe();
  }, []);

  // const newTweets = [...tweets, ...parsedPosts];
  console.log("parsedCustomers", parsedCustomers);

  return (
    <View style={{ width: "100%" }}>
      <FlatList
        // style={{ flex: 1 }}
        data={parsedCustomers}
        renderItem={({ item }) => <SearchUser tweet={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default Search;
