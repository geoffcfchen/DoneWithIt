import React, { useState, useContext } from "react";
import { StyleSheet, Button, View, SafeAreaView } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

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

function OpenScheduleScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
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
  //     // console.log("parsedQuestions", parsedQuestions);
  //     setUnfilteredQuestions(parsedQuestions);
  //     setQuestions(parsedQuestions.filter((doc) => doc.lastMessage));
  //   });
  //   return () => unsubscribe();
  // }, []);

  // console.log("unfilteredQuestions", unfilteredQuestions);
  // console.log("questions", questions);

  return (
    <SafeAreaView>
      <Button title="Show Date Picker" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </SafeAreaView>
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
