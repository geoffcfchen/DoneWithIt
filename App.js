import React from "react";
import {
  View,
  ImageBackground,
  Image,
  SafeAreaView,
  Text,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ViewImageScreen from "./app/screens/ViewImageScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";

import AppText from "./app/components/AppText";

const image = require("./app/assets/background.jpg");

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AppText>I love React Native</AppText>
    </View>
  );
}
