import { Animated, ImageBackground, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import {
  HEADER_HEIGHT_EXPANDED,
  HEADER_HEIGHT_NARROWED,
  PROFILE_BANNER_URI,
} from "../../constants";

const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground);

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export default function Banner({ scrollY }) {
  return (
    <AnimatedImageBackground
      source={{
        uri: PROFILE_BANNER_URI,
      }}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        height: HEADER_HEIGHT_EXPANDED + HEADER_HEIGHT_NARROWED,
        transform: [
          {
            scale: scrollY.interpolate({
              inputRange: [-200, 0],
              outputRange: [3, 1],
              extrapolateLeft: "extend",
              extrapolateRight: "clamp",
            }),
          },
        ],
      }}
    >
      <AnimatedBlurView
        tint="dark"
        intensity={96}
        style={{
          ...StyleSheet.absoluteFillObject,
          zIndex: 2,
          opacity: scrollY.interpolate({
            inputRange: [-50, 0, 50, 100],
            outputRange: [1, 0, 0, 1],
          }),
        }}
      ></AnimatedBlurView>
    </AnimatedImageBackground>
  );
}
