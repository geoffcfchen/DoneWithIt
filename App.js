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
import AppButton from "./app/components/AppButton";

import colors from "./app/config/colors";

export default function App() {
  return (
    <View
      style={{
        backgroundColor: "#f8f4f4",
        padding: 20,
        paddingTop: 100,
      }}
    >
      <Card
        title="Red Jack for sale"
        subTitle="$100"
        image="./app/assets/jacket.jpg"
      ></Card>
    </View>
  );
}
