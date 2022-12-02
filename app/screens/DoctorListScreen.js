import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  FlatList,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { Fonts, Colors, Sizes } from "../constant/styles";
import {
  Ionicons,
  FontAwesome,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import ProfilePicture from "../components/ProfilePicture";
import GlobalContext from "../context/Context";

const { width } = Dimensions.get("screen");

const doctorsList = [
  {
    id: "1",
    name: "Dr. Ronan Peiterson",
    yearsOfExperience: 8,
    rating: 4.9,
    reviews: 135,
    image: require("../assets/doctor/doctor-1.png"),
  },
  {
    id: "2",
    name: "Dr. Brayden Trump",
    yearsOfExperience: 10,
    rating: 4.7,
    reviews: 235,
    image: require("../assets/doctor/doctor-2.png"),
  },
  {
    id: "3",
    name: "Dr. Appollonia Ellison",
    yearsOfExperience: 7,
    rating: 4.8,
    reviews: 70,
    image: require("../assets/doctor/doctor-3.png"),
  },
  {
    id: "4",
    name: "Dr. Beatriz Watson",
    yearsOfExperience: 5,
    rating: 5.0,
    reviews: 50,
    image: require("../assets/doctor/doctor-4.png"),
  },
  {
    id: "5",
    name: "Dr. Diego Williams",
    yearsOfExperience: 15,
    rating: 4.9,
    reviews: 512,
    image: require("../assets/doctor/doctor-5.png"),
  },
  {
    id: "6",
    name: "Dr. Shira Gates",
    yearsOfExperience: 4,
    rating: 4.4,
    reviews: 15,
    image: require("../assets/doctor/doctor-6.png"),
  },
  {
    id: "7",
    name: "Dr. Antonia Warner",
    yearsOfExperience: 7,
    rating: 4.6,
    reviews: 99,
    image: require("../assets/doctor/doctor-7.png"),
  },
  {
    id: "8",
    name: "Dr. Linnea Bezos",
    yearsOfExperience: 2,
    rating: 4.5,
    reviews: 9,
    image: require("../assets/doctor/doctor-8.png"),
  },
];

const DoctorListScreen = ({ navigation, route }) => {
  const type = "General practice";
  const [doctorsList, setDoctorsList] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const { allUsersThatUserFollowing } = useContext(GlobalContext);

  const doctorsQuery = query(
    collection(db, "customers"),
    where("role.label", "==", "Doctor")
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(doctorsQuery, (querySnapshot) => {
      // querySnapshot.docs.map((doc) => console.log("doc", doc.data()));
      const parsedDoctors = querySnapshot.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .filter((item) => allUsersThatUserFollowing.indexOf(item.uid) > -1);
      console.log(parsedDoctors);
      setDoctorsList(parsedDoctors);
    });
    return () => unsubscribe();
  }, [allUsersThatUserFollowing]);

  const timeSlotsQuery = query(
    collection(db, "timeSlots")
    // where("role.label", "==", "Doctor")
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(timeSlotsQuery, (querySnapshot) => {
      // querySnapshot.docs.map((doc) => console.log("doc", doc.data()));
      const parsedTimeSlots = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTimeSlots(parsedTimeSlots);
    });
    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }} backgroundColor="rgba(0,0,0,0)">
      <StatusBar translucent={false} backgroundColor={Colors.primary} />
      <View style={{ flex: 1, backgroundColor: "white" }}>
        {/* {header()} */}
        {/* {search()} */}
        {doctors()}
      </View>
    </SafeAreaView>
  );

  function header() {
    return (
      <View style={styles.headerContainerStyle}>
        {/* <AntDesign
          name="arrowleft"
          size={24}
          color="black"
          onPress={() => navigation.navigate("BottomTabScreen")}
        /> */}
        <Text
          style={{ ...Fonts.black20Bold, marginLeft: Sizes.fixPadding * 2.0 }}
        >
          Schedule Appointment
        </Text>
      </View>
    );
  }

  function search() {
    return (
      <View style={styles.headerSearchStyle}>
        <Ionicons name="search" size={24} color="gray" />
        <View style={{ flex: 1 }}>
          <TextInput
            placeholder={`Search ${type}`}
            style={{ ...Fonts.gray17Regular, marginLeft: Sizes.fixPadding }}
          />
        </View>
      </View>
    );
  }

  function doctors() {
    const renderItem = ({ item }) => {
      // console.log("item", item);
      return (
        <View style={{ justifyContent: "center", marginTop: 15.0 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.doctorImageContainerStyle}>
              <TouchableWithoutFeedback
                onPress={() =>
                  navigation.navigate("ProfileInfo", {
                    ProfileUser: item,
                  })
                }
              >
                <Image
                  source={{ uri: item.photoURL }}
                  resizeMode="contain"
                  style={{
                    height: 109.0,
                    width: 109.0,
                    borderRadius: 75.0,
                    overflow: "hidden",
                  }}
                />
              </TouchableWithoutFeedback>
            </View>

            <View>
              <Text style={{ ...Fonts.black16Bold }}>
                Dr. {item.displayName}
              </Text>
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
                {item.yearsOfExperience} Years Experience
              </Text> */}
              {/* <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: Sizes.fixPadding - 7.0,
                }}
              >
                <FontAwesome name="star" size={20} color="#CDDC39" />
                <Text
                  style={{
                    ...Fonts.black16Regular,
                    marginLeft: Sizes.fixPadding,
                    marginRight: Sizes.fixPadding * 2.0,
                  }}
                >
                  {item.rating}
                </Text>
                <MaterialIcons name="rate-review" size={24} color="gray" />
                <Text
                  style={{
                    ...Fonts.black16Regular,
                    marginLeft: Sizes.fixPadding,
                  }}
                >
                  {item.reviews} Reviews
                </Text>
              </View> */}
            </View>
          </View>

          <View style={styles.bookContainerStyle}>
            {/* <TouchableOpacity
              activeOpacity={0.99}
              onPress={() =>
                navigation.navigate("TimeSlots", {
                  image: item.image,
                  name: item.name,
                  type: type,
                  experience: item.yearsOfExperience,
                  rating: item.rating,
                })
              }
            >
              <View style={styles.bookVideoConsultButtonStyle}>
                <Text style={{ ...Fonts.orangeColorBold }}>
                  Book Video Consult
                </Text>
              </View>
            </TouchableOpacity> */}
            <TouchableOpacity
              activeOpacity={0.99}
              onPress={() =>
                navigation.navigate("IndividualDay", {
                  // image: item.image,
                  // name: item.name,
                  // type: type,
                  // experience: item.yearsOfExperience,
                  // rating: item.rating,
                  item: item,
                  timeSlotsfromClientView: timeSlots.filter(
                    (timeSlot) => timeSlot.participantsArray[0] == item.email
                  ),
                })
              }
            >
              <View style={styles.bookAppointmentButtonStyle}>
                <Text style={{ ...Fonts.primaryColorBold }}>
                  Scheudle Phone Call
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.dividerStyle}></View>
        </View>
      );
    };

    return (
      <FlatList
        data={doctorsList}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0 }}
      />
    );
  }
};

