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
  // const contacts = useContacts();
  const { userData } = useContext(GlobalContext);
  const [contacts, setContacts] = useState([]);
  const customersRef = collection(db, "customers");
  useEffect(() => {
    const unsubscribe = onSnapshot(customersRef, (querySnapshot) => {
      const customers = querySnapshot.docs
        .map((doc) => {
          const customer = doc.data();
          return {
            ...customer,
          };
        })
        .filter((item) => item.email != userData.email);

      const parsedcustomers = customers.map((item) => {
        return {
          contactName: item.displayName,
          email: item.email,
          photoURL: item.photoURL,
        };
      });

      setContacts(parsedcustomers);
      // setDatesWhitelist(messagesFirestore);
    });
    return () => unsubscribe();
  }, []);
  // const contacts = [{ contactName: "Kate Bell", email: "kate-bell@mac.com" }];
  const route = useRoute();

  const image = route.params && route.params.image;

  return (
    <FlatList
      style={{ flex: 1, padding: 10 }}
      data={contacts}
      keyExtractor={(item) => item.email}
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

  useEffect(() => {
    const q = query(
      collection(db, "customers"),
      where("email", "==", contact.email)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      // snapshot.docs.map((doc) => console.log("doc", doc.data()));
      if (snapshot.docs.length) {
        const userDoc = snapshot.docs[0].data();
        setUser((prevUser) => ({ ...prevUser, userDoc }));
      }
    });
    return () => unsubscribe();
  }, []);

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
