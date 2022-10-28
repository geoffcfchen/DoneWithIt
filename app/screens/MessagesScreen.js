import React, { useState, useEffect, useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { auth, db } from "../../firebase";
import ListItem from "../components/lists/ListItem";
import ListItemDeleteAction from "../components/lists/ListItemDeleteAction";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import GlobalContext from "../context/Context";
import Screen from "../components/Screen";
import logger from "../utility/logger";
import ListItemMessages from "../components/lists/ListItemMessages";
import ContactsFloatingIcon from "../components/ContactsFloatingIcon";
import useContacts from "../hooks/useHooks";
import AppText from "../components/AppText";
import AuthContext from "../auth/context";

const initialMessages = [
  {
    id: 1,
    title: "Geoff Chen",
    description: "Hey! how are you doing?",
    image: require("../assets/mosh.jpg"),
  },
  {
    id: 2,
    title: "Chih-Fan Chen",
    description: "You have a great day!",
    image: require("../assets/mosh.jpg"),
  },
];

export default function MessagesScreen() {
  const { user } = useContext(AuthContext);
  const { rooms, setRooms, setUnfilteredRooms } = useContext(GlobalContext);

  const [messages, setMessages] = useState(initialMessages);
  const contacts = useContacts();
  const [refreshing, setRefreshing] = useState(false);
  const chatsQuery = query(
    collection(db, "rooms"),
    where("participantsArray", "array-contains", user.email)
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(chatsQuery, (querySnapshot) => {
      // querySnapshot.docs.map((doc) => console.log("doc", doc.data()));
      const parsedChats = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        userB: doc.data().participants.find((p) => p.email !== user.email),
      }));

      // console.log("parsedChats", parsedChats);
      setUnfilteredRooms(parsedChats);
      setRooms(
        parsedChats
          .filter((doc) => doc.lastMessage)
          .sort(
            (a, b) =>
              b.lastMessage.createdAt.toDate().getTime() -
              a.lastMessage.createdAt.toDate().getTime()
          )
      );
    });
    return () => unsubscribe();
  }, []);

  function getUserB(user, contacts) {
    const userContact = contacts.find((c) => c.email === user.email);
    if (userContact && userContact.contactName) {
      return { ...user, contactName: userContact.contactName };
    }
    return user;
  }
  // console.log("rooms", rooms);
  // const handleDelete = (message) => {
  //   setMessages(messages.filter((m) => m.id !== message.id));
  // };

  return (
    <View style={{ flex: 1, padding: 5, paddingRight: 10 }}>
      {rooms.map((room) => (
        <ListItemMessages
          type="chat"
          description={room.lastMessage.text}
          key={room.id}
          room={room}
          time={room.lastMessage.createdAt}
          user={getUserB(room.userB, contacts)}
        ></ListItemMessages>
      ))}
      <ContactsFloatingIcon></ContactsFloatingIcon>
      {/* <FlatList
        data={rooms}
        keyExtractor={(room) => room.id.toString()}
        renderItem={({ room }) => (
          <ListItem
            title={item.title}
            subTitle={room.lastMessage.text}
            image={item.image}
            onPress={() => logger.log("message selected", item)}
            renderRightActions={() => (
              <ListItemDeleteAction
                onPress={() => handleDelete(item)}
              ></ListItemDeleteAction>
            )}
          ></ListItem>
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          setMessages([
            {
              id: 2,
              title: "T2",
              description: "D2",
              image: require("../assets/mosh.jpg"),
            },
          ]);
        }}
      ></FlatList> */}
    </View>
  );
}

const styles = StyleSheet.create({});
