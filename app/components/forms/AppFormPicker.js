import React from "react";
import AppPicker from "../AppPicker";
import { ErrorMessage, useFormikContext } from "formik";

function AppFormPicker({ items, name, placeholder }) {
  const { setFieldValue, errors, touched, values } = useFormikContext();
  return (
    <>
      <AppPicker
        items={items}
        onSelectItem={(item) => setFieldValue(name, item)}
        placeholder={placeholder}
        selectedItem={values[name]}
      ></AppPicker>
      <ErrorMessage error={errors[name]} visible={touched[name]}></ErrorMessage>
    </>
  );
}

export default AppFormPicker;
