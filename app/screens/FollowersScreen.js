import React, { useState, useEffect, useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import colors from "../config/colors";

import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase";
import GlobalContext from "../context/Context";

import NewQuestionButton from "../components/NewQuestionButton";
import { useNavigation } from "@react-navigation/native";
import ListingCard from "../components/ListingCard";

function FollowersScreen() {
  return <View style={styles.screen}></View>;
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
