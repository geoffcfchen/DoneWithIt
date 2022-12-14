import React, { useState, useContext } from "react";
import { StyleSheet, Button, View, SafeAreaView } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import AppText from "../components/AppText";
import colors from "../config/colors";
import Screen from "../components/Screen";
import AuthContext from "../auth/context";

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

const Tab = createMaterialTopTabNavigator;

function MutipleDayScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [startDatetime, setStartDatetime] = useState([]);
  const [endDatetime, setEndDatetime] = useState([]);
  const [isStartDatePickerVisible, setIsStartDatePickerVisibility] =
    useState(false);
  const [isEndDatePickerVisible, setIsEndDatePickerVisibility] =
    useState(false);

  const showStartDatePicker = () => {
    setIsStartDatePickerVisibility(true);
  };
  const showEndDatePicker = () => {
    setIsEndDatePickerVisibility(true);
  };

  const hideStartDatePicker = () => {
    setIsStartDatePickerVisibility(false);
  };

  const hideEndDatePicker = () => {
    setIsEndDatePickerVisibility(false);
  };

  const handleConfirmStart = (startDatetime) => {
    setStartDatetime(startDatetime);
    hideStartDatePicker();
  };

  const handleConfirmEnd = (endDatetime) => {
    setEndDatetime(endDatetime);
    hideEndDatePicker();
  };

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
  //     setUnfilteredQuestions(parsedQuestions);
  //     setQuestions(parsedQuestions.filter((doc) => doc.lastMessage));
  //   });
  //   return () => unsubscribe();
  // }, []);

  return (
    <Screen style={styles.container}>
      {/* <View style={styles.container}>
        <Button title="Start Datetime" onPress={showStartDatePicker} />
        <DateTimePickerModal
          display="inline"
          isVisible={isStartDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirmStart}
          onCancel={hideStartDatePicker}
        />
        <Button title="End Datetime" onPress={showEndDatePicker} />
        <DateTimePickerModal
          display="inline"
          isVisible={isEndDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirmEnd}
          onCancel={hideEndDatePicker}
        />
      </View> */}
      <AppText>Stay tuned!</AppText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MutipleDayScreen;
