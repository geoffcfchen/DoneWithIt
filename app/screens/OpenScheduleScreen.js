import React, { useState, useEffect, useContext } from "react";
import { FlatList, StyleSheet } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import Card from "../components/Card";
import colors from "../config/colors";
import listingsApi from "../api/listing";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import useApi from "../hooks/useApi";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase";
import GlobalContext from "../context/Context";
import AuthContext from "../auth/context";

const listings = [
  {
    id: 1,
    user: { _id: "test", avatar: "test", name: "name" },
    title: "Skin discharge or oozing?",
    description:
      "Clear, sticky, wound-like spots on your dogs skin would describe something colloquially called a “hot spot”, or acute moist dermatitis. Hot Spots develop from a bacterial or fungal skin infection that occurs from",
    image: require("../assets/dog-head.jpeg"),
  },
];

// function ListingsScreen({ navigation }) {
//   const getListingsApi = useApi(listingsApi.getListings);

//   useEffect(() => {
//     getListingsApi.request();
//   }, []);

//   console.log(getListingsApi);
//   console.log(listings);

//   return (
//     <>
//       <ActivityIndicator visible={getListingsApi.loading}></ActivityIndicator>
//       <Screen style={styles.screen}>
//         {getListingsApi.error && (
//           <>
//             <AppText>Couldn't retrieve the listings.</AppText>
//             <AppButton
//               title="Retry"
//               onPress={getListingsApi.request}
//             ></AppButton>
//           </>
//         )}

//         <FlatList
//           data={listings}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={({ item }) => (
//             <Card
//               title={item.title}
//               subTitle={"$" + item.price}
//               imageUrl={item.image}
//               onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
//               thumbnailUrl={item.image[0].thumbnailUrl}
//             ></Card>
//           )}
//         ></FlatList>
//       </Screen>
//     </>
//   );
// }

function OpenScheduleScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const { questions, setQuestions, setUnfilteredQuestions } =
    useContext(GlobalContext);

  const questionsQuery = query(
    collection(db, "questions"),
    where("participantsArray", "array-contains", user.email)
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(questionsQuery, (querySnapshot) => {
      // querySnapshot.docs.map((doc) => console.log("doc", doc.data()));
      const parsedQuestions = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        userB: doc.data().participants.find((p) => p.email !== user.email),
      }));
      // .sort(
      //   (a, b) =>
      //     b.lastMessage.createdAt.toDate().getTime() -
      //     a.lastMessage.createdAt.toDate().getTime()
      // );
      // console.log("parsedQuestions", parsedQuestions);
      setUnfilteredQuestions(parsedQuestions);
      setQuestions(parsedQuestions.filter((doc) => doc.lastMessage));
    });
    return () => unsubscribe();
  }, []);

  // console.log("unfilteredQuestions", unfilteredQuestions);
  // console.log("questions", questions);

  return (
    <Screen style={styles.screen}>
      <AppText>test</AppText>
      <FlatList
        data={questions}
        keyExtractor={(question) => question.lastMessage._id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.lastMessage.title}
            subTitle={item.lastMessage.description}
            imageUrl={item.lastMessage.image}
            onPress={() =>
              navigation.navigate(routes.LISTING_DETAILS, { item })
            }
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
    flex: 1,
  },
});

export default OpenScheduleScreen;
