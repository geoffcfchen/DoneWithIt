import React, { useState, useEffect, useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import colors from "../config/colors";

import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase";
import GlobalContext from "../context/Context";

import NewQuestionButton from "../components/NewQuestionButton";
import { useNavigation } from "@react-navigation/native";
import ListingCard from "../components/ListingCard";
import useGetCustomers from "../hooks/useGetCustomers";
import ListUser from "../components/ListUser/ListUser";

function FollowersScreen() {
  const { userData, followersOfUser } = useContext(GlobalContext);
  const parsedCustomers = useGetCustomers(userData);
  // console.log("parsedCustomers", parsedCustomers[3].uid);
  // console.log("followersOfUser", followersOfUser);
  // console.log("test", followersOfUser.indexOf(parsedCustomers[3].uid) > -1);

  const filterParsedCustomers = parsedCustomers.filter(
    (item) => followersOfUser.indexOf(item.uid) > -1
  );
  // console.log("filterParsedCustomers", filterParsedCustomers);

  return (
    <View style={{ width: "100%" }}>
      <FlatList
        contentContainerStyle={{ paddingBottom: 109 }}
        // style={{ flex: 1 }}
        data={filterParsedCustomers}
        renderItem={({ item }) => <ListUser tweet={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: 2,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: colors.light,
    flex: 1,
  },
});

export default FollowersScreen;
