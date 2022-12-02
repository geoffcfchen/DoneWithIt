import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

const customersQuery = query(collection(db, "customers"));

export default function useGetCustomers(userData) {
  // if userData is client, then return all doctors
  // if userData is doctor, then return all doctors and clients except themselves

  const [parsedCustomers, setParsedCustomers] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(customersQuery, (querySnapshot) => {
      // querySnapshot.docs.map((doc) => console.log("doc", doc.data()));

      let parsedCustomers;
      if (userData.role.label == "Client") {
        parsedCustomers = querySnapshot.docs
          .map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
          .filter((item) => item.role.label == "Doctor");
      } else {
        parsedCustomers = querySnapshot.docs
          .map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
          .filter((item) => item.uid != userData.uid);
      }
      setParsedCustomers(parsedCustomers);
    });
    return () => unsubscribe();
  }, []);
  return parsedCustomers;
  // }
}
