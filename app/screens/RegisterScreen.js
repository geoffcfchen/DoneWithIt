import React, { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";
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
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  // price: Yup.number().required().min(1).max(10000).label("Price"),
});

function RegisterScreen({ navigation }) {
  const { setUser } = useContext(AuthContext);
  // const registerApi = useApi(usersApi.register);
  // const loginApi = useApi(authApi.login);

  // const auth = useAuth();
  const { error, setError } = useState();

  // const handleSubmit = async (userInfo) => {
  //   const result = await registerApi.request(userInfo);

  //   if (!result.ok) {
  //     if (result.data) setError(result.data.error);
  //     else {
  //       setError("An unexpected error occurred.");
  //       logger.log(result);
  //     }
  //     return;
  //   }

  //   const { data: authToken } = await loginApi.request(
  //     userInfo.email,
  //     userInfo.password
  //   );
  //   auth.logIn(authToken);
  // };

  const handleSubmitFirebase = async (userInfo) => {
    await signUp(userInfo.email, userInfo.password);
    // console.log(auth.currentUser);
    setUser(auth.currentUser);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // console.log(authUser);
        setUser(authUser);
      }
    });
    return unsubscribe;
  }, []);

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
          onPress={() => navigation.goBack()}
        />
        <AppForm
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={handleSubmitFirebase}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={error} visible={error}></ErrorMessage>
          <Image
            style={styles.logo}
            source={require("../assets/icon.png")}
          ></Image>

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
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="passwordConfirmation"
            placeholder="Comfirm Password"
            textContentType="password"
            secureTextEntry
          ></AppFormField>
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
  logo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});

export default RegisterScreen;
