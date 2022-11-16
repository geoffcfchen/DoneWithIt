import react, { useState, useEffect, useContext, useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { nanoid } from "nanoid";
import { AntDesign } from "@expo/vector-icons";

import {
  AppForm,
  AppFormField,
  AppFormPicker,
  SubmitButton,
} from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import ContactsPickerItem from "../components/ContactsPickerItem";
import FormImagePicker from "../components/forms/FormImagePicker";
import Screen from "../components/Screen";
import useLocation from "../hooks/useLocation";
import useContacts from "../hooks/useHooks";
import UploadScreen from "./UploadScreen";
import { auth, db } from "../../firebase";
import GlobalContext from "../context/Context";
import { uploadImage } from "../utility/uploadImage";
import { random } from "nanoid";
import AuthContext from "../auth/context";
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";
import { SubmitQuestionButton } from "../components/forms/SubmitButton";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  petName: Yup.string().required().min(1).label("PetName"),
  // price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().required().min(1).label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  doctor: Yup.object().required().nullable().label("Doctor"),
  images: Yup.array().min(
    1,
    "Please select at least one image (i.g., your pet)."
  ),
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

function ListingEditScreen({ onCloseQuestion }) {
  const randomID = useMemo(() => nanoid(), []);
  const [questionHash] = useState("");
  const [contacts, setContacts] = useState([]);
  const { unfilteredQuestions } = useContext(GlobalContext);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const { user } = useContext(AuthContext);

  const customersRef = collection(db, "customers");

  useEffect(() => {
    const unsubscribe = onSnapshot(customersRef, (querySnapshot) => {
      const customers = querySnapshot.docs
        .map((doc) => {
          const customer = doc.data();
          return {
            ...customer,
          };
        })
        .filter((item) => item.role.label == "Doctor");
      const parsedcustomers = customers.map((item) => {
        return {
          contactName: item.displayName,
          email: item.email,
        };
      });
      // console.log("customers", parsedcustomers);
      setContacts(parsedcustomers);
      // setDatesWhitelist(messagesFirestore);
    });
    return () => unsubscribe();
  }, []);

  // console.log("contacts", contacts);

  const senderUser = user.photoURL
    ? {
        name: user.displayName,
        _id: user.uid,
        avatar: user.photoURL,
      }
    : { name: user.displayName, _id: user.uid };

  const handleSubmit = async (listing, { resetForm }) => {
    // console.log("listing", listing);

    const question = unfilteredQuestions.find((question) =>
      question.participantsArray.includes(listing.doctor.email)
    );
    const questionID = question ? question.id : randomID;
    const questionRef = doc(db, "questions", questionID);
    const questionMessagesRef = collection(
      db,
      "questions",
      questionID,
      "messages"
    );
    const userB = listing.doctor;
    if (!question) {
      const currUserData = {
        displayName: user.displayName,
        email: user.email,
      };
      if (user.photoURL) {
        currUserData.photoURL = user.photoURL;
      }
      const userBData = {
        displayName: userB.contactName || userB.displayName || "",
        email: userB.email,
      };
      if (userB.photoURL) {
        userBData.photoURL = userB.photoURL;
      }
      const questionData = {
        participants: [currUserData, userBData],
        participantsArray: [user.email, userB.email],
      };
      try {
        await setDoc(questionRef, questionData);
      } catch (error) {
        console.log(error);
      }
    }

    const emailHash = `${user.email}:${userB.email}:`;

    sendQuestion(listing, questionMessagesRef, questionRef, emailHash);

    // setProgress(0);
    // setUploadVisible(true);
    // const result = await listingsApi.addListing(
    //   { ...listing, location },
    //   (progress) => setProgress(progress)
    // );

    // if (!result.ok) {
    //   setUploadVisible(false);
    //   return alert("Could not save the listing.");
    // }

    resetForm();
    onCloseQuestion();
  };

  async function sendQuestion(
    listing,
    questionMessagesRef,
    questionRef,
    emailHash,
    roomPath
  ) {
    const uri = listing.images[0];
    // console.log("uri", uri);
    // console.log("emailHash", emailHash);
    const { url, fileName } = await uploadImage(
      uri,
      `images/questions/${roomPath || questionHash}`
    );
    // console.log("url", url);
    // console.log("fileName", fileName);
    const message = {
      _id: fileName,
      image: url,
      title: listing.title,
      petName: listing.petName,
      category: listing.category,
      description: listing.description,
      createdAt: new Date(),
      user: senderUser,
    };
    // console.log("message in sendImage", message);
    const lastMessage = { ...message };
    // console.log("lastMessage", lastMessage);
    await Promise.all([
      addDoc(questionMessagesRef, message),
      updateDoc(questionRef, { lastMessage }),
    ]);
  }

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
        <View style={styles.headerContainer}>
          <AntDesign
            name="close"
            size={30}
            color={colors.tint}
            onPress={onCloseQuestion}
          />
          <SubmitQuestionButton title="Post" />
        </View>
        <FormImagePicker name="images"></FormImagePicker>
        <AppFormField
          maxLength={255}
          name="title"
          placeholder="Title"
        ></AppFormField>
        <AppFormField
          multiline
          maxLength={255}
          name="description"
          numberOfLines={3}
          placeholder="Description"
        ></AppFormField>
        <AppFormField
          maxLength={255}
          name="petName"
          placeholder="Pet name"
        ></AppFormField>
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
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
});
export default ListingEditScreen;
