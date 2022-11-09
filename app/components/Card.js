import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Text } from "react-native";

import { Image } from "react-native-expo-image-cache";
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { Fonts, Colors, Sizes } from "../constant/styles";

import colors from "../config/colors";
import AppText from "./AppText";
import moment from "moment";

function Card({
  title,
  subTitle,
  imageUrl,
  image,
  onPress,
  thumbnailUrl,
  datetime,
  slot,
}) {
  // console.log("datetime", datetime);
  // console.log("slot", slot);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image
          style={styles.image}
          // source={image} // if from image-cache, there is no source prop
          // tint="light"
          preview={{ uri: thumbnailUrl }}
          uri={imageUrl}
        ></Image>
        <View style={styles.dateAndTimeContainerStyle}>
          <View
            style={{
              flexDirection: "row",
              marginLeft: 10,
              marginTop: 10,
            }}
          >
            <FontAwesome5 name="calendar-alt" size={16} color="gray" />
            {datetime && (
              <Text
                style={{
                  ...Fonts.black16Regular,
                  marginLeft: Sizes.fixPadding + 2,
                }}
              >
                {moment(datetime.toDate()).format("dddd, MMM Do YYYY")}
              </Text>
            )}
            {!datetime && (
              <Text
                style={{
                  ...Fonts.black16Regular,
                  marginLeft: Sizes.fixPadding + 2,
                }}
              >
                not yet!
              </Text>
            )}
          </View>
          <View style={{ flexDirection: "row", marginLeft: 8 }}>
            <MaterialIcons name="access-time" size={18} color="gray" />
            <Text
              style={{ ...Fonts.black16Regular, marginLeft: Sizes.fixPadding }}
            >
              {slot}
            </Text>
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <AppText style={styles.title} numberOfLines={1}>
            {title}
          </AppText>
          <AppText style={styles.subTitle} numberOfLines={2}>
            {subTitle}
          </AppText>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default Card;

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontSize: 17,
    marginBottom: 7,
    fontWeight: "500",
  },
  subTitle: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 14,
  },
});
