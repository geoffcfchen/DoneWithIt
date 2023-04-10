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
import { collection, onSnapshot, query } from "firebase/firestore";
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
import Video from "./Video";

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
  const connecting = useRef(false);
  let pc = useRef(false);

  const userB = route.params.ProfileUser;
  const upToDateUserBData = useGetSingleCustomerInfo(userB.uid);
  const { userData } = useContext(GlobalContext);
  var username = upToDateUserBData?.email.substr(
    0,
    upToDateUserBData?.email.indexOf("@")
  );

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
  }

  /**
   * For disconnectign the call, close the connection, release the stream,
   * and delete the document for the call
   **/

  async function hangup() {
    console.log("hangup");
    // setGettingCall(false);
    connecting.current = false;
    // streamCleanUp();
    // firebaseCleanUp();
    // if (pc.current) {
    //   pc.current.close();
    // }
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
          <CallButton
            iconName="phone-alt"
            backgroundColor="gray"
            onPress={create}
          ></CallButton>
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

  // Displays local stream on calling
  // Displays both local and remote stream once call is connected
  if (localStream) {
    console.log("localStream");
    return (
      <Video
        hangup={hangup}
        localStream={localStream}
        remoteStream={remoteStream}
      ></Video>
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
