import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { View } from "react-native";
import GlobalContext from "../../context/Context";
import ProfilePicture from "../ProfilePicture";

function LeftContainer({ user }) {
  const navigation = useNavigation();
  return (
    <View>
      <ProfilePicture
        userData={user}
        size={45}
        onPress={() => navigation.push("ProfileInfo", { ProfileUser: user })}
      />
    </View>
  );
}

export default LeftContainer;
