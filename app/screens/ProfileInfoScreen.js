import React, { useContext } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import AppButton from "../components/AppButton";
import ProfilePicture from "../components/ProfilePicture";
import GlobalContext from "../context/Context";

export default function ProfileInfoScreen({ route }) {
  console.log("route", route);
  const userData = route.params.ProfileUser;
  // const { userData } = useContext(GlobalContext);

  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: "white",
        marginTop: 50,
        // justifyContent: "center",
        alignItems: "center",
      }}
    >
      {userData && (
        <Image source={{ uri: userData.photoURL }} style={styles.profile} />
      )}
      <Text style={{ fontSize: 30, fontWeight: "bold" }}>
        {userData.displayName}
      </Text>
      <AppButton title="following"></AppButton>
    </View>
  );
}

const styles = StyleSheet.create({
  profile: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
});
