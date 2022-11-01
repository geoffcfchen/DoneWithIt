import React, { useContext, useEffect, useState } from "react";
import CalendarStrip from "react-native-calendar-strip";
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
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

const { width } = Dimensions.get("screen");

const IndividualDayScreen = ({ navigation, route }) => {
  // const image = route.params.image;
  // const name = route.params.name;
  // const experience = route.params.experience;
  // const type = route.params.type;
  // const rating = route.params.rating;
  const { user } = useContext(AuthContext);
  const [datesWhitelist, setDatesWhitelist] = useState([]);
  const [filteredDates, setFilteredDates] = useState([]);
  const [selectedDay, setSelectedDay] = useState([]);
  const [isStartDatetime1PickerVisible, setIsStartDatetime1PickerVisibility] =
    useState(false);

  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedMorningSlot, setSelectedMorningSlot] = useState([]);
  const [selectedAfternoonSlot, setSelectedAfternoonSlot] = useState([]);
  const [selectedEveningSlot, setSelectedEveningSlot] = useState([]);

  const [book, setBook] = useState(false);

  const showStartDatetime1Picker = () => {
    setIsStartDatetime1PickerVisibility(true);
  };

  const clearDatetime1Picker = () => {
    setDatesWhitelist([]);
    setSelectedDay([]);
  };

  const hideStartDatetime1Picker = () => {
    setIsStartDatetime1PickerVisibility(false);
  };

  const handleConfirmStart1 = (Datetime) => {
    setDatesWhitelist([...datesWhitelist, moment(Datetime)]);
    hideStartDatetime1Picker();
  };

  useEffect(() => {
    const samedate = datesWhitelist.filter(
      (value) =>
        value.toDate().getDate() == moment(selectedDay).toDate().getDate()
    );
    setFilteredDates(samedate);
  }, [datesWhitelist, selectedDay]);

  useEffect(() => {
    function morningSlots(filteredDates, duration) {
      if (filteredDates.length) {
        const filteredMorningSlots = filteredDates.filter((element) =>
          element.isBefore(element.clone().hour(12).minute(0).second(0))
        );
        const convertedfilteredMorningSlots = filteredMorningSlots.map(
          (element) => {
            var new_date = moment(element).add(duration, "hours");
            return formatAMPM(element) + " - " + formatAMPM(new_date);
          }
        );
        setSelectedMorningSlot(convertedfilteredMorningSlots);

        const filteredAfternoonSlots = filteredDates.filter((element) =>
          element.isBetween(
            element.clone().hour(12).minute(0).second(0),
            element.clone().hour(18).minute(0).second(0)
          )
        );
        const convertedfilteredAfternoonSlots = filteredAfternoonSlots.map(
          (element) => {
            var new_date = moment(element).add(duration, "hours");
            return formatAMPM(element) + " - " + formatAMPM(new_date);
          }
        );
        setSelectedAfternoonSlot(convertedfilteredAfternoonSlots);

        const filteredEveningSlots = filteredDates.filter((element) =>
          element.isAfter(element.clone().hour(18).minute(0).second(0))
        );
        const convertedfilteredEveningSlots = filteredEveningSlots.map(
          (element) => {
            var new_date = moment(element).add(duration, "hours");
            return formatAMPM(element) + " - " + formatAMPM(new_date);
          }
        );
        setSelectedEveningSlot(convertedfilteredEveningSlots);
      } else {
        setSelectedMorningSlot([]);
        setSelectedAfternoonSlot([]);
        setSelectedEveningSlot([]);
      }
    }
    morningSlots(filteredDates, 2);
  }, [filteredDates]);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.99}
        // onPress={() => {
        //   setSelectedSlot(`${item} PM`);
        //   setBook(true);
        // }}
      >
        <View
          style={{
            backgroundColor:
              selectedSlot == `${item} PM` ? Colors.primary : "white",
            borderColor:
              selectedSlot == `${item} PM` ? Colors.primary : "#CDCDCD",
            ...styles.slotContainerStyle,
          }}
        >
          <Text
            style={
              selectedSlot == `${item} PM`
                ? { ...Fonts.white16Regular }
                : { ...Fonts.primaryColor16Regular }
            }
          >
            {item}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Screen style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar translucent={false} backgroundColor={Colors.primary} />
      {
        <View style={{ flex: 1 }}>
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
            keyExtractor={(index) => `${index}`}
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
              paddingBottom: book
                ? Sizes.fixPadding * 8.0
                : Sizes.fixPadding * 2.0,
            }}
          />

          {bookingInfo()}
        </View>
      }
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

  function bookingInfo() {
    return null;
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
            datesWhitelist={datesWhitelist}
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
        <Button title="Add timeframe" onPress={showStartDatetime1Picker} />
        <Button title="Clear timeframe" onPress={clearDatetime1Picker} />
        <AppButton title="Submit" onPress={() => console.log("test")} />
        <DateTimePickerModal
          display="inline"
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

  function slotsTime({ slots, time }) {
    const renderItem = ({ item }) => {
      // console.log("item", item);
      return (
        <TouchableOpacity
          activeOpacity={0.99}
          // onPress={() => {
          //   setSelectedSlot(`${item} ${time}`);
          //   setBook(true);
          // }}
        >
          <View
            style={{
              backgroundColor:
                selectedSlot == `${item} ${time}` ? Colors.primary : "white",
              borderColor:
                selectedSlot == `${item} ${time}` ? Colors.primary : "#CDCDCD",
              ...styles.slotContainerStyle,
            }}
          >
            <Text
              style={
                selectedSlot == `${item} ${time}`
                  ? { ...Fonts.white16Regular }
                  : { ...Fonts.primaryColor16Regular }
              }
            >
              {item} {time}
            </Text>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <View>
        <FlatList
          data={slots}
          keyExtractor={(index) => `${index}`}
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
