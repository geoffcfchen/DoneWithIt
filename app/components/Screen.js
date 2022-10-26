import React from "react";
import Constants from "expo-constants";
import {
  View,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";

function Screen({ children, style }) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={[styles.view, style]}>{children}</View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
  view: {
    flex: 1,
    padding: 10,
  },
});

export default Screen;
