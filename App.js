import React from "react";
import {
  View,
  ImageBackground,
  Image,
  SafeAreaView,
  Text,
  StyleSheet,
} from "react-native";
import ViewImageScreen from "./app/screens/ViewImageScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";

const image = require("./app/assets/background.jpg");

export default function App() {
  return <ViewImageScreen></ViewImageScreen>;
}
