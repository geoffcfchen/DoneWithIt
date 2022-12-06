import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Text } from "react-native";
import { auth, db } from "../../firebase";
import GlobalContext from "../context/Context";

function SetGlobalUserAFollowing() {
  const { setAllUsersThatUserFollowing } = useContext(GlobalContext);

  const allUsersThatUserFollowingRef = collection(
    db,
    "following",
    auth.currentUser.uid,
    "userFollowing"
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(
      allUsersThatUserFollowingRef,
      (querySnapshot) => {
        const allUsersThatUserFollowing = querySnapshot.docs.map((doc) => {
          const id = doc.id;
          return id;
        });
        setAllUsersThatUserFollowing(allUsersThatUserFollowing);
      }
    );
    return () => unsubscribe();
  }, []);

  return null;
}

export default SetGlobalUserAFollowing;
