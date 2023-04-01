import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

function CallButton({ iconName, backgroundColor, onPress, style }) {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.button, style, { backgroundColor: backgroundColor }]}
      >
        <Icon name={iconName} color="black" size={14}></Icon>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 28,
    height: 28,
    padding: 5,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
});

export default CallButton;
