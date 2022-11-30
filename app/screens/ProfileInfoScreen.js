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
import ProfilePicture from "../components/ProfilePicture";
import GlobalContext from "../context/Context";

export default function ProfileInfoScreen({ route }) {
  const [following, setFollowing] = useState(false);
  const [allUsersThatUserFollowing, setAllUsersThatUserFollowing] = useState(
    []
  );
  // console.log("route", route);
  const userBData = route.params.ProfileUser;
  const { userData } = useContext(GlobalContext);
  console.log("userBData", userBData.uid);
  console.log("userData", userData.uid);

  const userFollowingRef = doc(db, "following", userData.uid);
  const userBFollowersRef = doc(db, "followers", userBData.uid);
  const userBThatUserFollowingRef = doc(
    db,
    "following",
    userData.uid,
    "userFollowing",
    userBData.uid
  );

  const FollowersOfUserBRef = doc(
    db,
    "followers",
    userBData.uid,
    "userFollower",
    userData.uid
  );

  const allUsersThatUserFollowingRef = collection(
    db,
    "following",
    userData.uid,
    "userFollowing"
  );

  // function fetchUserFollowing() {}

  useEffect(() => {
    const unsubscribe = onSnapshot(
      allUsersThatUserFollowingRef,
      (querySnapshot) => {
        const allUsersThatUserFollowing = querySnapshot.docs.map((doc) => {
          const id = doc.id;
          return id;
        });
        // setAllUsersThatUserFollowing(allUsersThatUserFollowing);
        if (allUsersThatUserFollowing.indexOf(userBData.uid) > -1) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      }
    );
    return () => unsubscribe();
  }, []);

  console.log("allUsersThatUserFollowing", allUsersThatUserFollowing);

  async function onFollow() {
    try {
      await setDoc(userFollowingRef, {});
      await setDoc(userBThatUserFollowingRef, {});
      await setDoc(userBFollowersRef, {});
      await setDoc(FollowersOfUserBRef, {});
    } catch (error) {
      console.log(error);
    }
    // setFollowing(true);
  }

  async function onUnFollow() {
    try {
      // await setDoc(userRef, {});
      await deleteDoc(userBThatUserFollowingRef, {});
      await deleteDoc(FollowersOfUserBRef, {});
    } catch (error) {
      console.log(error);
    }
    // setFollowing(true);
  }

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
      {userBData.uid != userData.uid ? (
        following ? (
          <AppButton title="Following" onPress={() => onUnFollow()}></AppButton>
        ) : (
          <AppButton title="Follow" onPress={() => onFollow()}></AppButton>
        )
      ) : null}
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
