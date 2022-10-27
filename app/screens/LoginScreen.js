import React, { useState, useEffect } from "react";
import { StyleSheet, Image } from "react-native";
import * as Yup from "yup";
import AuthContext from "../auth/context";
import { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";

import { ScreenScrollView } from "../components/Screen";
import {
  ErrorMessage,
  AppForm,
  AppFormField,
  SubmitButton,
} from "../components/forms";
// import authApi from "../api/auth";
// import useAuth from "../auth/useAuth";
import { auth } from "../../firebase";
import { signUp, signIn } from "../../firebase";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

function LoginScreen({ navigation }) {
  const { user, setUser } = useContext(AuthContext);
  // const auth = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    await signIn(email, password);
    // const result = await authApi.login(email, password);
    // console.log(result);
    // if (!result.ok) return setLoginFailed(true);
    // setLoginFailed(false);
    // auth.logIn(result.data);
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
    <ScreenScrollView style={styles.container}>
      <Ionicons
        name="arrow-back-sharp"
        size={24}
        color="black"
        style={{ marginLeft: 10 }}
        onPress={() => navigation.goBack()}
      />
      <Image style={styles.logo} source={require("../assets/icon.png")}></Image>
      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage
          error="Invalid email and/or password."
          visible={loginFailed}
        ></ErrorMessage>
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
        <SubmitButton title="Login"></SubmitButton>
      </AppForm>
    </ScreenScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
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

export default LoginScreen;
