import React, { useState, useEffect } from "react";
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

const listings = [
  {
    id: 1,
    title: "Skin discharge or oozing?",
    description:
      "Clear, sticky, wound-like spots on your dogs skin would describe something colloquially called a “hot spot”, or acute moist dermatitis. Hot Spots develop from a bacterial or fungal skin infection that occurs from damage to the skin. The discharge is often clear and sticky. The skin damage is caused by your dog themselves: licking, chewing, scratching or gnawing.",
    image: require("../assets/dog-head.jpeg"),
  },
  {
    id: 2,
    title: "Skin Ulcers and Draining Lesions?",
    description:
      "With skin ulcers and draining lesions, the first sign of a problem may be a crusty area on the skin, nose or foot. In other cases, skin problems may start out small and progress into more extensive lesions. They may open, drain and then develop a crusty surface. In some instances, there may be hair loss and the surface of the skin can become red and oozing, and ulcers may develop. Skin ulceration and draining lesions can be caused by a variety of underlying problems. Certain conditions are more common in specific populations of dogs or in some geographic locations.",
    image: require("../assets/dog-leg.jpeg"),
  },
  {
    id: 3,
    title: "Itchy-scratchy?",
    description:
      "Dogs with dry skin can be suffering for a number of reasons, including parasites and allergies. Itchy skin is not only unpleasant for your dog but can result in skin problems over time. If your dog is scratching more than normal, they may have dry skin and a possible health condition that contributes to it. ",
    image: require("../assets/dog-itch.jpeg"),
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

function ListingsScreen({ navigation }) {
  return (
    <Screen style={styles.screen}>
      <FlatList
        data={listings}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subTitle={item.description}
            image={item.image}
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
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

export default ListingsScreen;
