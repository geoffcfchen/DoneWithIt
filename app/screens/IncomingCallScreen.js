import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { auth, db } from "../../firebase";
import { useNavigation } from "@react-navigation/native";

export default function IncomingCallScreen() {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [gettingCall, setGettingCall] = useState(false);
  const connecting = useRef(false);
  let pc = useRef(false);

  console.log(auth.currentUser.uid);

  const navigation = useNavigation();

  //   useEffect(() => {
  //     const cRef = doc(db, "meet", userB.uid);
  //     const subscribe = onSnapshot(cRef, (snapshot) => {
  //       const data = snapshot.data();

  //       // On answer start the call
  //       if (pc.current && !pc.current.remoteDescription && data && data.answer) {
  //         pc.current.setRemoteDescription(new RTCSessionDescription(data.answer));
  //       }

  //       // if there is offer for chatId set the getting call flag
  //       if (data && data.offer && !connecting.current) {
  //         setGettingCall(true);
  //       }
  //     });

  //     // On Delete of collection call hangup
  //     // The other side has clicked on hangup
  //     const qdelete = query(collection(cRef, "callee"));
  //     const subscribeDelete = onSnapshot(qdelete, (snapshot) => {
  //       snapshot.docChanges().forEach((change) => {
  //         if (change.type == "removed") {
  //           hangup();
  //         }
  //       });
  //     });
  //     return () => {
  //       subscribe();
  //       subscribeDelete();
  //     };
  //   }, []);
  return (
    <View>
      <Text>IncomingCallScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
