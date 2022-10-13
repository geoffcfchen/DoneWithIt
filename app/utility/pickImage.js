import * as ImagePicker from "expo-image-picker";
export async function pickImage() {
  let result = ImagePicker.launchCameraAsync();
  return result;
}
