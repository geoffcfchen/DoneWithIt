import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Text } from "react-native";
import { auth, db } from "../../firebase";
import GlobalContext from "../context/Context";

function Following({ userBData }) {
  const { whereTab } = useContext(GlobalContext);
  const navigation = useNavigation();
  const [followingNumber, setFollowingNumber] = useState(0);
  const [userBFollowers, setUserBFollowers] = useState([]);
  const [userBFollowing, setUserBFollowing] = useState([]);

  const allUsersThatUserBFollowingRef = collection(
    db,
    "following",
    userBData.uid,
    "userFollowing"
  );

  const FollowersOfUserRef = collection(
    db,
    "followers",
    userBData.uid,
    "userFollower"
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(
      allUsersThatUserBFollowingRef,
      (querySnapshot) => {
        const allUsersThatUserBFollowing = querySnapshot.docs.map((doc) => {
          const id = doc.id;
          return id;
        });
        setFollowingNumber(allUsersThatUserBFollowing.length);
        setUserBFollowing(allUsersThatUserBFollowing);
      }
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(FollowersOfUserRef, (querySnapshot) => {
      const FollowersOfUser = querySnapshot.docs.map((doc) => {
        const id = doc.id;
        return id;
      });
      setUserBFollowers(FollowersOfUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.push("FollowScreen", {
          ProfileUser: userBData,
          Following: userBFollowing,
          Followers: userBFollowers,
          Init: "Following",
        })
      }
    >
      <View style={styles.following}>
        <Text style={styles.number}>{followingNumber}</Text>
        <Text style={styles.text}> Following</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  number: {
    fontSize: 16,
    fontWeight: "bold",
    // color: "#fff",
  },
  text: {
    fontSize: 16,
    // color: "#898f93",
  },
  following: {
    flexDirection: "row",
    marginRight: 15,
  },
});

export default Following;
