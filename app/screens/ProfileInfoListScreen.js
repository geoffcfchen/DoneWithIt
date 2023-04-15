import React, { useContext, useEffect, useRef, useState } from "react";
import { Image, SafeAreaView, ScrollView, Text } from "react-native";
import { View, StyleSheet, Animated } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";
import AppText from "../components/AppText";
import BackButton from "../components/BackButton";
import Banner from "../components/Banner";
import ProfileEdiButton from "../components/EditProfileButton";
import FollowButton from "../components/FollowButton";
import Followers from "../components/Followers";
import Following from "../components/Following";
import Name from "../components/Name";
import RefreshArrow from "../components/RefreshArrow";
import GlobalContext from "../context/Context";
import {
  HEADER_HEIGHT_EXPANDED,
  HEADER_HEIGHT_NARROWED,
  PROFILE_PICTURE_URI,
} from "../../constants";
import {
  addDoc,
  collection,
  query,
  onSnapshot,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import Tweet from "../components/Tweet/Tweet";
import { auth, db } from "../../firebase";
import colors from "../config/colors";
import useGetSingleCustomerInfo from "../hooks/useGetSingleCustomerInfo";
import NewTweetButton from "../components/NewTweetButton";
import { FontAwesome } from "@expo/vector-icons";
import {
  GeneralPracticeBadges,
  SpecialistBadges,
  ClinicBadges,
} from "../components/Badges";
import CallButton from "../components/CallButton";

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
import VideoScreen from "./VideoScreen";
import GettingCallScreen from "./GettingCallScreen";
import { useNavigation } from "@react-navigation/native";

const HEADER_HEIGHT = 300;

const peerConstraints = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
};

