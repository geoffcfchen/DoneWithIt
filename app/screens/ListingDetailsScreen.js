import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Text,
} from "react-native";
import { Image } from "react-native-expo-image-cache";

import { Fonts, Colors, Sizes } from "../constant/styles";
import AppText from "../components/AppText";
import colors from "../config/colors";
import ListItem from "../components/lists/ListItem";
import Icon from "../components/Icon";
import { useNavigation } from "@react-navigation/native";
import { deleteField, doc, updateDoc } from "firebase/firestore";
import { async } from "@firebase/util";
import { db } from "../../firebase";
import GlobalContext from "../context/Context";

function ListingDetailsScreen({ route }) {
  const { item: listing } = route.params;
  console.log("listing = ", listing);
  const { userData } = useContext(GlobalContext);
  // const userB = listing.participants.find((p) => p.email !== currentUser.email);

  function cancelButton() {
    const navigation = useNavigation();
    const questionRef = doc(db, "questions", listing.id);
    return (
      <TouchableOpacity
        activeOpacity={0.99}
        style={styles.cancelButtonStyle}
        onPress={async () => {
          await updateDoc(questionRef, {
            datetime: deleteField(),
            lastMessage: deleteField(),
            slot: deleteField(),
          })
            // deleteDoc(questionRef)
            .then(() => {
              navigation.goBack();
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        <View style={styles.ButtonStyle}>
          <Text style={{ ...Fonts.white20Regular }}>Cancel schedule</Text>
        </View>
      </TouchableOpacity>
    );
  }

  function rescheduleButton() {
    const navigation = useNavigation();
    const questionRef = doc(db, "questions", listing.id);
    console.log("listing.id", listing.id);
    return (
      <TouchableOpacity
        activeOpacity={0.99}
        style={styles.rescheduleButtonStyle}
        onPress={async () => {
          await updateDoc(questionRef, {
            datetime: deleteField(),
            slot: deleteField(),
          })
            // deleteDoc(questionRef)
            .then(() => {
              navigation.goBack();
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        <View style={styles.ButtonStyle}>
          <Text style={{ ...Fonts.white20Regular }}>Reschedule</Text>
        </View>
      </TouchableOpacity>
    );
  }

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
        {rescheduleButton()}
        {userData.role.label == "doctor" && cancelButton()}

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
  rescheduleButtonStyle: {
    position: "absolute",
    left: Sizes.fixPadding * 2.0,
    right: Sizes.fixPadding * 2.0,
    bottom: Sizes.fixPadding - 37,
  },
  cancelButtonStyle: {
    position: "absolute",
    left: Sizes.fixPadding * 2.0,
    right: Sizes.fixPadding * 2.0,
    bottom: Sizes.fixPadding - 90,
  },
  ButtonStyle: {
    backgroundColor: Colors.primary,
    borderRadius: Sizes.fixPadding + 5.0,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Sizes.fixPadding + 3.0,
  },
});

export default ListingDetailsScreen;
