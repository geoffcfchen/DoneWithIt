import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { View } from "react-native";
import GlobalContext from "../../context/Context";
import useGetSingleCustomerInfo from "../../hooks/useGetSingleCustomerInfo";
import ProfilePicture from "../ProfilePicture";

function LeftContainer({ userB }) {
  const navigation = useNavigation();
  const parsedCustomers = useGetSingleCustomerInfo(userB.uid);

  function onPress() {
    return navigation.push("ProfileInfo", { ProfileUser: parsedCustomers });
  }
  return (
    <View>
      <ProfilePicture userData={parsedCustomers} size={45} onPress={onPress} />
    </View>
  );
}

export default LeftContainer;
