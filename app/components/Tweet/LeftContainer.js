import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { View } from "react-native";
import GlobalContext from "../../context/Context";
import useGetSingleCustomerInfo from "../../hooks/useGetSingleCustomerInfo";
import ProfilePicture from "../ProfilePicture";

function LeftContainer({ userB }) {
  const navigation = useNavigation();
  const parsedCustomers = useGetSingleCustomerInfo(userB.uid)[0];

  function onPress() {
    return navigation.push("ProfileInfo", { ProfileUser: parsedCustomers });
  }
  return (
    <View>
      <ProfilePicture userData={userB} size={45} onPress={onPress} />
    </View>
  );
}

export default LeftContainer;
