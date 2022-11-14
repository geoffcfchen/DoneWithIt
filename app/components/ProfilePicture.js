import React from "react";
import { Image, TouchableWithoutFeedback } from "react-native";

const ProfilePicture = ({ onPress, image, size = 50 }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <Image
      source={{ uri: image }}
      style={{
        width: size,
        height: size,
        borderRadius: size,
      }}
    />
  </TouchableWithoutFeedback>
);

export default ProfilePicture;
