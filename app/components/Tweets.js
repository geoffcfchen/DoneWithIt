import { Animated, Image, Text, StyleSheet, View } from "react-native";

import {
  HEADER_HEIGHT_EXPANDED,
  HEADER_HEIGHT_NARROWED,
  PROFILE_PICTURE_URI,
} from "../../constants";
import generateTweets from "../utility/generateTweets";

const TWEETS = generateTweets(30);

export default function Tweets({ scrollY }) {
  return (
    <Animated.ScrollView
      showsVerticalScrollIndicator={false}
      onScroll={Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: { y: scrollY },
            },
          },
        ],
        { useNativeDriver: true }
      )}
      style={{
        zIndex: 3,
        marginTop: HEADER_HEIGHT_NARROWED,
        paddingTop: HEADER_HEIGHT_EXPANDED,
      }}
    >
      <View style={[styles.container, { backgroundColor: "black" }]}>
        <View
          style={[
            styles.container,
            {
              paddingHorizontal: 20,
            },
          ]}
        >
          <Animated.Image
            source={{
              uri: PROFILE_PICTURE_URI,
            }}
            style={{
              width: 75,
              height: 75,
              borderRadius: 40,
              borderWidth: 4,
              borderColor: "black",
              marginTop: -30,
              transform: [
                {
                  scale: scrollY.interpolate({
                    inputRange: [0, HEADER_HEIGHT_EXPANDED],
                    outputRange: [1, 0.6],
                    extrapolate: "clamp",
                  }),
                },
                {
                  translateY: scrollY.interpolate({
                    inputRange: [0, HEADER_HEIGHT_EXPANDED],
                    outputRange: [0, 16],
                    extrapolate: "clamp",
                  }),
                },
              ],
            }}
          />

          <Text
            style={[
              styles.text,
              {
                fontSize: 24,
                fontWeight: "bold",
                marginTop: 10,
              },
            ]}
          >
            Arnaud
          </Text>

          <Text
            style={[
              styles.text,
              {
                fontSize: 15,
                color: "gray",
                marginBottom: 15,
              },
            ]}
          >
            @eveningkid
          </Text>

          <Text style={[styles.text, { marginBottom: 15, fontSize: 15 }]}>
            Same @ on every social media
          </Text>

          {/* Profile stats */}
          <View
            style={{
              flexDirection: "row",
              marginBottom: 15,
            }}
          >
            <Text
              style={[
                styles.text,
                {
                  fontWeight: "bold",
                  marginRight: 10,
                },
              ]}
            >
              70{" "}
              <Text
                style={{
                  color: "gray",
                  fontWeight: "normal",
                }}
              >
                Following
              </Text>
            </Text>

            <Text style={[styles.text, { fontWeight: "bold" }]}>
              106{" "}
              <Text
                style={{
                  color: "gray",
                  fontWeight: "normal",
                }}
              >
                Followers
              </Text>
            </Text>
          </View>
        </View>

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
      </View>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: "white",
  },
  tweet: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(255, 255, 255, 0.25)",
  },
});
