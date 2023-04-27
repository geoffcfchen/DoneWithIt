import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from "react-native";
import React from "react";
import bg from "../assets/ios_bg.jpeg";
import CallButton from "../components/CallButton";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";

export default function GettingCallScreen({ join, hangup, caller }) {
  return (
    // <View style={styles.container}>
    //   <Image
    //     source={{ uri: "https://picsum.photos/200/300" }}
    //     style={styles.image}
    //   ></Image>
    //   <View style={styles.bContainer}>
    //     <CallButton
    //       iconName="phone"
    //       backgroundColor="green"
    //       onPress={join}
    //       style={{ marginRight: 30 }}
    //     ></CallButton>
    //     <CallButton
    //       iconName="phone"
    //       backgroundColor="red"
    //       onPress={hangup}
    //       style={{ marginLeft: 30 }}
    //     ></CallButton>
    //   </View>
    // </View>
    <ImageBackground source={bg} style={styles.bg} resizeMode="cover">
      <Text style={styles.name}>{caller}</Text>
      {/* <Text style={styles.phoneNumber}>Ringing +31 343 3434 3434</Text> */}

      <View style={[styles.row, { marginTop: "auto" }]}>
        <View style={styles.iconsContainer}>
          <Ionicons name="alarm" color="white" size={30}></Ionicons>
          <Text style={styles.iconsText}>Remind me</Text>
        </View>
        <View style={styles.iconsContainer}>
          <Feather name="message-circle" color="white" size={30}></Feather>
          <Text style={styles.iconsText}>Messages</Text>
        </View>
      </View>
      <View style={styles.row}>
        {/* Decline Button */}

        <Pressable onPress={hangup} style={styles.iconsContainer}>
          <View style={styles.iconsButtonContainer}>
            <Feather name="x" color="white" size={40}></Feather>
          </View>
          <Text style={styles.iconsText}>Decline</Text>
        </Pressable>

        {/* Accept Button */}
        <Pressable onPress={join} style={styles.iconsContainer}>
          <View
            style={[
              styles.iconsButtonContainer,
              { backgroundColor: "#1647EC" },
            ]}
          >
            <Feather name="check" color="white" size={40}></Feather>
          </View>
          <Text style={styles.iconsText}>Accept</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: "flex-end",
  //   alignItems: "center",
  // },
  // image: {
  //   position: "absolute",
  //   width: "100%",
  //   height: "100%",
  // },
  // bContainer: { flexDirection: "row", bottom: 30 },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginTop: 100,
    marginBottom: 15,
  },
  phoneNumber: {
    fontSize: 25,
    color: "white",
  },
  bg: {
    backgroundColor: "red",
    flex: 1,
    alignItems: "center",
    paddingBottom: 50,
  },

  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  iconsContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  iconsText: {
    color: "white",
    marginTop: 10,
  },
  iconsButtonContainer: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 40,
    margin: 10,
  },
});
