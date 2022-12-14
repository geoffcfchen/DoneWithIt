import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import Card from "./Card";
import { useNavigation } from "@react-navigation/native";
import routes from "../navigation/routes";

function ListingCard({ questions }) {
  const navigation = useNavigation();
  return (
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
          onPress={() => navigation.navigate(routes.LISTING_DETAILS, { item })}
        />
      )}
    ></FlatList>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.danger,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default ListingCard;
