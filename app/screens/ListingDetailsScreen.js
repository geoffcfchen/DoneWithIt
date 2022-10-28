import React from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { Image } from "react-native-expo-image-cache";

import AppText from "../components/AppText";
import colors from "../config/colors";
import ListItem from "../components/lists/ListItem";
import Icon from "../components/Icon";

function ListingDetailsScreen({ route }) {
  const { item: listing } = route.params;
  // console.log("listing = ", listing);
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
            IconComponent={<Icon name="paw" backgroundColor="green"></Icon>}
            title={listing.lastMessage.petName}
          ></ListItem>
        </View>
        <View style={styles.userContainer}>
          <ListItem
            IconComponent={
              <Icon
                name={listing.lastMessage.category.icon}
                backgroundColor={listing.lastMessage.category.backgroundColor}
              ></Icon>
            }
            title={listing.lastMessage.category.label}
          ></ListItem>
        </View>
        <View style={styles.userBContainer}>
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
  userBContainer: {
    marginVertical: 6,
  },
  userContainer: {
    marginVertical: 5,
  },
});

export default ListingDetailsScreen;
