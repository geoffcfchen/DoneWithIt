import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { View, FlatList, TextInput, StyleSheet } from "react-native";
import { auth, db } from "../../firebase";
import GlobalContext from "../context/Context";

import SearchUser from "./SearchUser/Searchuser";

const postsQuery = query(collection(db, "customers"));

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [parsedCustomers, setParsedCustomers] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const { userData } = useContext(GlobalContext);
  console.log(userData);

  useEffect(() => {
    const unsubscribe = onSnapshot(postsQuery, (querySnapshot) => {
      // querySnapshot.docs.map((doc) => console.log("doc", doc.data()));

      let parsedCustomers;
      if (userData.role.label == "Client") {
        parsedCustomers = querySnapshot.docs
          .map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
          .filter((item) => item.role.label == "Doctor");
      } else {
        parsedCustomers = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
      }

      setParsedCustomers(parsedCustomers);
      setFilteredContacts(parsedCustomers);
    });
    return () => unsubscribe();
  }, []);

  // const newTweets = [...tweets, ...parsedPosts];
  // console.log("parsedCustomers", parsedCustomers);

  useEffect(() => {
    const newContacts = parsedCustomers.filter((contact) =>
      contact.displayName
        .toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase())
    );
    setFilteredContacts(newContacts);
  }, [searchTerm]);

  return (
    <View style={{ width: "100%" }}>
      <TextInput
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={styles.serachInput}
        placeholder="Search..."
      ></TextInput>
      <FlatList
        contentContainerStyle={{ paddingBottom: 73.5 }}
        // style={{ flex: 1 }}
        data={filteredContacts}
        renderItem={({ item }) => <SearchUser tweet={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 15,
    backgroundColor: "white",
    flex: 1,
  },
  contactName: { fontSize: 16, marginVertical: 10 },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "#f0f0f0",
  },
  serachInput: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
  },
});

export default Search;
