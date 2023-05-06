import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  FlatList,
  Text,
  Button,
} from "react-native";
import { useStripe } from "@stripe/stripe-react-native";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import GlobalContext from "../context/Context";
import { getFunctions, httpsCallable } from "@firebase/functions";

function BalanceScreen(props) {
  const { userData } = useContext(GlobalContext);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [productsPrice, setProductsPrice] = useState([]);

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

  async function loadCheckout(priceId) {
    const functions = getFunctions();
    const createPaymentIntent = httpsCallable(functions, "createPaymentIntent");

    try {
      const {
        data: { clientSecret },
      } = await createPaymentIntent({ priceId });

      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        customFlow: true,
        merchantDisplayName: "Your Merchant Name",
        style: "alwaysDark",
      });

      if (error) {
        console.log(error.message);
      } else {
        const { error: presentError } = await presentPaymentSheet();

        if (presentError) {
          console.log(presentError.message);
        } else {
          console.log("Payment successful!");
        }
      }
    } catch (error) {
      console.error("Error calling createPaymentIntent:", error);
    }
  }

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
