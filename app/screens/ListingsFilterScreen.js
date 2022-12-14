import React, { useState, useEffect, useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import colors from "../config/colors";

import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase";
import GlobalContext from "../context/Context";
import NewQuestionButton from "../components/NewQuestionButton";
import { useNavigation } from "@react-navigation/native";
import ListingCard from "../components/ListingCard";

function ListingsFilterScreen() {
  const { userData } = useContext(GlobalContext);
  const [pastQuestions, setPastQuestions] = useState([]);

  const questionsQuery = query(
    collection(db, "questions"),
    where("participantsArray", "array-contains", userData.email)
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(questionsQuery, (querySnapshot) => {
      // querySnapshot.docs.map((doc) => console.log("doc", doc.data()));
      const parsedQuestions = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        userB: doc.data().participants.find((p) => p.email !== userData.email),
      }));
      const nowDate = new Date();
      const pastQuestions = parsedQuestions
        .filter(
          (doc) =>
            doc.lastMessage &&
            doc.datetime &&
            doc.datetime.toDate().getTime() < nowDate
        )
        .sort(
          (a, b) =>
            a.datetime.toDate().getTime() - b.datetime.toDate().getTime()
        );
      setPastQuestions(pastQuestions);
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.screen}>
      <ListingCard questions={pastQuestions}></ListingCard>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: 2,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: colors.light,
    flex: 1,
  },
});

export default ListingsFilterScreen;
