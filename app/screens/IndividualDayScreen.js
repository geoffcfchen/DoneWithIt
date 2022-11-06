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
  Button,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { Fonts, Colors, Sizes } from "../constant/styles";
import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import dayjs from "dayjs";
import AuthContext from "../auth/context";
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import AppTextInput from "../components/AppTextInput";
import { nanoid } from "nanoid";
import GlobalContext from "../context/Context";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { async } from "@firebase/util";
import { useRoute } from "@react-navigation/native";

const { width } = Dimensions.get("screen");

const IndividualDayScreen = ({ navigation, timeSlots }) => {
  const randomID = useMemo(() => nanoid(), []);
  const { userData } = useContext(GlobalContext);
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
  // const route = useRoute();

  // console.log("timeSlots", timeSlots);

  const timeSlotID = timeSlots ? timeSlots.id : randomID;
  // console.log("timeSlotID", timeSlotID);
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
          participants: [userData],
          participantsArray: [userData.email],
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

  useEffect(() => {
    const unsubscribe = onSnapshot(timeSlotMessagesRef, (querySnapshot) => {
      // querySnapshot
      //   .docChanges()
      //   .map(({ doc }) => console.log("doc_id", doc.id));
      const messagesFirestore = querySnapshot.docChanges().map(({ doc }) => {
        const message = doc.data();
        return { id: doc.id, slot: moment(message.slot.toDate()) };
      });
      console.log("messagesFirestore", messagesFirestore);
      // const timeslot = messagesFirestore.map((doc) => moment(doc.slot));
      // console.log("timeslot", timeslot);
      // console.log("datesWhitelist inside", datesWhitelist);
      appendtimeslot(messagesFirestore);
      // // setTimeSlots(parsedTimesSlots);
    });
    return () => unsubscribe();
  }, []);

  const appendtimeslot = useCallback((timeslot) => {
    setDatesWhitelist((previousdatesWhitelist) => [
      ...previousdatesWhitelist,
      ...timeslot,
    ]);
    // console.log("messages inside", messages);
  }, []);

  console.log("datesWhitelist outside", datesWhitelist);

  // const appendMessages = useCallback(
  //   (datesWhitelist) => {
  //     setDatesWhitelist((previousdatesWhitelists) =>
  //       GiftedChat.append(previousMessages, messages)
  //     );
  //     // console.log("messages inside", messages);
  //   },
  //   [messages]
  // );

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
      // createdAt: new Date(),
      slot: slot,
      user: userData,
      participantsArray: [userData.email],
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
    handleSubmit(Datetime, userData);
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
        console.log(
          "convertedfilteredEveningSlots",
          convertedfilteredEveningSlots
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

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity activeOpacity={0.99} onPress={() => console.log(item)}>
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
      {selectDate()}
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

  function calander() {
    return (
      <View>
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
            dateNumberStyle={{ color: "black", fontSize: 17.0 }}
            dateNameStyle={{ color: "black", fontSize: 15.0 }}
            highlightDateNameStyle={{ color: "white", fontSize: 15.0 }}
            highlightDateNumberStyle={{ color: "white", fontSize: 17.0 }}
            // datesBlacklist={datesBlacklistFunc}
            datesWhitelist={datesWhitelist.map((item) => item.slot)}
            disabledDateOpacity={0.6}
            disabledDateNameStyle={{ color: "gray", fontSize: 15.0 }}
            disabledDateNumberStyle={{ color: "gray", fontSize: 17.0 }}
            useIsoWeekday={false}
            scrollable={true}
            upperCaseDays={false}
            styleWeekend={true}
            onDateSelected={SelectedDate}
          />
        </View>
      </View>
    );
  }

  function SelectedDate(date) {
    setSelectedDay(date);
  }

  function selectDate() {
    return (
      <View style={styles.container}>
        <AppButton
          title="Add starting time"
          onPress={showStartDatetime1Picker}
        />
        <AppTextInput
          keyboardType="numeric"
          maxLength={8}
          placeholder="Duration (hour)"
          width={150}
          onChangeText={onChangeNumber}
          value={number}
          defaultValue={"1"}
        ></AppTextInput>
        <Button title="Clear timeframe" onPress={clearDatetime1Picker} />

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
    const renderItem = ({ item }) => {
      // console.log("item", item);
      return (
        <TouchableOpacity
          activeOpacity={0.99}
          onPress={() => {
            console.log(item);
          }}
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
