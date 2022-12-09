import { TouchableWithoutFeedback, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function BackButton() {
  const insets = useSafeAreaInsets();

  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
      <View
        style={{
          zIndex: 3,
          position: "absolute",
          top: insets.top + 10,
          left: 20,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          height: 30,
          width: 30,
          borderRadius: 15,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Feather name="chevron-left" color="white" size={26} />
      </View>
    </TouchableWithoutFeedback>
  );
}
