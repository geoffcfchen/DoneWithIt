import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { auth, db } from "../../firebase";
import { useNavigation } from "@react-navigation/native";

export default function IncomingCallScreen() {
  //   const [localStream, setLocalStream] = useState(null);
  //   const [remoteStream, setRemoteStream] = useState(null);
  //   const [gettingCall, setGettingCall] = useState(false);
  //   const connecting = useRef(false);
  //   let pc = useRef(false);

  //   console.log(auth.currentUser.uid);

  //   const navigation = useNavigation();

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

  //   const join = async () => {
  //     console.log("Joining the call");
  //     connecting.current = true;
  //     setGettingCall(false);

  //     //const cRef = firestore().collection("meet").doc("chatId")
  //     const cRef = doc(db, "meet", userB.uid);
  //     // const offer = (await cRef.get()).data()?.offer
  //     const offer = (await getDoc(cRef)).data()?.offer;

  //     if (offer) {
  //       // Setup Webrtc
  //       await setupWebrtc();

  //       // Exchange the ICE candidates
  //       // Check the parameters, Its reversed. Since the joining part is callee
  //       collectIceCandidates(cRef, "callee", "caller");

  //       if (pc.current) {
  //         pc.current.setRemoteDescription(new RTCSessionDescription(offer));

  //         // Create the answer for the call
  //         // Updates the document with answer
  //         const answer = await pc.current.createAnswer();
  //         pc.current.setLocalDescription(answer);
  //         const cWithAnswer = {
  //           answer: {
  //             type: answer.type,
  //             sdp: answer.sdp,
  //           },
  //         };
  //         // cRef.update(cWithAnswer)
  //         await updateDoc(cRef, cWithAnswer);
  //       }
  //     }
  //   };

  //   /**
  //    * For disconnectign the call, close the connection, release the stream,
  //    * and delete the document for the call
  //    **/

  //   async function hangup() {
  //     console.log("hangup");
  //     setGettingCall(false);
  //     connecting.current = false;
  //     streamCleanUp();
  //     firebaseCleanUp();
  //     if (pc.current) {
  //       pc.current.close();
  //     }
  //   }

  //   // Helper function

  //   async function getStream() {
  //     let isVoiceOnly = false;
  //     let mediaConstraints = {
  //       audio: true,
  //       video: {
  //         frameRate: 30,
  //         facingMode: "user",
  //       },
  //     };
  //     try {
  //       const mediaStream = await mediaDevices.getUserMedia(mediaConstraints);

  //       if (isVoiceOnly) {
  //         let videoTrack = mediaStream.getVideoTracks()[0];
  //         videoTrack.enabled = false;
  //       }

  //       return mediaStream;
  //     } catch (err) {
  //       console.log("err", err);
  //     }
  //   }

  //   async function streamCleanUp() {
  //     console.log("streamCleanUp");
  //     if (localStream) {
  //       localStream.getTracks().forEach((t) => t.stop());
  //       localStream.release();
  //     }
  //     setLocalStream(null);
  //     setRemoteStream(null);
  //   }

  //   async function firebaseCleanUp() {
  //     console.log("firebaseCleanUp");
  //     const cRef = doc(db, "meet", userB.uid);
  //     if (cRef) {
  //       const qee = query(collection(cRef, "callee"));
  //       const calleeCandidate = await getDocs(qee);
  //       calleeCandidate.forEach(async (candidate) => {
  //         await deleteDoc(candidate.ref);
  //       });
  //       const qer = query(collection(cRef, "caller"));
  //       const callerCandidate = await getDocs(qer);
  //       callerCandidate.forEach(async (candidate) => {
  //         await deleteDoc(candidate.ref);
  //       });
  //       deleteDoc(cRef);
  //     }
  //   }

  //   async function collectIceCandidates(cRef, localName, remoteName) {
  //     console.log("localName", localName);
  //     const candidateCollection = collection(db, "meet", userB.uid, localName);

  //     if (pc.current) {
  //       // on new ICE candidate add it to firestore
  //       console.log("test");
  //       pc.current.onicecandidate = (event) => {
  //         event.candidate &&
  //           addDoc(candidateCollection, event.candidate.toJSON());
  //       };
  //     }

  //     // Get the ICE candidate added to firestore and update the local PC
  //     q = query(collection(cRef, remoteName));
  //     const unsubscribe = onSnapshot(q, (snapshot) => {
  //       snapshot.docChanges().forEach((change) => {
  //         if (change.type == "added") {
  //           const candidate = new RTCIceCandidate(change.doc.data());
  //           pc.current.addIceCandidate(candidate);
  //         }
  //       });
  //     });
  //   }

  //   // Displays the gettingCall Component
  //   if (gettingCall) {
  //     console.log("gettingCall");
  //     return <GettingCallScreen hangup={hangup} join={join}></GettingCallScreen>;
  //   }

  //   // Displays local stream on calling
  //   // Displays both local and remote stream once call is connected
  //   if (localStream) {
  //     console.log("localStream");
  //     return (
  //       <VideoScreen
  //         hangup={hangup}
  //         localStream={localStream}
  //         remoteStream={remoteStream}
  //       ></VideoScreen>
  //     );
  //   }

  return (
    <View>
      <Text>IncomingCallScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
