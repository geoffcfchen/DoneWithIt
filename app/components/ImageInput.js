import React, { useEffect } from "react";
import {
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  View,
  Text,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Screen from "./Screen";
import colors from "../config/colors";

function ImageInput({ imageUri, onChangeImage }) {
  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) alert("You need to enable permission to access the libary.");
  };

  const handlePress = () => {
    if (!imageUri) selectImage();
    else
      Alert.alert("Delete", "Are you sure you want to delete this image?", [
        { text: "Yes", onPress: () => onChangeImage(null) },
        { text: "No" },
      ]);
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.cancelled) onChangeImage(result.uri);
    } catch (error) {
      console.log("Error reading an image", error);
    }
  };

  return (
    <Screen>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.container}>
          {!imageUri && (
            <MaterialCommunityIcons
              name="camera"
              size={40}
              color={colors.medium}
            />
          )}
          {imageUri && (
            <Image source={{ uri: imageUri }} style={styles.image}></Image>
          )}
        </View>
      </TouchableWithoutFeedback>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    backgroundColor: colors.light,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
  },
});

export default ImageInput;
