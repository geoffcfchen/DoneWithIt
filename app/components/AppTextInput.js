import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";

function AppTextInput({ title, icon, width = "100%", ...otherProps }) {
  return (
    <View style={[styles.container, { width }]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={24}
          color={defaultStyles.colors.medium}
          style={styles.icon}
        ></MaterialCommunityIcons>
      )}
      {title && <Text>{title}</Text>}
      <TextInput
        placeholderTextColor={defaultStyles.colors.medium}
        style={[defaultStyles.text, { flex: 1 }]}
        {...otherProps}
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    padding: 14,
    marginVertical: 1,
  },
  icon: {
    marginRight: 10,
  },
});

export default AppTextInput;
