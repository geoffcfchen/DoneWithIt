import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

export default function badges() {
  return (
    <View style={styles.badge}>
      <FontAwesome name="stethoscope" size={30} color="white" />
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingTop: 3,
    paddingLeft: 2,
    marginLeft: 10,
    borderRadius: 15,
    width: 30,
    height: 30,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
});
