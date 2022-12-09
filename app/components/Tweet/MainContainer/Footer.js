import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
import { Feather, EvilIcons, AntDesign } from "@expo/vector-icons";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  increment,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../../../firebase";
import NewCommentButton from "../../NewCommentButton";

function Footer({ tweet }) {
  // console.log(tweet);
  const [liking, setLiking] = useState(false);

  const userPostsRef = doc(db, "posts", tweet.id);
  const userPostsLikesRef = doc(
    db,
    "posts",
    tweet.id,
    "likes",
    auth.currentUser.uid
  );
  const alluserPostsLikesRef = collection(db, "posts", tweet.id, "likes");

  useEffect(() => {
    const unsubscribe = onSnapshot(alluserPostsLikesRef, (querySnapshot) => {
      const alluserPostsLikes = querySnapshot.docs.map((doc) => {
        const id = doc.id;
        return id;
      });
      // setAllUsersThatUserFollowing(allUsersThatUserFollowing);
      if (alluserPostsLikes.indexOf(auth.currentUser.uid) > -1) {
        setLiking(true);
      } else {
        setLiking(false);
      }
    });
    return () => unsubscribe();
  }, []);

  async function onLike() {
    // console.log("onLike");
    // console.log("tweet", tweet.id);
    try {
      await updateDoc(userPostsRef, { numberOfLikes: increment(1) });
      await setDoc(userPostsLikesRef, {});
    } catch (error) {
      console.log(error);
    }
  }

  async function onUnLike() {
    // console.log("onLike");
    // console.log("tweet", tweet.id);
    try {
      await updateDoc(userPostsRef, { numberOfLikes: increment(-1) });
      await deleteDoc(userPostsLikesRef, {});
    } catch (error) {
      console.log(error);
    }
  }

  // console.log("liking", liking);

  return (
    <View style={styles.container}>
      <NewCommentButton tweet={tweet}></NewCommentButton>

      <View style={styles.iconContainer}>
        <EvilIcons name={"retweet"} size={28} color={"grey"} />
        <Text style={styles.number}>{tweet.numberOfRetweets}</Text>
      </View>
      {liking ? (
        <TouchableHighlight onPress={() => onUnLike()}>
          <View style={styles.iconContainer}>
            <AntDesign name={"heart"} size={20} color={"red"} />

            <Text style={styles.number}>{tweet.numberOfLikes}</Text>
          </View>
        </TouchableHighlight>
      ) : (
        <TouchableHighlight onPress={() => onLike()}>
          <View style={styles.iconContainer}>
            <AntDesign name={"hearto"} size={20} color={"grey"} />

            <Text style={styles.number}>{tweet.numberOfLikes}</Text>
          </View>
        </TouchableHighlight>
      )}

      <View style={styles.iconContainer}>
        <EvilIcons name={"share-google"} size={28} color={"grey"} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  number: {
    marginLeft: 5,
    color: "grey",
    textAlign: "center",
  },
});

export default Footer;
