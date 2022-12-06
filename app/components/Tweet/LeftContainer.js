import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { View } from "react-native";
import GlobalContext from "../../context/Context";
import ProfilePicture from "../ProfilePicture";

function LeftContainer({ userB }) {
  const navigation = useNavigation();
  const { whereTab, userData } = useContext(GlobalContext);
  // console.log("user", user);
  return (
    <View>
      <ProfilePicture
        userData={userB}
        size={45}
        onPress={() =>
          navigation.navigate("AppNavigator", {
            screen: whereTab,
            params: {
              screen: "ProfileInfo",
              params: { ProfileUser: userB },
            },
          })
        }
      />
    </View>
  );
}

export default LeftContainer;
