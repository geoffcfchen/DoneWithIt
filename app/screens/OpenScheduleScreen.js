import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Button, View, SafeAreaView } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import AppText from "../components/AppText";
import colors from "../config/colors";
import Screen from "../components/Screen";
import AuthContext from "../auth/context";
import MutipleDayScreen from "./MutipleDayScreen";
import IndividualDayScreen from "./IndividualDayScreen";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import GlobalContext from "../context/Context";
import { useRoute } from "@react-navigation/native";

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
  const { userData, timeSlots } = useContext(GlobalContext);
  // console.log("timeSlots", timeSlots);
  // const route = useRoute();
  // console.log("route", route.params);
  // const [timeSlots, setTimeSlots] = useState([]);
  // const timeSlotsQuery = query(
  //   collection(db, "timeSlots"),
  //   where("participantsArray", "array-contains", userData.email)
  // );

  // useEffect(() => {
  //   const unsubscribe = onSnapshot(timeSlotsQuery, (querySnapshot) => {
  //     // querySnapshot.docs.map((doc) => console.log("doc", doc.data()));
  //     const parsedTimesSlots = querySnapshot.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }));

  //     // console.log("parsedTimesSlots", parsedTimesSlots);
  //     setTimeSlots(parsedTimesSlots);
  //   });
  //   return () => unsubscribe();
  // }, []);
  // // console.log(timeSlots);

  // const timeSlot = timeSlots.find((timeSlot) =>
  //   timeSlot.participantsArray.includes(userData.email)
  // );
  // console.log("test1");

  return (
    <Tab.Navigator screenOptions={{ headerShown: true }}>
      <Tab.Screen
        name="IndividualDay"
        component={IndividualDayScreen}
      ></Tab.Screen>
      {/* <Tab.Screen name="MutipleDay" component={MutipleDayScreen}></Tab.Screen> */}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default OpenScheduleScreen;