function ProfileInfoListScreen({ route }) {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [gettingCall, setGettingCall] = useState(false);
  const connecting = useRef(false);
  let pc = useRef(false);

  const userB = route.params.ProfileUser;
  const upToDateUserBData = useGetSingleCustomerInfo(userB.uid);
  const { userData } = useContext(GlobalContext);
  var username = upToDateUserBData?.email.substr(
    0,
    upToDateUserBData?.email.indexOf("@")
  );

  const navigation = useNavigation();

  // Global state

  useEffect(() => {
    const cRef = doc(db, "meet", userB.uid);
    const subscribe = onSnapshot(cRef, (snapshot) => {
      const data = snapshot.data();

      // On answer start the call
      if (pc.current && !pc.current.remoteDescription && data && data.answer) {
        pc.current.setRemoteDescription(new RTCSessionDescription(data.answer));
      }

      // if there is offer for chatId set the getting call flag
      if (data && data.offer && !connecting.current) {
        setGettingCall(true);
      }
    });

    // On Delete of collection call hangup
    // The other side has clicked on hangup
    const qdelete = query(collection(cRef, "callee"));
    const subscribeDelete = onSnapshot(qdelete, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type == "removed") {
          hangup();
        }
      });
    });
    return () => {
      subscribe();
      subscribeDelete();
    };
  }, []);

  function CallUser() {
    navigation.navigate("Calling", { userB_uid: userB.uid });
  }

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
    console.log("calling");
    console.log(userB.uid);
    connecting.current = true;

    // setUp webrtc
    await setupWebrtc();

    // Document for the call
    const cRef = doc(db, "meet", userB.uid);
    // await setDoc(cRef, {});

    // Exchange the ICE candidates between the caller and callee
    collectIceCandidates(cRef, "caller", "callee");

    if (pc.current) {
      // Create the offer for the call
      // Store the offer under the document
      console.log("create");
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
    console.log("Joining the call");
    connecting.current = true;
    setGettingCall(false);

    //const cRef = firestore().collection("meet").doc("chatId")
    const cRef = doc(db, "meet", userB.uid);
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
    console.log("hangup");
    setGettingCall(false);
    connecting.current = false;
    streamCleanUp();
    firebaseCleanUp();
    if (pc.current) {
      pc.current.close();
    }
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
    console.log("streamCleanUp");
    if (localStream) {
      localStream.getTracks().forEach((t) => t.stop());
      localStream.release();
    }
    setLocalStream(null);
    setRemoteStream(null);
  }

  async function firebaseCleanUp() {
    console.log("firebaseCleanUp");
    const cRef = doc(db, "meet", userB.uid);
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
  }

  async function collectIceCandidates(cRef, localName, remoteName) {
    console.log("localName", localName);
    const candidateCollection = collection(db, "meet", userB.uid, localName);

    if (pc.current) {
      // on new ICE candidate add it to firestore
      console.log("test");
      pc.current.onicecandidate = (event) => {
        event.candidate &&
          addDoc(candidateCollection, event.candidate.toJSON());
      };
    }

    // Get the ICE candidate added to firestore and update the local PC
    q = query(collection(cRef, remoteName));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type == "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.current.addIceCandidate(candidate);
        }
      });
    });
  }

  function Header() {
    return (
      <ScrollView
        style={[
          styles.container,
          {
            paddingHorizontal: 20,
          },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <Image
            source={{
              uri: upToDateUserBData?.photoURL,
            }}
            style={{
              width: 75,
              height: 75,
              borderRadius: 40,
              borderWidth: 4,
              borderColor: "black",
              marginTop: 5,
              // transform: [
              //   {
              //     scale: scrollY.interpolate({
              //       inputRange: [0, HEADER_HEIGHT_EXPANDED],
              //       outputRange: [1, 0.6],
              //       extrapolate: "clamp",
              //     }),
              //   },
              //   {
              //     translateY: scrollY.interpolate({
              //       inputRange: [0, HEADER_HEIGHT_EXPANDED],
              //       outputRange: [0, 16],
              //       extrapolate: "clamp",
              //     }),
              //   },
              // ],
            }}
          />
          {userData.uid == userB.uid ? (
            <ProfileEdiButton userBData={userB}></ProfileEdiButton>
          ) : (
            <FollowButton userBData={userB}></FollowButton>
          )}
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Text
            style={[
              styles.text,
              {
                fontSize: 20,
                fontWeight: "bold",
              },
            ]}
          >
            {upToDateUserBData?.displayName}
          </Text>
          <GeneralPracticeBadges></GeneralPracticeBadges>
          <ClinicBadges></ClinicBadges>
          {userData.uid != userB.uid && (
            <CallButton
              iconName="phone-alt"
              backgroundColor="gray"
              onPress={CallUser}
            ></CallButton>
          )}
        </View>
        <Text
          style={[
            styles.text,
            {
              fontSize: 15,
              color: "gray",
              marginBottom: 3,
            },
          ]}
        >
          @{username}
        </Text>
        {upToDateUserBData && (
          <Text style={[styles.text, { fontSize: 14 }]}>
            {upToDateUserBData.bio}
          </Text>
        )}
        {/* Profile stats */}
        <View
          style={{
            flexDirection: "row",
            marginBottom: 15,
            marginTop: 10,
          }}
        >
          <Following userBData={userB}></Following>
          <Followers userBData={userB}></Followers>
        </View>
      </ScrollView>
    );
  }

  const renderItem = React.useCallback(({ index }) => {
    return (
      <View style={[styles.box, index % 2 === 0 ? styles.boxB : styles.boxA]}>
        <AppText>test</AppText>
      </View>
    );
  }, []);

  const [parsedPosts, setParsedPosts] = useState([]);
  const { allUsersThatUserFollowing } = useContext(GlobalContext);

  useEffect(() => {
    const postsQuery = query(collection(db, "posts"));
    const allUsersThatUserFollowingAndSelf = [userB.uid];
    const unsubscribe = onSnapshot(postsQuery, (querySnapshot) => {
      // querySnapshot.docs.map((doc) => console.log("doc", doc.data()));
      const parsedPosts = querySnapshot.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .filter((doc) =>
          allUsersThatUserFollowingAndSelf.includes(doc.user.uid)
        )
        .sort(
          (a, b) =>
            b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime()
        );
      setParsedPosts(parsedPosts);
    });
    return () => unsubscribe();
  }, [allUsersThatUserFollowing]);

  const newTweets = [...parsedPosts].sort(
    (a, b) => b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime()
  );

  // Displays the gettingCall Component
  if (gettingCall) {
    console.log("gettingCall");
    return <GettingCallScreen hangup={hangup} join={join}></GettingCallScreen>;
  }

  // Displays local stream on calling
  // Displays both local and remote stream once call is connected
  if (localStream) {
    console.log("localStream");
    return (
      <VideoScreen
        hangup={hangup}
        localStream={localStream}
        remoteStream={remoteStream}
      ></VideoScreen>
    );
  }

  return (
    <View style={styles.container}>
      {/* <BackButton /> */}
      <Tabs.Container
        renderHeader={Header}
        headerHeight={HEADER_HEIGHT} // optional
      >
        <Tabs.Tab name="Posts" label="Posts">
          <Tabs.FlatList
            data={newTweets}
            renderItem={({ item }) => <Tweet tweet={item} />}
            keyExtractor={(item) => item.id}
          />
        </Tabs.Tab>
        <Tabs.Tab name="Reviews" label="Reviews">
          <Tabs.FlatList
            data={newTweets}
            renderItem={({ item }) => <Tweet tweet={item} />}
            keyExtractor={(item) => item.id}
          />
        </Tabs.Tab>
      </Tabs.Container>
      <NewTweetButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: colors.black,
  },
  box: {
    height: 250,
    width: "100%",
  },
  boxA: {
    backgroundColor: "red",
  },
  boxB: {
    backgroundColor: "green",
  },
  header: {
    height: HEADER_HEIGHT,
    width: "100%",
    backgroundColor: "#2196f3",
  },
});

export default ProfileInfoListScreen;
