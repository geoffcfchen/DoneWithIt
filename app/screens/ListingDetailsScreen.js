import React from "react";
import {
  Image,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
// import { Image } from "react-native-expo-image-cache";

import AppText from "../components/AppText";
import colors from "../config/colors";
import ListItem from "../components/lists/ListItem";
import ContactSellerForm from "../components/ContactSellerForm";

function ListingDetailsScreen({ route }) {
  const listing = route.params;
  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
    >
      <Image
        style={styles.image}
        // preview={{ uri: listing.images[0].thumbnailUrl }}
        // tint="light"
        // uri={listing.images[0].url}
        source={listing.image}
      ></Image>
      <View style={styles.detailContainer}>
        <AppText style={styles.title}>{listing.title}</AppText>
        <AppText style={styles.description}>{listing.description}</AppText>
        <View style={styles.userContainer}>
          <ListItem
            image={require("../assets/mosh.jpg")}
            title="Thomas Lai (Pet owner)"
          ></ListItem>
        </View>
        <ContactSellerForm listing={listing}></ContactSellerForm>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  detailContainer: { padding: 20 },
  image: {
    width: "100%",
    height: 300,
  },
  description: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 15,
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 0,
  },
});

export default ListingDetailsScreen;
