import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import AppText from "./AppText";
import Icon from "./Icon";
import colors from "../config/colors";

function ContactsPickerItem({ item, onPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Icon
          backgroundColor={colors.primary}
          name="doctor"
          size={80}
          category="Fontisto"
        ></Icon>
      </TouchableOpacity>
      <AppText style={styles.label}>{item.contactName}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    alignItems: "center",
    width: "33%",
  },
  label: {
    marginTop: 5,
    textAlign: "center",
  },
});

export default ContactsPickerItem;
