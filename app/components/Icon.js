import React from "react";
import { View } from "react-native";
import { MaterialCommunityIcons, Ionicons, Fontisto } from "@expo/vector-icons";

function Icon({
  name,
  size = 40,
  backgroundColor = "#000",
  iconColor = "#fff",
  category = "MaterialCommunityIcons",
}) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {category === "MaterialCommunityIcons" && (
        <MaterialCommunityIcons
          name={name}
          color={iconColor}
          size={size * 0.5}
        ></MaterialCommunityIcons>
      )}
      {category === "Ionicons" && (
        <Ionicons name={name} color={iconColor} size={size * 0.5}></Ionicons>
      )}
      {category === "Fontisto" && (
        <Fontisto name={name} color={iconColor} size={size * 0.5}></Fontisto>
      )}

      {/* {category === "MaterialCommunityIcons" ? (
        <MaterialCommunityIcons
          name={name}
          color={iconColor}
          size={size * 0.5}
        ></MaterialCommunityIcons>
      ) : (
        <Ionicons name={name} color={iconColor} size={size * 0.5}></Ionicons>
      )} */}
    </View>
  );
}

export default Icon;
