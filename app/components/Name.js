import { Animated, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Name({ scrollY }) {
  const insets = useSafeAreaInsets();

  return (
    <Animated.View
      style={{
        zIndex: 2,
        position: "absolute",
        top: insets.top + 6,
        left: 0,
        right: 0,
        alignItems: "center",
        opacity: scrollY.interpolate({
          inputRange: [90, 110],
          outputRange: [0, 1],
        }),
        transform: [
          {
            translateY: scrollY.interpolate({
              inputRange: [90, 120],
              outputRange: [30, 0],
              extrapolate: "clamp",
            }),
          },
        ],
      }}
    >
      <Text style={[styles.text, styles.username]}>Arnaud</Text>

      <Text style={[styles.text, styles.tweetsCount]}>379 tweets</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: -3,
  },
  tweetsCount: {
    fontSize: 13,
  },
});
