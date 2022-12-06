import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Text } from "react-native";
import { auth, db } from "../../firebase";
import GlobalContext from "../context/Context";

function Followers({ userBData }) {
  const navigation = useNavigation();
  const { whereTab } = useContext(GlobalContext);

  const [followerNumber, setFollowerNumber] = useState(0);
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
      setFollowerNumber(FollowersOfUser.length);
      setUserBFollowers(FollowersOfUser);
    });
    return () => unsubscribe();
  }, []);
  // console.log("userBData", userBData);
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.push("FollowScreen", {
          ProfileUser: userBData,
          Following: userBFollowing,
          Followers: userBFollowers,
          Init: "Followers",
        })
      }
    >
      <View style={styles.followers}>
        <Text style={styles.number}>{followerNumber}</Text>
        <Text style={styles.text}> Followers</Text>
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
  followers: {
    flexDirection: "row",
  },
});

export default Followers;
