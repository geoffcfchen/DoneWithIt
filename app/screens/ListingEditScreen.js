import { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import {
  AppForm,
  AppFormField,
  AppFormPicker,
  SubmitButton,
} from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import ContactsPickerItem from "../components/ContactsPickerItem";
import FormImagePicker from "../components/forms/FormImagePicker";
import listingsApi from "../api/listing";
import Screen from "../components/Screen";
import useLocation from "../hooks/useLocation";
import useContacts from "../hooks/useHooks";
import UploadScreen from "./UploadScreen";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  petName: Yup.string().required().min(1).label("PetName"),
  // price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  doctor: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select at least one image."),
});

const categories = [
  {
    backgroundColor: "#fc5c65",
    icon: "pill",
    label: "Refill Pills",
    value: 1,
  },
  {
    backgroundColor: "#fd9644",
    icon: "emoticon-sick-outline",
    label: "Become worse",
    value: 2,
  },
  {
    backgroundColor: "#26de81",
    icon: "medical-bag",
    label: "Medicine questions",
    value: 3,
  },
  {
    backgroundColor: "#2bcbba",
    icon: "food-variant",
    label: "Food questions",
    value: 4,
  },
  {
    backgroundColor: "#45aaf2",
    icon: "dog-side",
    label: "Behavior questions",
    value: 5,
  },
  {
    backgroundColor: "#4b7bec",
    icon: "dog",
    label: "Skin questions",
    value: 6,
  },
  {
    backgroundColor: "#a55eea",
    icon: "head-question",
    label: "Other questions",
    value: 7,
  },
];

function ListingEditScreen(props) {
  const contacts = useContacts();
  // const contacts = [{ contactName: "Kate Bell", email: "kate-bell@mac.com" }];
  const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (listing, { resetForm }) => {
    console.log("listing", listing);
    setProgress(0);
    setUploadVisible(true);
    const result = await listingsApi.addListing(
      { ...listing, location },
      (progress) => setProgress(progress)
    );

    if (!result.ok) {
      setUploadVisible(false);
      return alert("Could not save the listing.");
    }

    resetForm();
  };

  return (
    <Screen style={styles.container}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      ></UploadScreen>
      <AppForm
        initialValues={{
          title: "",
          petName: "",
          description: "",
          category: null,
          doctor: null,
          images: [],
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormImagePicker name="images"></FormImagePicker>
        <AppFormField
          maxLength={255}
          name="title"
          placeholder="Title"
        ></AppFormField>
        <AppFormField
          maxLength={255}
          name="petName"
          placeholder="Pet name"
        ></AppFormField>
        {/* <AppFormField
          keyboardType="numeric"
          maxLength={8}
          name="price"
          placeholder="Pet name"
          width={140}
        ></AppFormField> */}
        <AppFormPicker
          items={categories}
          name="category"
          numberOfColumns={3}
          PickerItemComponent={CategoryPickerItem}
          placeholder="Category"
          width="50%"
        ></AppFormPicker>
        <AppFormPicker
          items={contacts}
          name="doctor"
          numberOfColumns={3}
          PickerItemComponent={ContactsPickerItem}
          placeholder="Doctor"
          width="50%"
        ></AppFormPicker>

        <AppFormField
          multiline
          maxLength={255}
          name="description"
          numberOfLines={3}
          placeholder="Description"
        ></AppFormField>
        <SubmitButton title="Post" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
export default ListingEditScreen;
