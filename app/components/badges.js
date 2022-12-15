import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  FontAwesome5,
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
  Fontisto,
} from "@expo/vector-icons";
import colors from "../config/colors";

export function GeneralPracticeBadges() {
  return (
    <View style={styles.badge}>
      <View
        style={{
          position: "absolute",
        }}
      >
        <FontAwesome name="circle" size={22} color={colors.tint} />
      </View>
      <View
        style={{
          position: "absolute",
        }}
      >
        <Fontisto name="sun" size={25} color={colors.tint} />
      </View>
      <View style={{ marginTop: 2 }}>
        <FontAwesome5 name="stethoscope" size={12} color="white" />
      </View>
    </View>
  );
}

export function SpecialistBadges() {
  return (
    <View style={styles.badge}>
      <View
        style={{
          position: "absolute",
        }}
      >
        <FontAwesome name="circle" size={22} color={colors.purple} />
      </View>
      <View
        style={{
          position: "absolute",
        }}
      >
        <Fontisto name="sun" size={25} color={colors.purple} />
      </View>
      <View style={{ marginTop: 2 }}>
        <FontAwesome5 name="stethoscope" size={12} color="white" />
      </View>
    </View>
  );
}

export function ClinicBadges() {
  return (
    <View style={styles.badge}>
      <View
        style={{
          position: "absolute",
        }}
      >
        <FontAwesome name="circle" size={22} color={colors.green} />
      </View>
      <View
        style={{
          position: "absolute",
        }}
      >
        <Fontisto name="sun" size={25} color={colors.green} />
      </View>
      <View>
        <FontAwesome5 name="clinic-medical" size={10} color="white" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
