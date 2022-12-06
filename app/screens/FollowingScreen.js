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

function FollowingScreen({ UserBData, Following }) {
  const parsedCustomers = useGetCustomers(UserBData);

  const filterParsedCustomers = parsedCustomers.filter(
    (item) => Following.indexOf(item.uid) > -1
  );

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

export default FollowingScreen;
