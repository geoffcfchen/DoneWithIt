import React from "react";
import { Text, View, StyleSheet } from "react-native";

function MyAccountScreen(props) {
  return (
    <View style={styles.container}>
      <Text>test</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "yellow",
  },
});

export default MyAccountScreen;
