import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";

import ListItemMessages from "../components/lists/ListItemMessages";
import GlobalContext from "../context/Context";
import { db } from "../../firebase";
import useContacts from "../hooks/useHooks";
import AppText from "../components/AppText";

export default function Contacts() {
  const contacts = useContacts();
  // const contacts = [{ contactName: "Kate Bell", email: "kate-bell@mac.com" }];
  const route = useRoute();
  const image = route.params && route.params.image;
  console.log("contacts", contacts);
  // console.log("route", route);
  // console.log("image", image);
  return (
    <FlatList
      style={{ flex: 1, padding: 10 }}
      data={contacts}
      keyExtractor={(_, i) => i}
      renderItem={({ item }) => (
        // <AppText>{item.contactName}</AppText>
        <ContactPreview contact={item} image={image}></ContactPreview>
      )}
    ></FlatList>
  );
}

function ContactPreview({ contact, image }) {
  const { unfilteredRooms, rooms } = useContext(GlobalContext);
  const [user, setUser] = useState(contact);
  // console.log("contact.email", contact.email);
  // console.log("user", user);
  useEffect(() => {
    const q = query(
      collection(db, "customers"),
      where("email", "==", contact.email)
    );
    // console.log("q", q);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      // console.log("snapshot length", snapshot.docs.length);
      // snapshot.docs.map((doc) => console.log("doc", doc.data()));
      if (snapshot.docs.length) {
        const userDoc = snapshot.docs[0].data();
        // console.log("userDoc", userDoc);
        setUser((prevUser) => ({ ...prevUser, userDoc }));
      }
    });
    return () => unsubscribe();
  }, []);
  console.log("contact.email", contact.email);
  console.log(
    "unfilteredRooms",
    unfilteredRooms.find((room) =>
      room.participantsArray.includes(contact.email)
    )
  );
  console.log("user", user);
  return (
    <ListItemMessages
      style={{ marginTop: 7 }}
      type="contacts"
      user={user}
      image={image}
      room={unfilteredRooms.find((room) =>
        room.participantsArray.includes(contact.email)
      )}
    ></ListItemMessages>
  );
}
