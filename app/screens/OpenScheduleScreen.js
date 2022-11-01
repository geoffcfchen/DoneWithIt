import React, { useState, useContext } from "react";
import { StyleSheet, Button, View, SafeAreaView } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import AppText from "../components/AppText";
import colors from "../config/colors";
import Screen from "../components/Screen";
import AuthContext from "../auth/context";
import MutipleDayScreen from "./MutipleDayScreen";
import IndividualDayScreen from "./IndividualDayScreen";

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

const Tab = createMaterialTopTabNavigator();

function OpenScheduleScreen({ navigation }) {
  // console.log("startDatetime", startDatetime);
  // console.log("endDatetime", endDatetime);
  // const questionsQuery = query(
  //   collection(db, "questions"),
  //   where("participantsArray", "array-contains", user.email)
  // );

  // useEffect(() => {
  //   const unsubscribe = onSnapshot(questionsQuery, (querySnapshot) => {
  //     // querySnapshot.docs.map((doc) => console.log("doc", doc.data()));
  //     const parsedQuestions = querySnapshot.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //       userB: doc.data().participants.find((p) => p.email !== user.email),
  //     }));
  //     // .sort(
  //     //   (a, b) =>
  //     //     b.lastMessage.createdAt.toDate().getTime() -
  //     //     a.lastMessage.createdAt.toDate().getTime()
  //     // );
  //     // console.log("parsedQuestions", parsedQuestions);
  //     setUnfilteredQuestions(parsedQuestions);
  //     setQuestions(parsedQuestions.filter((doc) => doc.lastMessage));
  //   });
  //   return () => unsubscribe();
  // }, []);

  // console.log("unfilteredQuestions", unfilteredQuestions);
  // console.log("questions", questions);

  return (
    <Screen>
      <Tab.Navigator>
        <Tab.Screen
          name="IndividualDay"
          component={IndividualDayScreen}
        ></Tab.Screen>
        <Tab.Screen name="MutipleDay" component={MutipleDayScreen}></Tab.Screen>
      </Tab.Navigator>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default OpenScheduleScreen;
