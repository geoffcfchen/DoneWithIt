// @refresh reset
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import { useRoute } from "@react-navigation/native";
import React, { useContext, useState, useEffect, useCallback } from "react";
import {
  onSnapshot,
  doc,
  collection,
  updateDoc,
  setDoc,
  addDoc,
} from "firebase/firestore";
import {
  Actions,
  Bubble,
  GiftedChat,
  InputToolbar,
} from "react-native-gifted-chat";
import { Ionicons } from "@expo/vector-icons";
import ImageView from "react-native-image-viewing";

import { auth, db } from "../../firebase";
import GlobalContext from "../context/Context";
import { pickImage, takeImage } from "../utility/pickImage";
import { uploadImage } from "../utility/uploadImage";
import { askForPermission } from "../utility/askPermission";

const randomID = nanoid();

export default function MessagesDetailsScreen() {
  const [roomHash, setRoomHash] = useState("");
  const [messages, setMessages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [selectedImageView, setSelectedImageView] = useState("");
  const {
    theme: { colors },
  } = useContext(GlobalContext);
  const { currentUser } = auth;
  const route = useRoute();
  const room = route.params.room;
  const selectedImage = route.params.image;
  const userB = route.params.user;
  // console.log("route", route);

  const senderUser = currentUser.photoURL
    ? {
        name: currentUser.displayName,
        _id: currentUser.uid,
        avatar: currentUser.photoURL,
      }
    : { name: currentUser.displayName, _id: currentUser.uid };
  // console.log("senderUser = ", senderUser);

  const roomID = room ? room.id : randomID;
  // console.log("roomID = ", roomID);

  const roomRef = doc(db, "rooms", roomID);
  // console.log("roomRef = ", roomRef);
  const roomMessagesRef = collection(db, "rooms", roomID, "messages");
  // console.log("roomMessageRef = ", roomMessagesRef);
  // if (!room) {
  //   console.log("no room");
  // }

  useEffect(() => {
    (async () => {
      // if there is no conversation
      if (!room) {
        // create currUserData
        const currUserData = {
          displayName: currentUser.displayName,
          email: currentUser.email,
        };
        // put in photoURL in currUserData if curretUser has photoURL
        if (currentUser.photoURL) {
          currUserData.photoURL = currentUser.photoURL;
        }
        // now construct userBdata
        const userBData = {
          displayName: userB.contactName || userB.displayName || "",
          email: userB.email,
        };
        // put in photoURL in userBData if userB has photoURL
        if (userB.photoURL) {
          userBData.photoURL = userB.photoURL;
        }
        // construct the roomData
        const roomData = {
          participants: [currUserData, userBData],
          participantsArray: [currentUser.email, userB.email],
        };
        // construct the roomRef with roomData
        try {
          await setDoc(roomRef, roomData);
        } catch (error) {
          console.log(error);
        }
      }
      const emailHash = `${currentUser.email}:${userB.email}:`;
      setRoomHash(emailHash);
      // not sure what this following line is doing. Let's figure it out later
      if (selectedImage && selectedImage.uri) {
        await sendImage(selectedImage.uri, emailHash);
      }
    })();
  }, []);
  // console.log("selectedImage", selectedImage);
  // console.log("roomHash second", roomHash);

  useEffect(() => {
    const unsubscribe = onSnapshot(roomMessagesRef, (querySnapshot) => {
      console.log(
        "querySnapshot",
        querySnapshot.docChanges().filter(({ type }) => type === "added").length
      );
      const messagesFirestore = querySnapshot
        .docChanges()
        .filter(({ type }) => type === "added")
        .map(({ doc }) => {
          const message = doc.data();
          return { ...message, createdAt: message.createdAt.toDate() };
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      // console.log("messagesFirestore = ", messagesFirestore);
      appendMessages(messagesFirestore);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    (async () => {
      const status = await askForPermission();
      setPermissionStatus(status);
    })();
  }, []);

  const appendMessages = useCallback(
    (messages) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    },
    [messages]
  );

  async function onSend(messages = []) {
    // console.log("message", messages.length);
    const writes = messages.map((m) => addDoc(roomMessagesRef, m));
    console.log("messages inside onsend", messages);
    const lastMessage = messages[messages.length - 1];
    console.log("lastMessage=", lastMessage);
    writes.push(updateDoc(roomRef, { lastMessage }));
    // updateDoc(roomRef, { lastMessage });
    await Promise.all(writes);
  }

  console.log("messages global", messages.length);

  async function sendImage(uri, roomPath) {
    console.log("roomPath", roomPath);
    const { url, fileName } = await uploadImage(
      uri,
      `images/rooms/${roomPath || roomHash}`
    );
    console.log("url", url);
    console.log("fileName", fileName);
    const message = {
      _id: fileName,
      text: "",
      createdAt: new Date(),
      user: senderUser,
      image: url,
    };
    console.log("message in sendImage", message);
    const lastMessage = { ...message, text: "Image" };
    console.log("lastMessage", lastMessage);
    await Promise.all([
      addDoc(roomMessagesRef, message),
      updateDoc(roomRef, { lastMessage }),
    ]);
  }

  async function handlePhotoPicker() {
    const result = await pickImage();
    console.log(result);

    if (!result.cancelled) {
      await sendImage(result.uri);
    }
  }

  return (
    <ImageBackground
      resizeMode="cover"
      source={require("../assets/chatbg.png")}
      style={{ flex: 1 }}
    >
      <GiftedChat
        onSend={onSend}
        messages={messages}
        user={senderUser}
        renderAvatar={null}
        renderActions={(props) => (
          <Actions
            {...props}
            containerStyle={{
              position: "absolute",
              right: 50,
              bottom: 5,
              zIndex: 9999,
            }}
            onPressActionButton={handlePhotoPicker}
            icon={() => (
              <Ionicons
                name="camera"
                size={30}
                color={colors.iconGray}
              ></Ionicons>
            )}
          ></Actions>
        )}
        timeTextStyle={{ right: { color: colors.iconGray } }}
        renderSend={(props) => {
          const { text, messageIDGenerator, user, onSend } = props;
          return (
            <TouchableOpacity
              style={{
                height: 40,
                width: 40,
                borderRadius: 40,
                backgroundColor: colors.primary,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 5,
              }}
              onPress={() => {
                if (text && onSend) {
                  onSend(
                    {
                      text: text.trim(),
                      user,
                      _id: messageIDGenerator,
                    },
                    true
                  );
                }
              }}
            >
              <Ionicons name="send" size={20} color={colors.white}></Ionicons>
            </TouchableOpacity>
          );
        }}
        renderInputToolbar={(props) => (
          <InputToolbar
            {...props}
            containerStyle={{
              marginLeft: 10,
              marginRight: 10,
              marginBottom: 2,
              borderRadius: 20,
              paddingTop: 5,
            }}
          ></InputToolbar>
        )}
        renderBubble={(props) => (
          <Bubble
            {...props}
            textStyle={{ right: { color: colors.text } }}
            wrapperStyle={{
              left: {
                backgroundColor: colors.white,
              },
              right: {
                backgroundColor: colors.tertiary,
              },
            }}
          ></Bubble>
        )}
        renderMessageImage={(props) => {
          return (
            <View style={{ borderRadius: 15, padding: 2 }}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                  setSelectedImageView(props.currentMessage.image);
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{
                    width: 200,
                    height: 200,
                    padding: 6,
                    borderRadius: 15,
                    resizeMode: "cover",
                  }}
                  source={{ uri: props.currentMessage.image }}
                ></Image>
                {selectedImageView ? (
                  <ImageView
                    imageIndex={0}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                    images={[{ uri: selectedImageView }]}
                  ></ImageView>
                ) : null}
              </TouchableOpacity>
            </View>
          );
        }}
      ></GiftedChat>
    </ImageBackground>
  );
}
