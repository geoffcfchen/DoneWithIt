import React from "react";
import { Image, View, StyleSheet } from "react-native";
import AppText from "../components/AppText";
import colors from "../config/colors";
import ListItem from "../components/lists/ListItem";

function ListingDetailsScreen(props) {
  return (
    <View>
      <Image
        style={styles.image}
        source={require("../assets//jacket.jpg")}
      ></Image>
      <View style={styles.detailContainer}>
        <AppText style={styles.title}>Read Jacket for sale</AppText>
        <AppText style={styles.price}>$100</AppText>
        <View style={styles.userContainer}>
          <ListItem
            image={require("../assets/mosh.jpg")}
            title="Mosh"
            subTitle="5 Listings"
          ></ListItem>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailContainer: { padding: 20 },
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 40,
  },
});

export default ListingDetailsScreen;
