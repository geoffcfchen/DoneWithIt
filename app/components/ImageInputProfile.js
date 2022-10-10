import React, { useRef } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import AppText from "./AppText";
import ImageInput from "./ImageInput";

function ImageInputProfile({ imageUris = [], onRemoveImage, onAddImage }) {
  return (
    <View>
      <View style={styles.container}>
        {imageUris.map((uri) => (
          <View key={uri} style={styles.image}>
            <ImageInput
              imageUri={uri}
              onChangeImage={() => onRemoveImage(uri)}
            />
          </View>
        ))}
        {imageUris.length === 0 ? (
          <ImageInput onChangeImage={(uri) => onAddImage(uri)} />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  image: {
    marginRight: 10,
  },
});

export default ImageInputProfile;
