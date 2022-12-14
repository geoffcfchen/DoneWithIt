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
    const newContacts = parsedCustomers.filter((contact) =>
      contact.displayName
        .toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase())
    );
    setFilteredContacts(newContacts);
  }, [searchTerm, parsedCustomers]);

  return (
    <View style={{ width: "100%", flex: 1 }}>
      <AppTextInput
        icon="account-search"
        value={searchTerm}
        onChangeText={setSearchTerm}
      ></AppTextInput>
      <FlatList
        contentContainerStyle={{ paddingBottom: 109 }}
        data={filteredContacts}
        renderItem={({ item }) => <ListUser tweet={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default Search;
