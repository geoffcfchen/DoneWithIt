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
import { useNavigation, useRoute } from "@react-navigation/native";

const HEADER_HEIGHT = 300;

function ProfileInfoListScreen({ create }) {
  const { userData, setCalleeB } = useContext(GlobalContext);

  const route = useRoute();
  const userB = route.params.ProfileUser;

  const upToDateUserBData = useGetSingleCustomerInfo(userB.uid);

  var username = upToDateUserBData?.email.substr(
    0,
    upToDateUserBData?.email.indexOf("@")
  );

  useEffect(() => {
    setCalleeB(userB);
  }, []);

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
              onPress={create}
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

  // // Displays the gettingCall Component
  // if (gettingCall) {
  //   console.log("gettingCall");
  //   return <GettingCallScreen hangup={hangup} join={join}></GettingCallScreen>;
  // }

  // // Displays local stream on calling
  // // Displays both local and remote stream once call is connected
  // if (localStream) {
  //   console.log("localStream");
  //   return (
  //     <VideoScreen
  //       hangup={hangup}
  //       localStream={localStream}
  //       remoteStream={remoteStream}
  //     ></VideoScreen>
  //   );
  // }

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
