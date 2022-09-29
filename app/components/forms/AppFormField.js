import React from "react";
import AppText from "../AppText";
import ErrorMessage from "./ErrorMessage";
import { useFormikContext } from "formik";
import AppTextInput from "../AppTextInput";

function AppFormField({ name, ...otherProps }) {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();

  return (
    <>
      <AppTextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        {...otherProps}
      ></AppTextInput>
      <ErrorMessage error={errors[name]} visible={touched[name]}></ErrorMessage>
    </>
  );
}

export default AppFormField;
