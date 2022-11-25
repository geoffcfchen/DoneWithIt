import * as React from "react";
import { Text, View } from "react-native";

export default function ProfileTestScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#333333",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#fff", fontWeight: "bold" }}>Profile</Text>
    </View>
  );
}
