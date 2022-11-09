import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Fonts, Colors, Sizes } from "../constant/styles";
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import moment from "moment";
import {
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import GlobalContext from "../context/Context";
import Screen from "../components/Screen";

const { width } = Dimensions.get("screen");

const patientLit = [
  {
    id: "1",
    name: "Allison Perry",
    image: require("../assets/user/user_3.jpg"),
  },
  {
    id: "2",
    name: "John Smith",
    image: null,
  },
];

const ConsultationScreen = ({ navigation, route }) => {
  const { unfilteredQuestions, userData } = useContext(GlobalContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [questionReference, setQuestionReference] = useState([]);

  // const image = route.params.image;
  // const name = route.params.name;
  // const experience = route.params.experience;
  // const type = route.params.type;
  // console.log("item", route.params.item);
  const doctorData = route.params.item.user;
  const datetime = route.params.item.datetime;
  const slot = route.params.item.slot;
  let participants;
  if (userData.role.label == "Client") {
    participants = [userData];
  } else {
    participants = route.params.item.participantsArray;
  }
  const timeSlotID = route.params.timeSlotID;
  const messageID = route.params.item.id;

  useEffect(() => {
    async function checkifquestionexist() {
      const question = unfilteredQuestions.find(
        (question) =>
          question.participantsArray.includes(userData.email) &&
          question.participantsArray.includes(doctorData.email)
      );

      // console.log(question);
      const questionID = question ? question.id : randomID;
      const questionRef = doc(db, "questions", questionID);
      // const questionMessagesRef = collection(
      //   db,
      //   "questions",
      //   questionID,
      //   "messages"
      // );
      setQuestionReference(questionRef);
      if (!question) {
        const currUserData = {
          displayName: userData.displayName,
          email: userData.email,
        };
        if (userData.photoURL) {
          currUserData.photoURL = userData.photoURL;
        }
        const userBData = {
          displayName: doctorData.contactName || doctorData.displayName || "",
          email: doctorData.email,
        };
        if (doctorData.photoURL) {
          userBData.photoURL = doctorData.photoURL;
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
    }
    checkifquestionexist();
  }, []);

  return (
    <Screen style={{ flex: 1, backgroundColor: "white" }}>
      {header()}
      {doctorInfo()}
      {divider()}
      {dateAndTime()}
      {divider()}
      {appintmentText()}
      {patients()}
      {/* {addPatient()} */}
      {userData.role.label == "Doctor" && deleteButton()}
      {userData.role.label == "Client" && bookButton()}
    </Screen>
  );

  function doctorInfo() {
    return (
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: Sizes.fixPadding * 2.0,
        }}
      >
        <View style={styles.doctorImageContainerStyle}>
          <Image
            source={{ uri: doctorData.photoURL }}
            resizeMode="contain"
            style={{
              height: 90.0,
              width: 90.0,
              borderRadius: 45.0,
              overflow: "hidden",
            }}
          />
        </View>
        <View style={{ justifyContent: "center", marginTop: Sizes.fixPadding }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: width - 140.0,
            }}
          >
            <View style={{ width: width / 3.0 }}>
              <Text style={{ ...Fonts.black16Bold }}>
                {doctorData.displayName}
              </Text>
            </View>
            {/* <TouchableOpacity
              activeOpacity={0.99}
              onPress={() =>
                navigation.navigate("DoctorProfile", {
                  image,
                  name,
                  type,
                  rating,
                  experience,
                })
              }
            >
              <Text style={{ ...Fonts.primaryColor13Bold }}>View Profile</Text>
            </TouchableOpacity> */}
          </View>
          {/* <Text
            style={{
              ...Fonts.gray17Regular,
              marginTop: Sizes.fixPadding - 7.0,
            }}
          >
            {type}
          </Text> */}
          {/* <Text
            style={{
              ...Fonts.primaryColor16Regular,
              marginTop: Sizes.fixPadding - 7.0,
            }}
          >
            {experience} Years Experience
          </Text> */}
          {/* <Text
            style={{ ...Fonts.black20Bold, marginTop: Sizes.fixPadding - 2.0 }}
          >
            $39
          </Text> */}
        </View>
      </View>
    );
  }

  function divider() {
    return (
      <View style={{ backgroundColor: Colors.lightGray, height: 0.7 }}></View>
    );
  }

  function dateAndTime() {
    return (
      <View style={styles.dateAndTimeContainerStyle}>
        <View
          style={{
            flexDirection: "row",
            marginLeft: 10,
          }}
        >
          <FontAwesome5 name="calendar-alt" size={16} color="gray" />
          <Text
            style={{
              ...Fonts.black16Regular,
              marginLeft: Sizes.fixPadding + 2,
            }}
          >
            {moment(datetime).format("dddd, MMM Do YYYY")}
          </Text>
        </View>
        <View style={{ flexDirection: "row", marginLeft: 8 }}>
          <MaterialIcons name="access-time" size={18} color="gray" />
          <Text
            style={{ ...Fonts.black16Regular, marginLeft: Sizes.fixPadding }}
          >
            {slot}
          </Text>
        </View>
      </View>
    );
  }

  function appintmentText() {
    return (
      <Text style={{ ...Fonts.black24Bold, margin: Sizes.fixPadding * 2.0 }}>
        Appointment for?
      </Text>
    );
  }

  function patients() {
    const renderItem = ({ item }) => {
      return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.patientImageContainer}>
            <Image
              source={
                item.photoURL
                  ? {
                      uri: item.photoURL,
                    }
                  : require("../assets/icon-square.png")
              }
              resizeMode="contain"
              style={{ height: 80.0, width: 80.0, borderRadius: 40.0 }}
            />
          </View>
          <Text
            style={{
              ...Fonts.black16Bold,
              marginLeft: Sizes.fixPadding,
              marginBottom: Sizes.fixPadding,
            }}
          >
            {item.displayName}
          </Text>
        </View>
      );
    };

    return (
      <View>
        <FlatList
          data={participants}
          keyExtractor={(item, index) => index}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding * 2.0 }}
        />
      </View>
    );
  }

  function deleteButton() {
    const navigation = useNavigation();
    const docRef = doc(db, "timeSlots", timeSlotID, "messages", messageID);
    return (
      <TouchableOpacity
        activeOpacity={0.99}
        style={styles.confirmAndPayButtonStyle}
        onPress={() => {
          deleteDoc(docRef)
            .then(() => {
              navigation.goBack();
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        <View style={styles.confirmButtonStyle}>
          <Text style={{ ...Fonts.white20Regular }}>Cancel schedule</Text>
        </View>
      </TouchableOpacity>
    );
  }

  function bookButton() {
    const navigation = useNavigation();
    const docRef = doc(db, "timeSlots", timeSlotID, "messages", messageID);
    // console.log("slot", slot);
    const handelBookButton = () => {
      updateDoc(docRef, {
        participantsArray: arrayUnion({
          displayName: userData.displayName,
          email: userData.email,
          photoURL: userData.photoURL,
        }),
      })
        .then(() => {
          navigation.navigate("Questions", { screen: "Listings" });
          // setModalVisible(false);
          // console.log("test");
        })
        .catch((error) => {
          console.log(error);
        });
      try {
        updateDoc(questionReference, {
          datetime: datetime.toDate(),
          slot: slot,
        });
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <TouchableOpacity
        activeOpacity={0.99}
        style={styles.confirmAndPayButtonStyle}
        onPress={handelBookButton}
      >
        <View style={styles.confirmButtonStyle}>
          <Text style={{ ...Fonts.white20Regular }}>Book schedule</Text>
        </View>
      </TouchableOpacity>
    );
  }

  function addPatient() {
    return (
      <View style={styles.addPatientContainerStyle}>
        <MaterialIcons name="add" size={24} color={Colors.primary} />
        <Text
          style={{ ...Fonts.primaryColor17Bold, marginLeft: Sizes.fixPadding }}
        >
          Add Patient
        </Text>
      </View>
    );
  }

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <MaterialIcons
          name="arrow-back"
          color={"black"}
          size={22}
          onPress={() => navigation.pop()}
        />
        <Text
          style={{ ...Fonts.black20Bold, marginLeft: Sizes.fixPadding + 5.0 }}
        >
          Schedule Detail
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    padingHorizontal: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Sizes.fixPadding,
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding + 5.0,
  },
  confirmAndPayButtonStyle: {
    position: "absolute",
    left: Sizes.fixPadding * 2.0,
    right: Sizes.fixPadding * 2.0,
    bottom: Sizes.fixPadding,
  },
  dateAndTimeContainerStyle: {
    // flexDirection: "row",
    // justifyContent: "space-evenly",
    paddingVertical: Sizes.fixPadding,
  },
  doctorImageContainerStyle: {
    height: 90.0,
    width: 90.0,
    borderRadius: 45.0,
    backgroundColor: "white",
    borderColor: "#B3BCFC",
    borderWidth: 1.0,
    marginRight: Sizes.fixPadding,
    marginTop: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding + 3.0,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: Sizes.fixPadding,
    elevation: 20.0,
    overflow: "hidden",
  },
  doctorInfoContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
  patientImageContainer: {
    height: 80.0,
    width: 80.0,
    borderRadius: 40.0,
    backgroundColor: "#F5F5F5",
    borderColor: Colors.lightGray,
    borderWidth: 1.0,
    marginRight: Sizes.fixPadding,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Sizes.fixPadding + 3.0,
    shadowColor: Colors.lightGray,
    shadowOffset: { width: 0, height: 0 }, // change this for more shadow
    shadowOpacity: 0.5,
    shadowRadius: Sizes.fixPadding,
    elevation: 2.0,
    overflow: "hidden",
  },
  confirmButtonStyle: {
    backgroundColor: Colors.primary,
    borderRadius: Sizes.fixPadding + 5.0,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Sizes.fixPadding + 3.0,
  },
  addPatientContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding,
  },
});

export default ConsultationScreen;
