import * as ImagePicker from "expo-image-picker";

export async function askForPermission() {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  return status;
}
