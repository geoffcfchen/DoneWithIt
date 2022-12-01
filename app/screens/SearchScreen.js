import * as React from "react";
import { View, StyleSheet } from "react-native";

// import Feed from '../components/Feed';
import Screen, { ScreenScrollView } from "../components/Screen";
import AppText from "../components/AppText";
import Feed from "../components/Feed";
import NewTweetButton from "../components/NewTweetButton";
import SearchUser from "../components/SearchUser/Searchuser";
import Search from "../components/Search";

export default function SearchScreen() {
  return (
    <View>
      <Search></Search>
      {/* <NewTweetButton /> */}
    </View>
  );
}
