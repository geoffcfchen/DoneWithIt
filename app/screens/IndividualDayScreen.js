import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import CalendarStrip from "react-native-calendar-strip";
import {
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

import { Fonts, Colors, Sizes } from "../constant/styles";
import Screen from "../components/Screen";
import { nanoid } from "nanoid";
import GlobalContext from "../context/Context";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useRoute } from "@react-navigation/native";
import NewTimeButton from "../components/NewTimeButton";

const { width } = Dimensions.get("screen");

const IndividualDayScreen = () => {
  const randomID = useMemo(() => nanoid(), []);
  const { userData, timeSlots } = useContext(GlobalContext);
  const [datesWhitelist, setDatesWhitelist] = useState([]);
  const [filteredDates, setFilteredDates] = useState([]);
  const [selectedDay, setSelectedDay] = useState([]);
  const [isStartDatetime1PickerVisible, setIsStartDatetime1PickerVisibility] =
    useState(false);

  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedMorningSlot, setSelectedMorningSlot] = useState([]);
  const [selectedAfternoonSlot, setSelectedAfternoonSlot] = useState([]);
  const [selectedEveningSlot, setSelectedEveningSlot] = useState([]);

  const [number, onChangeNumber] = useState(1);

  const [book, setBook] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();
  // console.log("userData", userData);

  let timeSlotID;
  let doctorData;
  if (userData.role.label == "Client") {
    timeSlots = route.params.timeSlotsfromClientView[0];
    timeSlotID = timeSlots ? timeSlots.id : randomID;
    doctorData = route.params.item;
    // console.log("timeSlotID", timeSlotID);
    // console.log("doctorData", doctorData);
  } else {
    timeSlotID = timeSlots ? timeSlots.id : randomID;
    doctorData = userData;
  }

  const timeSlotRef = doc(db, "timeSlots", timeSlotID);
  const timeSlotMessagesRef = collection(
    db,
    "timeSlots",
    timeSlotID,
    "messages"
  );
  useEffect(() => {
    (async () => {
      if (!timeSlots) {
        const timeSlotData = {
          participants: [doctorData],
          participantsArray: [doctorData.email],
        };
        try {
          await setDoc(timeSlotRef, timeSlotData);
        } catch (error) {
          console.log(error);
        }
      } else {
      }
    })();
  }, []);

  // console.log(timeSlotMessagesRef);

  // useEffect(() => {
  //   const unsubscribe = onSnapshot(timeSlotMessagesRef, (querySnapshot) => {
  //     const messagesFirestore = querySnapshot.docChanges().map(({ doc }) => {
  //       const message = doc.data();
  //       return {
  //         ...message,
  //         id: doc.id,
  //         slot: moment(message.slot.toDate()),
  //         datetime: moment(message.slot.toDate()),
  //       };
  //     });
  //     console.log("messagesFirestore", messagesFirestore);
  //     appendtimeslot(messagesFirestore);
  //   });
  //   return () => unsubscribe();
  // }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(timeSlotMessagesRef, (querySnapshot) => {
      // querySnapshot
      //   .docChanges()
      //   .map(({ doc }) => console.log("doc_id", doc.id));
      const messagesFirestore = querySnapshot.docs.map((doc) => {
        const message = doc.data();
        // console.log("message", message.slotStartingTime.toDate());
        return {
          ...message,
          id: doc.id,
          slot: moment(message.slotStartingTime.toDate()),
          datetime: moment(message.slotStartingTime.toDate()),
        };
      });
      // console.log("messagesFirestore", messagesFirestore);
      setDatesWhitelist(messagesFirestore);
    });
    return () => unsubscribe();
  }, []);

  // const appendtimeslot = useCallback((timeslot) => {
  //   setDatesWhitelist((previousdatesWhitelist) => [
  //     ...previousdatesWhitelist,
  //     ...timeslot,
  //   ]);
  //   console.log("timeslot inside", timeslot);
  // }, []);

  // console.log(userData);
  async function handleSubmit(slot, userData) {
    // console.log(slot, userData);

    // const emailHash = `${user.email}:${userB.email}:`;

    sendQuestion(slot, timeSlotMessagesRef);

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

    // resetForm();
  }

  async function sendQuestion(slot, questionMessagesRef, roomPath) {
    // const uri = listing.images[0];
    // console.log("uri", uri);
    // console.log("emailHash", emailHash);
    // const { url, fileName } = await uploadImage(
    //   uri,
    //   `images/questions/${roomPath || questionHash}`
    // );
    // console.log("url", url);
    // console.log("fileName", fileName);
    const message = {
      // _id: fileName,
      // image: url,
      // title: listing.title,
      // petName: listing.petName,
      // category: listing.category,
      // description: listing.description,
      createdAt: new Date(),
      slotStartingTime: slot,
      user: doctorData,
      participantsArray: [],
      duration: 1,
      numberOfPeopleLimit: 10,
    };
    // console.log("message in sendImage", message);
    // const lastMessage = { ...message };
    // console.log("lastMessage", lastMessage);
    await Promise.all([
      addDoc(questionMessagesRef, message),
      // updateDoc(questionRef, { lastMessage }),
    ]);
  }

  const showStartDatetime1Picker = () => {
    setIsStartDatetime1PickerVisibility(true);
  };

  const clearDatetime1Picker = () => {
    setDatesWhitelist([]);
    setSelectedDay([]);
  };

  const hideStartDatetime1Picker = () => {
    setIsStartDatetime1PickerVisibility(false);
    Keyboard.dismiss;
  };

  const handleConfirmStart1 = (Datetime) => {
    // setDatesWhitelist([...datesWhitelist, moment(Datetime)]);
    handleSubmit(Datetime, doctorData);
    hideStartDatetime1Picker();
  };
  // console.log("datesWhitelist", typeof datesWhitelist[0]);
  useEffect(() => {
    const samedate = datesWhitelist.filter(
      (value) =>
        value.slot.toDate().getDate() == moment(selectedDay).toDate().getDate()
    );
    setFilteredDates(samedate);
  }, [datesWhitelist, selectedDay]);

  useEffect(() => {
    function morningSlots(filteredDates, duration) {
      if (filteredDates.length) {
        const filteredMorningSlots = filteredDates.filter((element) =>
          element.slot.isBefore(
            element.slot.clone().hour(12).minute(0).second(0)
          )
        );
        const convertedfilteredMorningSlots = filteredMorningSlots.map(
          (element) => {
            var new_date = moment(element.slot).add(duration, "hours");
            return {
              ...element,
              slot: formatAMPM(element.slot) + " - " + formatAMPM(new_date),
            };
          }
        );

        setSelectedMorningSlot(convertedfilteredMorningSlots);

        const filteredAfternoonSlots = filteredDates.filter((element) =>
          element.slot.isBetween(
            element.slot.clone().hour(12).minute(0).second(0),
            element.slot.clone().hour(18).minute(0).second(0)
          )
        );
        const convertedfilteredAfternoonSlots = filteredAfternoonSlots.map(
          (element) => {
            var new_date = moment(element.slot).add(duration, "hours");
            return {
              ...element,
              slot: formatAMPM(element.slot) + " - " + formatAMPM(new_date),
            };
          }
        );
        setSelectedAfternoonSlot(convertedfilteredAfternoonSlots);

        const filteredEveningSlots = filteredDates.filter((element) =>
          element.slot.isAfter(
            element.slot.clone().hour(18).minute(0).second(0)
          )
        );
        const convertedfilteredEveningSlots = filteredEveningSlots.map(
          (element) => {
            var new_date = moment(element).add(duration, "hours");
            return {
              ...element,
              slot: formatAMPM(element.slot) + " - " + formatAMPM(new_date),
            };
          }
        );
        setSelectedEveningSlot(convertedfilteredEveningSlots);
      } else {
        setSelectedMorningSlot([]);
        setSelectedAfternoonSlot([]);
        setSelectedEveningSlot([]);
      }
    }
    morningSlots(filteredDates, number);
  }, [filteredDates, datesWhitelist, number]);

  // console.log("filteredDates", filteredDates);
  // console.log("datesWhitelist", datesWhitelist);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.99}
        onPress={() =>
          navigation.navigate("Consultation", {
            item: item,
            timeSlotID: timeSlotID,
          })
        }
      >
        <View
          style={{
            backgroundColor:
              selectedSlot == `${item.slot} PM` ? Colors.primary : "white",
            borderColor:
              selectedSlot == `${item.slot} PM` ? Colors.primary : "#CDCDCD",
            ...styles.slotContainerStyle,
          }}
        >
          <Text
            style={
              selectedSlot == `${item.slot} PM`
                ? { ...Fonts.white16Regular }
                : { ...Fonts.primaryColor16Regular }
            }
          >
            {item.slot}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Screen>
      {userData.role.label == "Client" && doctorInfo()}
      {calander()}
      {divider()}
      <FlatList
        ListHeaderComponent={
          <>
            {slotsInfo({
              image: require("../assets/icons/sunrise.png"),
              data: selectedMorningSlot,
            })}
            {slotsTime({
              slots: selectedMorningSlot,
            })}
            {slotsInfo({
              image: require("../assets/icons/sun.png"),
              data: selectedAfternoonSlot,
            })}
          </>
        }
        data={selectedAfternoonSlot}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListFooterComponent={
          <>
            {slotsInfo({
              image: require("../assets/icons/sun-night.png"),
              data: selectedEveningSlot,
            })}
            {slotsTime({ slots: selectedEveningSlot })}
          </>
        }
        contentContainerStyle={{
          paddingHorizontal: Sizes.fixPadding,
          paddingBottom: book ? Sizes.fixPadding * 8.0 : Sizes.fixPadding * 2.0,
        }}
      />

      {/* {bookingInfo()} */}
      {userData.role.label == "Doctor" && selectDate()}
    </Screen>
  );

  function formatAMPM(momentdate) {
    // console.log("momentdate", momentdate);
    if (momentdate) {
      const date = momentdate.toDate();
      const strTime = date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      // console.log("strTime", strTime);
      return strTime;
    }
    return momentdate;
  }

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
            <View style={{ width: width / 2.0 }}>
              <Text style={{ ...Fonts.black16Bold }}>
                Dr. {doctorData.displayName}
              </Text>
            </View>
            {/* <TouchableOpacity
              activeOpacity={0.99}
              onPress={() =>
                navigation.navigate("DoctorProfile", {
                  image: image,
                  name: name,
                  type: type,
                  rating: rating,
                  experience: experience,
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

  function calander() {
    // console.log("test");
    return (
      <View>
        <CalendarStrip
          style={{
            height: 100,
            paddingTop: Sizes.fixPadding * 2.0,
            paddingBottom: Sizes.fixPadding,
          }}
          highlightDateContainerStyle={{
            backgroundColor: Colors.primary,
            alignItems: "center",
            justifyContent: "center",
          }}
          dateNumberStyle={{ color: "black", fontSize: 18.0 }}
          dateNameStyle={{ color: "black", fontSize: 15.0 }}
          highlightDateNameStyle={{ color: "white", fontSize: 15.0 }}
          highlightDateNumberStyle={{ color: "white", fontSize: 17.0 }}
          // markedDates={markedDatesFunc}
          // datesBlacklist={datesBlacklistFunc}
          datesWhitelist={datesWhitelist.map((item) => item.slot)}
          disabledDateOpacity={0.5}
          // disabledDateNameStyle={{ color: "gray", fontSize: 15.0 }}
          disabledDateNumberStyle={{ color: "gray", fontSize: 15.0 }}
          useIsoWeekday={false}
          // scrollable={true}
          upperCaseDays={false}
          // styleWeekend={true}
          onDateSelected={SelectedDate}
        />
      </View>
    );
  }

  function SelectedDate(date) {
    setSelectedDay(date);
  }

  function selectDate() {
    return (
      <View style={styles.container}>
        <NewTimeButton title="plus" onPress={showStartDatetime1Picker} />
        {/* <AppTextInput
          keyboardType="numeric"
          maxLength={8}
          placeholder="Duration (hour)"
          width={150}
          onChangeText={onChangeNumber}
          value={number}
          defaultValue={"1"}
        ></AppTextInput> */}
        {/* <Button title="Clear timeframe" onPress={clearDatetime1Picker} /> */}

        <DateTimePickerModal
          // display="inline"
          isVisible={isStartDatetime1PickerVisible}
          mode="datetime"
          onConfirm={handleConfirmStart1}
          onCancel={hideStartDatetime1Picker}
        />
      </View>
    );
  }

  function divider() {
    return <View style={styles.dividerStyle}></View>;
  }

  function slotsInfo({ image, data }) {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: Sizes.fixPadding * 2.0,
        }}
      >
        <Image
          source={image}
          style={{ height: 40.0, width: 40.0 }}
          resizeMode="contain"
        />
        <Text style={{ ...Fonts.black18Bold, marginLeft: Sizes.fixPadding }}>
          {data.length} Slots
        </Text>
      </View>
    );
  }

  function slotsTime({ slots }) {
    // const navigation = useNavigation();
    const renderItem = ({ item }) => {
      // console.log("item", item);
      return (
        <TouchableOpacity
          activeOpacity={0.99}
          onPress={() =>
            navigation.navigate("Consultation", {
              item: item,
              timeSlotID: timeSlotID,
            })
          }
        >
          <View
            style={{
              backgroundColor:
                selectedSlot == `${item.slot}` ? Colors.primary : "white",
              borderColor:
                selectedSlot == `${item.slot}` ? Colors.primary : "#CDCDCD",
              ...styles.slotContainerStyle,
            }}
          >
            <Text
              style={
                selectedSlot == `${item.slot}`
                  ? { ...Fonts.white16Regular }
                  : { ...Fonts.primaryColor16Regular }
              }
            >
              {item.slot}
            </Text>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <View>
        <FlatList
          data={slots}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          scrollEnabled={false}
          numColumns={2}
          contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding * 2.0 }}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 10,
    paddingLeft: 10,
  },
  headerWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Sizes.fixPadding,
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding + 5.0,
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
  slotContainerStyle: {
    alignItems: "center",
    borderRadius: Sizes.fixPadding,
    alignItems: "center",
    marginBottom: Sizes.fixPadding * 2.0,
    justifyContent: "center",
    borderWidth: 1.0,
    marginRight: Sizes.fixPadding * 2.0,
    height: 45.0,
    width: 150.0,
  },
  bookButtonStyle: {
    backgroundColor: Colors.primary,
    paddingVertical: Sizes.fixPadding + 3.0,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Sizes.fixPadding + 5.0,
  },
  bookNowContainerStyle: {
    backgroundColor: "white",
    height: 75.0,
    position: "absolute",
    bottom: 0.0,
    width: "100%",
    paddingHorizontal: Sizes.fixPadding * 2.0,
    justifyContent: "center",
  },
  dividerStyle: {
    backgroundColor: Colors.lightGray,
    height: 0.9,
    width: "100%",
    marginBottom: Sizes.fixPadding,
  },
});

export default IndividualDayScreen;
