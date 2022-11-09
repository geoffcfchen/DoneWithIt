import React, { useState } from "react";
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
} from "react-native";
import { Fonts, Colors, Sizes } from "../constant/styles";
import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import dayjs from "dayjs";

const morningSlots = [
  "8:00 - 9:00",
  "8:30",
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
];

const afternoonSlots = [
  "12:30",
  "1:00",
  "1:30",
  "2:00",
  "2:30",
  "3:00",
  "3:30",
  "4:00",
  "4:30",
  "5:00",
  "5:30",
  "6:00",
];

const eveningSlots = ["8:00", "8:30", "9:00", "9:30", "10:00", "10:30"];

const { width } = Dimensions.get("screen");

const TimeSlotScreen = ({ navigation, route }) => {
  const image = route.params.image;
  const name = route.params.name;
  const experience = route.params.experience;
  const type = route.params.type;
  const rating = route.params.rating;
  const timeSlot = route.params.timeSlot;
  const item = route.params.item;

  // console.log("timeSlot", timeSlot);
  // console.log("item", item);

  const [selectedSlot, setSelectedSlot] = useState("");

  const [book, setBook] = useState(false);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.99}
        onPress={() => {
          setSelectedSlot(`${item} PM`);
          setBook(true);
        }}
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
            {item} PM
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const datesBlacklistFunc = (date) => {
    return null;
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar translucent={false} backgroundColor={Colors.primary} />
      {
        <View style={{ flex: 1 }}>
          {header()}
          {doctorInfo()}
          {calander()}
          {divider()}
          <FlatList
            ListHeaderComponent={
              <>
                {slotsInfo({
                  image: require("../assets/icons/sunrise.png"),
                  data: morningSlots,
                })}
                {slotsTime({ slots: morningSlots, time: "AM" })}
                {slotsInfo({
                  image: require("../assets/icons/sun.png"),
                  data: afternoonSlots,
                })}
              </>
            }
            data={afternoonSlots}
            renderItem={renderItem}
            keyExtractor={(index) => `${index}`}
            numColumns={3}
            ListFooterComponent={
              <>
                {slotsInfo({
                  image: require("../assets/icons/sun-night.png"),
                  data: eveningSlots,
                })}
                {slotsTime({ slots: eveningSlots, time: "PM" })}
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
    </View>
  );

  function bookingInfo() {
    return book ? (
      <View style={styles.bookNowContainerStyle}>
        <TouchableOpacity
          activeOpacity={0.99}
          onPress={() =>
            navigation.navigate("Consultation", {
              image,
              name,
              experience,
              type,
              selectedSlot,
              rating,
            })
          }
        >
          <View style={styles.bookButtonStyle}>
            <Text style={{ ...Fonts.white20Regular }}>Book now</Text>
          </View>
        </TouchableOpacity>
      </View>
    ) : null;
  }

  function calander() {
    const datesWhitelist = [
      // single date (today)
      // dayjs().add(3, "day"),
      //   moment().add(1, "days"),
      //   date range
      {
        start: moment().add(0, "days"),
        end: moment().add(5, "days"),
      },
    ];
    // console.log(datesWhitelist);
    // console.log(moment().add(1, "days"));
    // console.log(dayjs().add(1, "day"));
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
          />
        </View>
      </View>
    );
  }

  function divider() {
    return <View style={styles.dividerStyle}></View>;
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
            source={{ uri: item.photoURL }}
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
                {" "}
                Dr. {item.displayName}
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
      return (
        <TouchableOpacity
          activeOpacity={0.99}
          onPress={() => {
            setSelectedSlot(`${item} ${time}`);
            setBook(true);
          }}
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
          numColumns={3}
          contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding * 2.0 }}
        />
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
          Time Slots
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
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
    width: 100.0,
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

export default TimeSlotScreen;
