import { async } from "@firebase/util";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  FlatList,
  Text,
  Pressable,
  TouchableHighlight,
  Button,
} from "react-native";
// import { loadStripe } from "@stripe/stripe-js";

import { db } from "../../firebase";
import GlobalContext from "../context/Context";

// const productsQuery = query(
//   collection(db, "products"),
//   where("active", "==", true)
// );

function BalanceScreen(props) {
  const [products, setProducts] = useState([]);
  const [productsPrice, setProductsPrice] = useState([]);
  const { userData } = useContext(GlobalContext);

  useEffect(() => {
    const q = query(collection(db, "products"), where("active", "==", true));
    const unsub = onSnapshot(q, async (querySnapshot) => {
      const products = {};
      for (const productDoc of querySnapshot.docs) {
        products[productDoc.id] = productDoc.data();
        const priceSnap = await getDocs(collection(productDoc.ref, "prices"));
        for (const price of priceSnap.docs) {
          products[productDoc.id].price = {
            priceId: price.id,
            priceData: price.data(),
          };
        }
      }
      const productsPrice = Object.entries(products).map(
        ([productId, productData]) => {
          // console.log(productId, productData);
          return {
            productId: productId,
            productData: productData,
          };
        }
      );
      setProductsPrice(productsPrice);
    });
    return () => unsub();
  }, []);

  //   useEffect(() => {

  //     setProductsPrice(productPrice);
  //   }, []);

  const loadCheckout = async (priceId) => {
    const docRef = await addDoc(
      collection(db, `customers/${userData.uid}/checkout_sessions`),
      {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );

    onSnapshot(docRef, async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        // Show an error to your customer and
        // inspect your Cloud Function logs in the Firebase console.
        alert(`An error occured: ${error.message}`);
      }
      if (sessionId) {
        // We have a Stripe Checkout URL, let's redirect.
        // window.location.assign(url);
        const stripe = await loadStripe(
          "pk_test_51Lhf4GDsOD7fAAq8BAQLfXxnP69pNkOgwcX8CbYx5YEsqzQWHEVFbKoAIjetsXCyQzq46U73S4fEQBOeJLo6inea00vzpGOQet"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  const Item = ({ title, priceId }) => (
    <View style={[styles.container, { flexDirection: "row" }]}>
      <Text style={styles.title}>{title}</Text>
      <Button title="Subscribe" onPress={() => loadCheckout(priceId)}></Button>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item
      title={item.productData.name}
      priceId={item.productData.price.priceId}
    />
  );
  //   const DATA = [products];

  //   JSON.stringify(products);
  return (
    <View>
      <FlatList
        data={productsPrice}
        renderItem={renderItem}
        keyExtractor={(item) => item.productId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default BalanceScreen;
