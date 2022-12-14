import React, { useContext, useMemo, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Modal,
} from "react-native";

// import { Text, View } from "../components/Themed";
import { Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import ProfilePicture from "../components/ProfilePicture";
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";
import GlobalContext from "../context/Context";
import { auth, db } from "../../firebase";
import {
  doc,
  increment,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { async } from "@firebase/util";
import { nanoid } from "nanoid";

export default function NewCommentScreen({ onCloseTweet, tweet }) {
  const randomID = useMemo(() => nanoid(), []);
  const [comment, setComment] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { userData } = useContext(GlobalContext);

  const currentUser = auth.currentUser;
  const userPostsRef = doc(db, "posts", tweet.id);
  const userCommentsRef = doc(db, "posts", tweet.id, "comments", randomID);

  const unsub = onSnapshot(userPostsRef, (doc) => {
    console.log("Current data: ", doc.data());
  });

  unsub();

  async function onPostTweet() {
    try {
      // await setDoc(userPostsRef, {});
      await updateDoc(userPostsRef, { numberOfComments: increment(1) });
      await setDoc(userCommentsRef, {
        user: {
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
          role: userData.role,
        },
        createdAt: new Date(),
        content: comment,
      });
    } catch (error) {
      console.log(error);
    }
    onCloseTweet();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <AntDesign
          name="close"
          size={30}
          color={colors.tint}
          onPress={onCloseTweet}
        />
        <TouchableOpacity style={styles.button} onPress={onPostTweet}>
          <Text style={styles.buttonText}>Reply</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.newTweetContainer}>
        <ProfilePicture userData={userData} />
        <View style={styles.inputsContainer}>
          <TextInput
            value={comment}
            onChangeText={(value) => setComment(value)}
            multiline={true}
            numberOfLines={3}
            style={styles.tweetInput}
            placeholder={"Your reply"}
            keyboardType="default"
          />
          {/* <TextInput
            value={imageUrl}
            onChangeText={(value) => setImageUrl(value)}
            style={styles.imageInput}
            placeholder={"Image url (optional)"}
          /> */}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    backgroundColor: "white",
  },
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  button: {
    backgroundColor: colors.tint,
    borderRadius: 30,
  },
  buttonText: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  newTweetContainer: {
    flexDirection: "row",
    padding: 15,
  },
  inputsContainer: {
    marginLeft: 10,
  },
  tweetInput: {
    height: 100,
    maxHeight: 300,
    fontSize: 20,
  },
  imageInput: {},
});
