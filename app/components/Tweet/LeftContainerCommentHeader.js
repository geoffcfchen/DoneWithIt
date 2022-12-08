import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import GlobalContext from "../../context/Context";
import ProfilePicture from "../ProfilePicture";

import { Entypo } from "@expo/vector-icons";

function LeftContainerCommentHeader({ userB }) {
  const navigation = useNavigation();
  console.log("user", userB);

  return (
    <View style={styles.tweetHeaderContainer}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <ProfilePicture
          userData={userB}
          size={45}
          onPress={() => navigation.push("ProfileInfo", { ProfileUser: userB })}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.name}>{userB.displayName}</Text>
          <Text style={styles.username}>@{userB.username}</Text>
        </View>
      </View>
      <Entypo name={"chevron-down"} size={16} color={"grey"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  tweetHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tweetHeaderNames: {
    flexDirection: "row",
  },
  name: {
    fontWeight: "bold",
  },
  username: {
    color: "grey",
  },
  createdAt: {
    marginRight: 5,
    color: "grey",
  },
  content: {
    marginTop: 5,
    lineHeight: 18,
  },
  image: {
    marginVertical: 10,
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 15,
    overflow: "hidden",
  },
});

export default LeftContainerCommentHeader;
