import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useState } from "react";
import CallButton from "../components/CallButton";
import { RTCView } from "react-native-webrtc";
import MateralIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

function ButtonContainer({ hangup }) {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  return (
    <View style={styles.bContainer}>
      <Pressable onPress={hangup} style={styles.iconButton}>
        <Ionicons
          name="ios-camera-reverse"
          size={30}
          color={"white"}
        ></Ionicons>
      </Pressable>
      <Pressable onPress={hangup} style={styles.iconButton}>
        <MateralIcons
          name={isCameraOn ? "camera-off" : "camera"}
          size={30}
          color={"white"}
        ></MateralIcons>
      </Pressable>
      <Pressable onPress={hangup} style={styles.iconButton}>
        <MateralIcons
          name={isMicOn ? "microphone-off" : "microphone"}
          size={30}
          color={"white"}
        ></MateralIcons>
      </Pressable>
      <Pressable
        onPress={hangup}
        style={[styles.iconButton, { backgroundColor: "red" }]}
      >
        <MateralIcons
          name="phone-hangup"
          size={30}
          color={"white"}
        ></MateralIcons>
      </Pressable>
      {/* <CallButton
        iconName="phone"
        backgroundColor="red"
        onPress={hangup}
      ></CallButton> */}
    </View>
  );
}

export default function VideoScreen({
  calleeB,
  hangup,
  localStream,
  remoteStream,
}) {
  // On call we will just display the local stream
  if (localStream && !remoteStream) {
    // console.log("localStream && !remoteStream");
    return (
      <View style={styles.container}>
        <RTCView
          streamURL={localStream.toURL()}
          objectFit={"cover"}
          style={styles.video}
        ></RTCView>
        <View style={styles.cameraPreview}>
          <Text style={styles.name}>{calleeB.displayName}</Text>
          <Text style={styles.phoneNumber}>calling...</Text>
        </View>
        <ButtonContainer hangup={hangup}></ButtonContainer>
      </View>
    );
  }
  // Once the call is connected, we will display
  // local Stream on top of remote stream
  if (localStream && remoteStream) {
    // console.log("localStream && remoteStream");
    return (
      <View style={styles.container}>
        <RTCView
          streamURL={remoteStream.toURL()}
          objectFit={"cover"}
          style={styles.video}
        ></RTCView>
        <RTCView
          streamURL={localStream.toURL()}
          objectFit={"cover"}
          style={styles.videoLocal}
        ></RTCView>
        <ButtonContainer hangup={hangup}></ButtonContainer>
      </View>
    );
  }
  return (
    <View>
      <ButtonContainer hangup={hangup}></ButtonContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  bContainer: {
    backgroundColor: "#333333",
    padding: 20,
    paddingBottom: 40,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto",
  },
  iconButton: {
    backgroundColor: "#4a4a4a",
    padding: 10,
    borderRadius: 50,
  },
  container: {
    backgroundColor: "#7b4e80",
    height: "100%",
    flex: 1,
    justifyContent: "flex-end",
    // alignItems: "center",
  },
  cameraPreview: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginTop: 50,
    marginBottom: 15,
  },
  phoneNumber: {
    fontSize: 25,
    color: "white",
  },
  video: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  videoLocal: {
    position: "absolute",
    width: 100,
    height: 150,
    top: 0,
    left: 20,
    elevation: 10,
  },
});
