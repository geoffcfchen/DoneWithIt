import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { updateProfile } from "@firebase/auth";
import { doc, setDoc } from "@firebase/firestore";

import AuthContext from "../auth/context";
import ActivityIndicator from "../components/ActivityIndicator";
import AppText from "../components/AppText";
import authApi from "../api/auth";
import {
  AppForm,
  AppFormField,
  ErrorMessage,
  SubmitButton,
} from "../components/forms";
import Screen from "../components/Screen";
import usersApi from "../api/users";
import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";
import logger from "../utility/logger";
import FormProfileImagePicker from "../components/forms/FormProfileImagePicker";
import { signUp, auth, db } from "../../firebase";
import { uploadImage } from "../utility/uploadImage";

function RegisterScreen(props) {
  const { user, setUser } = useContext(AuthContext);
  const registerApi = useApi(usersApi.register);
  const loginApi = useApi(authApi.login);

  // const auth = useAuth();
  const [error, setError] = useState();

  const handleSubmit = async (userInfo) => {
    const result = await registerApi.request(userInfo);

    if (!result.ok) {
      if (result.data) setError(result.data.error);
      else {
        setError("An unexpected error occurred.");
        logger.log(result);
      }
      return;
    }

    const { data: authToken } = await loginApi.request(
      userInfo.email,
      userInfo.password
    );
    auth.logIn(authToken);
  };

  const handleSubmitFirebase = async (userInfo) => {
    console.log("userInfo", userInfo);
    await signUp(userInfo.email, userInfo.password);
    const user = auth.currentUser;
    console.log("auth.currentUser", user);
    let photoURL;
    if (userInfo.image.length === 1) {
      const { url } = await uploadImage(
        userInfo.image[0],
        `images/${user.uid}`,
        "profilePicture"
      );
      photoURL = url;
    }
    const userData = {
      displayName: userInfo.name,
      email: userInfo.email,
    };
    if (photoURL) {
      userData.photoURL = photoURL;
    }
    await Promise.all([
      updateProfile(user, userData),
      setDoc(doc(db, "customers", user.uid), { ...userData, uid: user.uid }),
    ]);
    console.log("updated user", user);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <ActivityIndicator
        visible={registerApi.loading || loginApi.loading}
      ></ActivityIndicator>
      <Screen>
        <AppForm
          initialValues={{ name: "", email: "", password: "", image: [] }}
          onSubmit={handleSubmitFirebase}
        >
          <ErrorMessage error={error} visible={error}></ErrorMessage>
          <View style={styles.profileimage}>
            <FormProfileImagePicker name="image"></FormProfileImagePicker>
          </View>
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="account"
            keyboardType="email-address"
            name="name"
            placeholder="Name"
            textContentType="name"
          ></AppFormField>
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          ></AppFormField>
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            textContentType="password"
            secureTextEntry
          ></AppFormField>
          <SubmitButton title="Register"></SubmitButton>
        </AppForm>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  profileimage: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RegisterScreen;
