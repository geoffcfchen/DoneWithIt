import React from "react";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import Screen from "../components/Screen";
import { FontAwesome5 } from "@expo/vector-icons";

function RegisterScreen(props) {
  return (
    <Screen>
      <AppForm
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
      >
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="account"
          keyboardType="email-address"
          name="username"
          placeholder="Name"
          textContentType="username"
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
        <SubmitButton title="Login"></SubmitButton>
      </AppForm>
    </Screen>
  );
}

export default RegisterScreen;
