import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { auth, db } from "../../firebase";
import ListItem from "../components/lists/ListItem";
import ListItemDeleteAction from "../components/lists/ListItemDeleteAction";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import {
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import Screen from "../components/Screen";
import logger from "../utility/logger";

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

function MessagesScreen(props) {
  const { currentUser } = auth;
  // const { rooms, setRooms, setUnfilteredRooms } = useContext(GlobalContext);
  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);
  console.log(currentUser);
  console.log("collection", collection(db, "rooms"));
  console.log(
    "where",
    where("participantsArray", "array-contains", currentUser.email)
  );
  const chatsQuery = query(
    collection(db, "rooms"),
    where("participantsArray", "array-contains", currentUser.email)
  );
  console.log("chatsQuery", chatsQuery);

  // async function getCities(db) {
  //   const citiesCol = collection(db, "rooms");
  //   const citySnapshot = await getDocs(citiesCol);
  //   // console.log("citySnapshot", citySnapshot);
  //   const cityList = citySnapshot.docs.length;
  //   // .map((doc) => doc.data());
  //   return cityList;
  // }
  // const test = getCities(db);
  // console.log("test", test);

  useEffect(() => {
    const unsubscribe = onSnapshot(chatsQuery, (querySnapshot) => {
      const parsedChats = querySnapshot.docs
        //
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
          userB: doc
            .data()
            .participants.find((p) => p.email !== currentUser.email),
        }));
      console.log("parsedChats", parsedChats);
      // setUnfilteredRooms(parsedChats);
      // setRooms(parsedChats.filter((doc) => doc.lastMessage));
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = (message) => {
    setMessages(messages.filter((m) => m.id !== message.id));
  };
  return (
    <Screen>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.description}
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
      ></FlatList>
    </Screen>
  );
}

const styles = StyleSheet.create({});

export default MessagesScreen;
