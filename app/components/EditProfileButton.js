import React, { useContext, useEffect, useState } from "react";

import colors from "../config/colors";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  QuerySnapshot,
  setDoc,
} from "firebase/firestore";

import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { db } from "../../firebase";
import AppButton from "./AppButton";
import ProfilePicture from "./ProfilePicture";
import GlobalContext from "../context/Context";
import { useNavigation } from "@react-navigation/native";

function ProfileEdiButton({ userBData }) {
  // const [following, setFollowing] = useState(false);
  const { userData } = useContext(GlobalContext);
  const navigation = useNavigation();

  // const userFollowingRef = doc(db, "following", userData.uid);
  // const userBFollowersRef = doc(db, "followers", userBData.uid);
  // const userBThatUserFollowingRef = doc(
  //   db,
  //   "following",
  //   userData.uid,
  //   "userFollowing",
  //   userBData.uid
  // );

  // const FollowersOfUserBRef = doc(
  //   db,
  //   "followers",
  //   userBData.uid,
  //   "userFollower",
  //   userData.uid
  // );

  // const allUsersThatUserFollowingRef = collection(
  //   db,
  //   "following",
  //   userData.uid,
  //   "userFollowing"
  // );

  // useEffect(() => {
  //   const unsubscribe = onSnapshot(
  //     allUsersThatUserFollowingRef,
  //     (querySnapshot) => {
  //       const allUsersThatUserFollowing = querySnapshot.docs.map((doc) => {
  //         const id = doc.id;
  //         return id;
  //       });
  //       // setAllUsersThatUserFollowing(allUsersThatUserFollowing);
  //       if (allUsersThatUserFollowing.indexOf(userBData.uid) > -1) {
  //         setFollowing(true);
  //       } else {
  //         setFollowing(false);
  //       }
  //     }
  //   );
  //   return () => unsubscribe();
  // }, []);

  // async function onFollow() {
  //   try {
  //     await setDoc(userFollowingRef, {});
  //     await setDoc(userBThatUserFollowingRef, {});
  //     await setDoc(userBFollowersRef, {});
  //     await setDoc(FollowersOfUserBRef, {});
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   // setFollowing(true);
  // }

  // async function onUnFollow() {
  //   try {
  //     // await setDoc(userRef, {});
  //     await deleteDoc(userBThatUserFollowingRef, {});
  //     await deleteDoc(FollowersOfUserBRef, {});
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   // setFollowing(true);
  // }

  return (
    <View>
      {userBData.uid == userData.uid && (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "white" }]}
          onPress={() => navigation.navigate("ProfileEdit")}
        >
          <Text style={[styles.text, { color: "black" }]}> Edit Profile </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderWidth: 0.2,
    // borderColor: "black",
    // width: "100%",
    // marginVertical: 5,
  },
  text: {
    color: colors.white,
    fontSize: 13,
    // textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default ProfileEdiButton;
