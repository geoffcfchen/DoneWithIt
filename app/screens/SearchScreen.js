import * as React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from "react-native";

// import Feed from '../components/Feed';
import Screen, { ScreenScrollView } from "../components/Screen";
import AppText from "../components/AppText";
import Feed from "../components/Feed";
import NewTweetButton from "../components/NewTweetButton";
// import SearchUser from "../components/ListUser/ListUser";
import Search from "../components/Search";

export default function SearchScreen() {
  return (
    // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={{ flex: 1 }}>
      <Search></Search>
      {/* <NewTweetButton /> */}
    </View>
    // </TouchableWithoutFeedback>
  );
}
