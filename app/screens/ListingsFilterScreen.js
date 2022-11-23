import React, { useState, useEffect, useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import Card from "../components/Card";
import colors from "../config/colors";
import listingsApi from "../api/listing";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import useApi from "../hooks/useApi";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase";
import GlobalContext from "../context/Context";
import AuthContext from "../auth/context";
import moment from "moment";
import NewQuestionButton from "../components/NewQuestionButton";
import { useNavigation } from "@react-navigation/native";
import ListingCard from "../components/ListingCard";

function ListingsFilterScreen({ questions }) {
  const navigation = useNavigation();
  const { userData } = useContext(GlobalContext);
  // console.log("questions", questions);
  return (
    <View style={styles.screen}>
      <ListingCard questions={questions}></ListingCard>
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

export default ListingsFilterScreen;
