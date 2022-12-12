import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

export default function useGetSingleCustomerInfo(uid) {
  console.log(uid);
  // if userData is client, then return all doctors
  // if userData is doctor, then return all doctors and clients except themselves
  const customersQuery = query(
    collection(db, "customers"),
    where("uid", "==", uid)
  );

  const [parsedCustomers, setParsedCustomers] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(customersQuery, (querySnapshot) => {
      // querySnapshot.docs.map((doc) => console.log("doc", doc.data()));
      const parsedCustomers = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setParsedCustomers(parsedCustomers);
    });
    return () => unsubscribe();
  }, []);
  return parsedCustomers;
  // }
}
