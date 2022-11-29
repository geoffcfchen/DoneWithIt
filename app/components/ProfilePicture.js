import React from "react";
import { Image, TouchableWithoutFeedback } from "react-native";

const ProfilePicture = ({ onPress, userData, size = 50 }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <Image
      source={
        userData
          ? {
              uri: userData.photoURL,
            }
          : require("../assets/icon-square.png")
      }
      style={{
        width: size,
        height: size,
        borderRadius: size,
      }}
    />
  </TouchableWithoutFeedback>
);

export default ProfilePicture;
