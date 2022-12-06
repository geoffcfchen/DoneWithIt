import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Text } from "react-native";
import { auth, db } from "../../firebase";
import GlobalContext from "../context/Context";

function SetGlobalUserAFollowers() {
  const { setFollowersOfUser } = useContext(GlobalContext);

  const FollowersOfUserRef = collection(
    db,
    "followers",
    auth.currentUser.uid,
    "userFollower"
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(FollowersOfUserRef, (querySnapshot) => {
      const FollowersOfUser = querySnapshot.docs.map((doc) => {
        const id = doc.id;
        return id;
      });
      setFollowersOfUser(FollowersOfUser);
    });
    return () => unsubscribe();
  }, []);

  return null;
}

export default SetGlobalUserAFollowers;
