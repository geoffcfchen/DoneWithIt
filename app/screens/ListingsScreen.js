import React, { useState, useEffect, useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import colors from "../config/colors";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase";
import GlobalContext from "../context/Context";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ListingsActiveScreen from "./ListingsActiveScreen";
import ListingsFilterScreen from "./ListingsFilterScreen";
import NewQuestionButton from "../components/NewQuestionButton";
import ListingsSubmitScreen from "./ListingsSubmitScreen";

const Tab = createMaterialTopTabNavigator();

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

function ListingsScreen() {
  const { userData } = useContext(GlobalContext);
  const { setUnfilteredQuestions } = useContext(GlobalContext);

  const questionsQuery = query(
    collection(db, "questions"),
    where("participantsArray", "array-contains", userData.email)
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(questionsQuery, (querySnapshot) => {
      const parsedQuestions = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        userB: doc.data().participants.find((p) => p.email !== userData.email),
      }));
      setUnfilteredQuestions(parsedQuestions);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: true }}
      initialRouteName="Submit"
    >
      <Tab.Screen
        name="Submit"
        component={ListingsSubmitScreen}
        // children={() => (
        //   <ListingsSubmitScreen questions={unscheduledQuestions} />
        // )}
      ></Tab.Screen>
      <Tab.Screen
        name="Active"
        component={ListingsActiveScreen}
        // children={() => <ListingsActiveScreen questions={activeQuestions} />}
      ></Tab.Screen>
      <Tab.Screen
        name="Past"
        component={ListingsFilterScreen}
        // children={() => <ListingsFilterScreen questions={pastQuestions} />}
      ></Tab.Screen>
    </Tab.Navigator>
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

export default ListingsScreen;
