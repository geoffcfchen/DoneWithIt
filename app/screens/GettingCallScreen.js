import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import CallButton from "../components/CallButton";

export default function GettingCallScreen({ join, hangup }) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://picsum.photos/200/300" }}
        style={styles.image}
      ></Image>
      <View style={styles.bContainer}>
        <CallButton
          iconName="phone"
          backgroundColor="green"
          onPress={join}
          style={{ marginRight: 30 }}
        ></CallButton>
        <CallButton
          iconName="phone"
          backgroundColor="red"
          onPress={hangup}
          style={{ marginLeft: 30 }}
        ></CallButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  bContainer: { flexDirection: "row", bottom: 30 },
});
