import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  QuerySnapshot,
  setDoc,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { db } from "../../firebase";
import AppButton from "../components/AppButton";
import FollowButton from "../components/FollowButton";
import ProfilePicture from "../components/ProfilePicture";
import GlobalContext from "../context/Context";

export default function ProfileInfoScreen({ route }) {
  const userBData = route.params.ProfileUser;
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
      {userBData && (
        <Image source={{ uri: userBData.photoURL }} style={styles.profile} />
      )}
      <Text style={{ fontSize: 30, fontWeight: "bold" }}>
        {userBData.displayName}
      </Text>
      <FollowButton userBData={userBData}></FollowButton>
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
