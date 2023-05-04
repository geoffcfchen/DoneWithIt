import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { updateProfile } from "@firebase/auth";
import { doc, setDoc, updateDoc } from "@firebase/firestore";
import * as Yup from "yup";
import { Ionicons } from "@expo/vector-icons";

import AuthContext from "../auth/context";
import ActivityIndicator from "../components/ActivityIndicator";
import AppText from "../components/AppText";
import authApi from "../api/auth";
import {
  AppForm,
  AppFormField,
  AppFormPicker,
  ErrorMessage,
  SubmitButton,
} from "../components/forms";
import Screen, { ScreenScrollView } from "../components/Screen";
import usersApi from "../api/users";
import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";
import logger from "../utility/logger";
import FormProfileImagePicker from "../components/forms/FormProfileImagePicker";
import { signUp, auth, db } from "../../firebase";
import { uploadImage } from "../utility/uploadImage";
import CategoryPickerItem from "../components/CategoryPickerItem";
import { useNavigation } from "@react-navigation/native";

const roles = [
  {
    backgroundColor: "dodgerblue",
    icon: "doctor",
    label: "Doctor",
    value: 1,
  },
  {
    backgroundColor: "#fc5c65",
    icon: "paw",
    label: "Client",
    value: 2,
  },
];

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Name is required"),
  // email: Yup.string().email("Invalid email").required("Email is required"),
  // password: Yup.string().required("Password is required"),
  // passwordConfirmation: Yup.string().oneOf(
  //   [Yup.ref("password"), null],
  //   "Passwords must match"
  // ),
  // price: Yup.number().required().min(1).max(10000).label("Price"),
  image: Yup.array().required("Profile Image is required").min(1),
});

function ProfileScreen() {
  const { user, setUser } = useContext(AuthContext);
  const { error, setError } = useState();
  const navigation = useNavigation();

  const handleSubmitFirebase = async (userInfo) => {
    const userID = user.uid;
    const userRef = doc(db, "customers", userID);

    let photoURL;
    if (userInfo.image.length === 1) {
      const { url } = await uploadImage(
        userInfo.image[0],
        `images/profilePhotos/${user.email + user.uid}`,
        "profilePicture"
      );
      photoURL = url;
    }
    const userData = {
      displayName: userInfo.name,
      role: userInfo.role,
    };
    if (photoURL) {
      userData.photoURL = photoURL;
    }
    try {
      await Promise.all([
        updateProfile(user, userData),
        updateDoc(userRef, { ...userData, uid: user.uid, email: user.email }),
      ]).then(() => {
        setUser(auth.currentUser);
      });
    } catch (error) {
      console.log(error);
    }
    // navigation.reset("DrawerNavigator");
    // navigation.navigate("DrawerNavigator");
    navigation.reset({ routes: [{ name: "DrawerNavigator" }], index: 0 });
  };

  return (
    <>
      {/* <ActivityIndicator
        visible={registerApi.loading || loginApi.loading}
      ></ActivityIndicator> */}
      <ScreenScrollView>
        <Ionicons
          name="arrow-back-sharp"
          size={24}
          color="black"
          style={{ marginLeft: 10 }}
          onPress={() => setUser(null)}
        />
        <AppForm
          initialValues={{
            name: "",
            image: [],
            role: "",
          }}
          onSubmit={handleSubmitFirebase}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={error} visible={error}></ErrorMessage>
          <View style={styles.profileimage}>
            <FormProfileImagePicker name="image"></FormProfileImagePicker>
          </View>
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="account"
            name="name"
            placeholder="Name"
            textContentType="name"
          ></AppFormField>
          <AppFormPicker
            items={roles}
            name="role"
            numberOfColumns={3}
            PickerItemComponent={CategoryPickerItem}
            placeholder="Role"
            width="50%"
          ></AppFormPicker>
          <SubmitButton title="Register"></SubmitButton>
        </AppForm>
      </ScreenScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  profileimage: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileScreen;