const styles = StyleSheet.create({
  headerSearchStyle: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: Sizes.fixPadding,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    alignItems: "center",
    paddingVertical: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding,
  },
  headerContainerStyle: {
    backgroundColor: "white",
    flexDirection: "row",
    height: 40.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    marginVertical: Sizes.fixPadding,
    alignItems: "center",
  },
  doctorImageContainerStyle: {
    height: 110.0,
    width: 110.0,
    borderRadius: 75.0,
    backgroundColor: "white",
    borderColor: "#B3BCFC",
    borderWidth: 1.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding + 3.0,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: Sizes.fixPadding,
    elevation: 20.0,
    overflow: "hidden",
  },
  bookContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // marginHorizontal: Sizes.fixPadding * 3.0,
  },
  bookVideoConsultButtonStyle: {
    width: width / 2 - 30,
    borderColor: "#FF9B07",
    borderWidth: 1.0,
    backgroundColor: "#FFEDD2",
    borderRadius: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding,
    alignItems: "center",
  },
  bookAppointmentButtonStyle: {
    width: width / 2 - 30,
    borderColor: Colors.primary,
    borderWidth: 1.0,
    backgroundColor: "#E3E6FE",
    borderRadius: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding,
    alignItems: "center",
  },
  dividerStyle: {
    backgroundColor: Colors.lightGray,
    height: 0.8,
    marginTop: Sizes.fixPadding * 2.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
  },
});

export default DoctorListScreen;
