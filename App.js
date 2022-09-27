import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  SafeAreaView,
  Button,
  Platform,
  StatusBar,
} from "react-native";
import {
  useDimensions,
  useDeviceOrientation,
} from "@react-native-community/hooks";

export default function App() {
  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <View
        style={{
          backgroundColor: "dodgerblue",
          flex: 2,
        }}
      ></View>
      <View
        style={{
          backgroundColor: "gold",
          flex: 1,
        }}
      ></View>
      <View
        style={{
          backgroundColor: "tomato",
          flex: 1,
        }}
      ></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
