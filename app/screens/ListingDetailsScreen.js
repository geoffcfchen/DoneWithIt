import React from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { Image } from "react-native-expo-image-cache";

import AppText from "../components/AppText";
import colors from "../config/colors";
import ListItem from "../components/lists/ListItem";
import ContactSellerForm from "../components/ContactSellerForm";
import { auth } from "../../firebase";

function ListingDetailsScreen({ route }) {
  const { currentUser } = auth;
  const { item: listing } = route.params;
  console.log(currentUser);
  // console.log(listing);
  // const userB = listing.participants.find((p) => p.email !== currentUser.email);
  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
      style={styles.container}
    >
      <Image
        style={styles.image}
        // preview={{ uri: listing.images[0].thumbnailUrl }}
        tint="light"
        uri={listing.lastMessage.image}
        // source={listing.image} // if from image-cache, there is no source prop
      ></Image>
      <View style={styles.detailContainer}>
        <AppText style={styles.title}>{listing.lastMessage.title}</AppText>
        <AppText style={styles.description}>
          {listing.lastMessage.description}
        </AppText>
        <View style={styles.userContainer}>
          <ListItem
            image={
              listing.userB.photoURL
                ? {
                    uri: listing.userB.photoURL,
                  }
                : require("../assets/icon-square.png")
            }
            title={listing.userB.displayName || listing.userB.email}
            endIcon="phone"
          ></ListItem>
        </View>
        {/* <View style={styles.userContainer}>
          <ListItem
            image={
              currentUser.photoURL
                ? {
                    uri: currentUser.photoURL,
                  }
                : require("../assets/icon-square.png")
            }
            title={currentUser.displayName || currentUser.email}
          ></ListItem>
        </View> */}
        {/* <ContactSellerForm listing={listing}></ContactSellerForm> */}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.light, flex: 1 },
  detailContainer: { padding: 20 },
  image: {
    width: "100%",
    height: 300,
  },
  description: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 15,
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 10,
  },
});

export default ListingDetailsScreen;
