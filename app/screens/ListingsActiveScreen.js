import React, { useState, useEffect, useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import Card from "../components/Card";
import colors from "../config/colors";
import listingsApi from "../api/listing";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import useApi from "../hooks/useApi";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase";
import GlobalContext from "../context/Context";
import AuthContext from "../auth/context";
import moment from "moment";
import NewQuestionButton from "../components/NewQuestionButton";
import { useNavigation } from "@react-navigation/native";

function ListingsActiveScreen({ questions }) {
  const navigation = useNavigation();
  const { userData } = useContext(GlobalContext);
  return (
    <View style={styles.screen}>
      <FlatList
        data={questions}
        keyExtractor={(question) => question.lastMessage._id.toString()}
        renderItem={({ item }) => (
          <Card
            userB={item.userB}
            title={item.lastMessage.title}
            subTitle={item.lastMessage.description}
            imageUrl={item.lastMessage.image}
            datetime={item.datetime}
            slot={item.slot}
            onPress={() =>
              navigation.navigate(routes.LISTING_DETAILS, { item })
            }
          />
        )}
      />
      {userData.role.label == "Client" && (
        <NewQuestionButton></NewQuestionButton>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: 2,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: colors.light,
    flex: 1,
  },
});

export default ListingsActiveScreen;
