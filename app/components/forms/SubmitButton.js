import React from "react";
import AppButton from "../AppButton";
import { useFormikContext } from "formik";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../../config/colors";

function SubmitButton({ title }) {
  const { handleSubmit } = useFormikContext();
  return <AppButton title={title} onPress={handleSubmit}></AppButton>;
}

export function SubmitQuestionButton({ title }) {
  const { handleSubmit } = useFormikContext();
  return (
    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.tint,
    borderRadius: 30,
  },
  buttonText: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default SubmitButton;
