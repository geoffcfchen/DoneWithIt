import React, { useState } from "react";
import {
  View,
  ImageBackground,
  Image,
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  Switch,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ViewImageScreen from "./app/screens/ViewImageScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";

import AppText from "./app/components/AppText";
import AppButton from "./app/components/AppButton";

import colors from "./app/config/colors";
import Card from "./app/components/Card";
import ListingDetailsScreen from "./app/screens/ListingDetailsScreen";
import MessagesScreen from "./app/screens/MessagesScreen";
import AccountScreen from "./app/screens/AccountScreen";
import Screen from "./app/components/Screen";
import Icon from "./app/components/Icon";
import ListItem from "./app/components/ListItem";
import ListingsScreen from "./app/screens/ListingsScreen";
import AppTextInput from "./app/components/AppTextInput";
import AppPicker from "./app/components/AppPicker";

export default function App() {
  const [isNew, setIsNew] = useState(false);
  return (
    <Screen>
      <AppPicker icon="apps" placeholder="Category"></AppPicker>
      <AppTextInput icon="email" placeholder="Email"></AppTextInput>
    </Screen>
  );
}

//
