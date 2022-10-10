import React from "react";
import { useFormikContext } from "formik";

import ImageInputList from "../ImageInputList";
import ImageInputProfile from "../ImageInputProfile";
import ErrorMessage from "./ErrorMessage";

function FormProfileImagePicker({ name }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const imageUris = values[name];

  const handleAdd = (uri) => {
    setFieldValue(name, [uri]);
  };
  const handleRemove = (uri) => {
    setFieldValue(
      name,
      imageUris.filter((imageUri) => imageUri !== uri)
    );
  };

  return (
    <>
      <ImageInputProfile
        imageUris={imageUris}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
      ></ImageInputProfile>
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default FormProfileImagePicker;
