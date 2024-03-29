import React, { useContext, useEffect, useRef, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";

import AccountNavigator from "./AccountNavigator";

import FeedNavigator from "./FeedNavigator";
import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import GlobalContext from "../context/Context";
import {
  useNavigation,
  useRoute,
  DrawerActions,
} from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import {
  ScreenCapturePickerView,
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals,
} from "react-native-webrtc";

import AppNavigator from "./AppNavigator";
import ProfilePicture from "../components/ProfilePicture";
import SetGlobalUserAFollowers from "../components/SetGlobalUserAFollowers";
import SetGlobalUserAFollowing from "../components/SetGlobalUserAFollowing";
import FollowingDrawer from "../components/FollowingDrawer";
import FollowersDrawer from "../components/FollowersDrawer";
import CallingScreen from "../screens/CallingScreen";
import IncomingCallScreen from "../screens/IncomingCallScreen";
import GettingCallScreen from "../screens/GettingCallScreen";
import VideoScreen from "../screens/VideoScreen";
import { RotationGestureHandler } from "react-native-gesture-handler";
import SubscriptionScreen from "../screens/SubscriptionScreen";

const Drawer = createDrawerNavigator();

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const peerConstraints = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
};

export default function DrawerNavigator({ navigation }) {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [gettingCall, setGettingCall] = useState(false);
  const [callId, setCallId] = useState(auth.currentUser.uid);
  const [callReceiverID, setCallReceiverID] = useState("");
  const [callerA, setCallerA] = useState({});
  const connecting = useRef(false);
  let pc = useRef(false);

  const { calleeB, userData } = useContext(GlobalContext);

  const meetCollection = collection(db, "meet");

  // Set up a listener for real-time changes to the "users" collection
  const unsubscribe = onSnapshot(meetCollection, (querySnapshot) => {
    querySnapshot.docChanges().forEach((change) => {
      if (
        change.type === "added" &&
        (change.doc.id === callReceiverID ||
          change.doc.id === auth.currentUser.uid)
      ) {
        setCallId(change.doc.id);
        // setCallerA(change.doc.data());
        setCallerA(change.doc.data().callerA.displayName);
      }
    });
  });

  // console.log(callerA);

  useEffect(() => {
    const cRef = doc(db, "meet", callId);
    const subscribe = onSnapshot(cRef, (snapshot) => {
      const data = snapshot.data();

      // On answer start the call
      if (pc.current && !pc.current.remoteDescription && data && data.answer) {
        pc.current.setRemoteDescription(new RTCSessionDescription(data.answer));
      }

      // if there is offer for chatId set the getting call flag
      if (data && data.offer && !connecting.current) {
        setGettingCall(true);
        // navigation.navigate("IncomingCall");
      }
    });
    // On Delete of collection call hangup
    // The other side has clicked on hangup
    // const qdelete_ee = query(collection(cRef, "callee"));
    // const subscribeDelete_ee = onSnapshot(qdelete_ee, (snapshot) => {
    //   snapshot.docChanges().forEach((change) => {
    //     if (change.type == "removed") {
    //       // console.log("test");
    //       hangup();
    //     }
    //   });
    // });

    const qdelete_er = query(collection(cRef, "caller"));
    const subscribeDelete_er = onSnapshot(qdelete_er, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type == "removed") {
          hangup();
        }
      });
    });
    return () => {
      subscribe();
      // subscribeDelete_ee();
      subscribeDelete_er();
    };
  }, [callId]);

  async function setupWebrtc() {
    pc.current = new RTCPeerConnection(peerConstraints);

    // Get the audio and video stream for the call
    const stream = await getStream();

    if (stream) {
      setLocalStream(stream);

      pc.current.addStream(stream);
    }
    // Get the remote stream once it is available
    pc.current.onaddstream = (event) => {
      setRemoteStream(event.stream);
    };
  }

  async function create() {
    // Document for the call
    const cRef = doc(db, "meet", calleeB.uid);

    // check if someone is already calling calleeB
    const userBSnapshot = await getDoc(cRef);
    if (userBSnapshot.exists()) {
      console.log("is calling!");
      Alert.alert(calleeB.displayName + " is on a phone call!");
      return;
    }
    setCallReceiverID(calleeB.uid);
    connecting.current = true;

    // setUp webrtc
    await setupWebrtc();

    // Exchange the ICE candidates between the caller and callee
    collectIceCandidates(cRef, "caller", "callee");

    if (pc.current) {
      // Create the offer for the call
      // Store the offer under the document
      try {
        let sessionConstraints = {
          mandatory: {
            OfferToReceiveAudio: true,
            OfferToReceiveVideo: true,
            VoiceActivityDetection: true,
          },
        };
        const offerDescription = await pc.current.createOffer(
          sessionConstraints
        );
        await pc.current.setLocalDescription(offerDescription);

        const cWithOffer = {
          callerA: userData,
          offer: {
            type: offerDescription.type,
            sdp: offerDescription.sdp,
          },
        };

        // cRef.set(cWithOffer)
        await setDoc(cRef, cWithOffer);
      } catch (error) {
        console.log("error", error);
      }
    }
  }

  const join = async () => {
    connecting.current = true;
    setGettingCall(false);

    //const cRef = firestore().collection("meet").doc("chatId")
    const cRef = doc(db, "meet", callId);
    // const offer = (await cRef.get()).data()?.offer
    const offer = (await getDoc(cRef)).data()?.offer;

    if (offer) {
      // Setup Webrtc
      await setupWebrtc();

      // Exchange the ICE candidates
      // Check the parameters, Its reversed. Since the joining part is callee
      collectIceCandidates(cRef, "callee", "caller");

      if (pc.current) {
        pc.current.setRemoteDescription(new RTCSessionDescription(offer));

        // Create the answer for the call
        // Updates the document with answer
        const answer = await pc.current.createAnswer();
        pc.current.setLocalDescription(answer);
        const cWithAnswer = {
          answer: {
            type: answer.type,
            sdp: answer.sdp,
          },
        };
        // cRef.update(cWithAnswer)
        await updateDoc(cRef, cWithAnswer);
      }
    }
  };

  /**
   * For disconnectign the call, close the connection, release the stream,
   * and delete the document for the call
   **/

  async function hangup() {
    setGettingCall(false);
    connecting.current = false;
    streamCleanUp();
    firebaseCleanUp();
    if (pc.current) {
      pc.current.close();
      pc.current = null;
    }
    setCallId(auth.currentUser.uid);
    setCallReceiverID("");
  }

  // Helper function

  async function getStream() {
    let isVoiceOnly = false;
    let mediaConstraints = {
      audio: true,
      video: {
        frameRate: 30,
        facingMode: "user",
      },
    };
    try {
      const mediaStream = await mediaDevices.getUserMedia(mediaConstraints);

      if (isVoiceOnly) {
        let videoTrack = mediaStream.getVideoTracks()[0];
        videoTrack.enabled = false;
      }

      return mediaStream;
    } catch (err) {
      console.log("err", err);
    }
  }

  async function streamCleanUp() {
    if (localStream) {
      localStream.getTracks().forEach((t) => t.stop());
      localStream.release();
    }
    setLocalStream(null);
    setRemoteStream(null);
  }

  async function firebaseCleanUp() {
    const cRef = doc(db, "meet", callId);
    if (cRef) {
      const qee = query(collection(cRef, "callee"));
      const calleeCandidate = await getDocs(qee);
      calleeCandidate.forEach(async (candidate) => {
        await deleteDoc(candidate.ref);
      });
      const qer = query(collection(cRef, "caller"));
      const callerCandidate = await getDocs(qer);
      callerCandidate.forEach(async (candidate) => {
        await deleteDoc(candidate.ref);
      });
      deleteDoc(cRef);
    }

    // const cRefReceiver = doc(db, "meet", callReceiverID);
    // if (cRefReceiver) {
    //   const qee = query(collection(cRefReceiver, "callee"));
    //   const calleeCandidate = await getDocs(qee);
    //   calleeCandidate.forEach(async (candidate) => {
    //     await deleteDoc(candidate.ref);
    //   });
    //   const qer = query(collection(cRefReceiver, "caller"));
    //   const callerCandidate = await getDocs(qer);
    //   callerCandidate.forEach(async (candidate) => {
    //     await deleteDoc(candidate.ref);
    //   });
    //   deleteDoc(cRefReceiver);
    // }
  }

  async function collectIceCandidates(cRef, localName, remoteName) {
    const candidateCollection = collection(cRef, localName);

    if (pc.current) {
      // on new ICE candidate add it to firestore
      pc.current.onicecandidate = (event) => {
        event.candidate &&
          addDoc(candidateCollection, event.candidate.toJSON());
      };
    }

    // Get the ICE candidate added to firestore and update the local PC

    const q = query(collection(cRef, remoteName));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (
          change.type == "added" &&
          pc.current &&
          pc.current.remoteDescription
        ) {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.current.addIceCandidate(candidate);
        }
      });
    });
  }

  // Displays the gettingCall Component
  if (gettingCall) {
    return (
      <GettingCallScreen
        hangup={hangup}
        join={join}
        caller={callerA}
      ></GettingCallScreen>
    );
  }

  // Displays local stream on calling
  // Displays both local and remote stream once call is connected
  if (localStream) {
    return (
      <VideoScreen
        calleeB={calleeB}
        hangup={hangup}
        localStream={localStream}
        remoteStream={remoteStream}
      ></VideoScreen>
    );
  }

  return (
    <Drawer.Navigator
      drawerType="front"
      edgeWidth={100}
      initialRouteName="AppNavigator"
      useLegacyImplementation={true}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Group screenOptions={{ headerShown: false }}>
        <Drawer.Screen
          name="AppNavigator"
          // component={AppNavigator}
          children={() => <AppNavigator create={create}></AppNavigator>}
        />
      </Drawer.Group>
      <Drawer.Group
        screenOptions={{
          headerRightContainerStyle: {
            marginRight: 15,
          },
          headerLeftContainerStyle: {
            marginLeft: 15,
          },
          headerLeft: () => (
            <MaterialCommunityIcons
              name="arrow-left"
              color={"black"}
              size={24}
              // onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            />
          ),
        }}
      ></Drawer.Group>
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props) {
  const { userData, whereTab } = useContext(GlobalContext);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.topContainer}>
          <ProfilePicture
            onPress={() =>
              props.navigation.navigate("AppNavigator", {
                screen: whereTab,
                params: {
                  screen: "ProfileInfo",
                  params: { ProfileUser: userData },
                },
              })
            }
            size={60}
            userData={userData}
          ></ProfilePicture>
          {/* <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          ></View> */}
          <Text style={styles.username}>{auth.currentUser.displayName}</Text>
          <View style={styles.data}>
            <SetGlobalUserAFollowers></SetGlobalUserAFollowers>
            <SetGlobalUserAFollowing></SetGlobalUserAFollowing>
            {userData && (
              <FollowingDrawer userBData={userData}></FollowingDrawer>
            )}
            {userData && (
              <FollowersDrawer userBData={userData}></FollowersDrawer>
            )}
          </View>
        </View>
        <DrawerItem
          label={() => <Text style={styles.label}>Profile</Text>}
          onPress={() =>
            props.navigation.navigate("AppNavigator", {
              screen: whereTab,
              params: {
                screen: "ProfileInfo",
                params: { ProfileUser: userData },
              },
            })
          }
          icon={() => (
            <MaterialCommunityIcons
              name="account-outline"
              size={22}
              color="#898f93"
            />
          )}
        />
        <DrawerItem
          label={() => <Text style={styles.label}>Wallets</Text>}
          onPress={() => props.navigation.navigate("Wallets")}
          icon={() => <Ionicons name="wallet" size={22} color="#898f93" />}
        />
        <DrawerItem
          label={() => <Text style={styles.label}>Vetcation</Text>}
          onPress={() =>
            props.navigation.navigate("AppNavigator", {
              screen: whereTab,
              params: {
                screen: "Subscription",
                params: { ProfileUser: userData },
              },
            })
          }
          icon={() => (
            <MaterialIcons name="pets" size={22} color="dodgerblue" />
          )}
        />

        <View style={{ height: 0.2, backgroundColor: "#2b353c" }} />
        <TouchableOpacity
          style={{ padding: 10, paddingLeft: 15 }}
          onPress={() => props.navigation.navigate("Settings")}
        >
          <Text style={styles.optionText}>Settings and privacy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: 10, paddingLeft: 15 }}
          onPress={() => props.navigation.navigate("Help")}
        >
          <Text style={styles.optionText}>Help and Centre</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
      <View style={styles.bottomContainer}>
        <TouchableWithoutFeedback>
          <Image
            source={require("../assets/2.jpg")}
            style={styles.bottomIcon}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Image
            source={require("../assets/1.jpg")}
            style={styles.bottomIcon}
          />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  circleStyle: {
    height: 60.0,
    width: 60.0,
    // backgroundColor: "#F5F5F5",
    borderRadius: 30.0,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    height: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    paddingRight: 0,
    // backgroundColor: "#141f27",
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  icon: {
    height: 50,
    width: 50,
  },
  topContainer: {
    padding: 15,
    borderBottomWidth: 0.2,
    borderBottomColor: "#2b353c",
  },
  profile: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  title: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 10,
  },
  username: {
    marginTop: 5,
    fontSize: 17,
    // color: "#898f93",
  },
  data: {
    flexDirection: "row",
    marginTop: 15,
  },
  following: {
    flexDirection: "row",
    marginRight: 15,
  },
  followers: {
    flexDirection: "row",
  },
  number: {
    fontSize: 16,
    fontWeight: "bold",
    // color: "#fff",
  },
  text: {
    fontSize: 16,
    // color: "#898f93",
  },
  label: {
    fontSize: 18,
    fontWeight: "700",
    // color: "#fff",
  },
  optionText: {
    fontSize: 18,
    // color: "#fff",
    // fontWeight: 'bold',
  },
  bottomContainer: {
    padding: 10,
    position: "absolute",
    bottom: 0,
    height: 50,
    borderTopWidth: 0.2,
    borderTopColor: "#2b353c",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  bottomIcon: {
    height: 40,
    width: 40,
  },
});
