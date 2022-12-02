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
import useGetCustomers from "../hooks/useGetCustomers";
import AppTextInput from "./AppTextInput";
import ListUser from "./ListUser/ListUser";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredContacts, setFilteredContacts] = useState(parsedCustomers);
  const { userData } = useContext(GlobalContext);

  const parsedCustomers = useGetCustomers(userData);

  useEffect(() => {
    // console.log("parsedCustomers", parsedCustomers);
    const newContacts = parsedCustomers.filter((contact) =>
      contact.displayName
        .toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase())
    );
    setFilteredContacts(newContacts);
  }, [searchTerm, parsedCustomers]);

  return (
    <View style={{ width: "100%" }}>
      <AppTextInput
        icon="account-search"
        value={searchTerm}
        onChangeText={setSearchTerm}
      ></AppTextInput>
      <FlatList
        contentContainerStyle={{ paddingBottom: 109 }}
        // style={{ flex: 1 }}
        data={filteredContacts}
        renderItem={({ item }) => <ListUser tweet={item} />}
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
