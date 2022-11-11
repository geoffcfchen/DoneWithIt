import * as ImagePicker from "expo-image-picker";
export async function takeImage() {
  let result = ImagePicker.launchCameraAsync();
  return result;
}

export async function pickImage() {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 0,
  });
  return result;
}
