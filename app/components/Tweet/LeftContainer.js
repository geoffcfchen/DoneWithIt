import React from "react";
import { View } from "react-native";
import ProfilePicture from "../ProfilePicture";

const LeftContainer = ({ user }) => (
  <View>
    <ProfilePicture userData={user} size={45} />
  </View>
);

export default LeftContainer;
