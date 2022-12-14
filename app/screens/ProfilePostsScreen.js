import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import generateTweets from "../utility/generateTweets";
import {
  HEADER_HEIGHT_EXPANDED,
  HEADER_HEIGHT_NARROWED,
  PROFILE_PICTURE_URI,
} from "../../constants";
import colors from "../config/colors";

const TWEETS = generateTweets(30);

export default function ProfilePostsScreen() {
  return (
    <View style={styles.container}>
      {TWEETS.map((item, index) => (
        <View key={item.key} style={styles.tweet}>
          <Image
            source={{
              uri: PROFILE_PICTURE_URI,
            }}
            style={{
              height: 50,
              width: 50,
              borderRadius: 25,
              marginRight: 10,
            }}
          />

          <View style={styles.container}>
            <Text
              style={[
                styles.text,
                {
                  fontWeight: "bold",
                  fontSize: 15,
                },
              ]}
            >
              {item.author}{" "}
              <Text
                style={{
                  color: "gray",
                  fontWeight: "normal",
                }}
              >
                @{item.tag} · {index + 1}d
              </Text>
            </Text>

            <Text style={[styles.text, { fontSize: 15 }]}>{item.text}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: colors.black,
  },
});
