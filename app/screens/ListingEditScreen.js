import React from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import AppPicker from "../components/AppPicker";

import {
  AppForm,
  AppFormField,
  AppFormPicker,
  SubmitButton,
} from "../components/forms";
import Screen from "../components/Screen";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
});

const categories = [
  { label: "Furniture", value: 1 },
  { label: "Clothing", value: 2 },
  { label: "Camera", value: 3 },
];

function ListingEditScreen(props) {
  return (
    <Screen>
      <AppForm
        initialValues={{
          title: "",
          price: "",
          description: "",
          category: null,
        }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        <AppFormField
          maxLenght={255}
          name="title"
          placeholder="Title"
        ></AppFormField>
        <AppFormField
          keyboardType="numeric"
          maxLenght={8}
          name="title"
          placeholder="Price"
        ></AppFormField>
        <AppPicker
          items={categories}
          name="category"
          placeholder="Category"
        ></AppPicker>
        <AppFormField
          multiline
          maxLenght={255}
          name="description"
          numberOfLines={3}
          placeholder="Description"
        ></AppFormField>
      </AppForm>
    </Screen>
  );
}

export default ListingEditScreen;
