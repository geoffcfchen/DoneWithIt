import React from "react";
import { Text, View, StyleSheet, FlatList, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ListItem from "../components/lists/ListItem";
import Screen from "../components/Screen";
import colors from "../config/colors";
import Icon from "../components/Icon";
import ListItemDeleteAction from "../components/lists/ListItemDeleteAction";
import ListItemSeparator from "../components/lists/ListItemSeparator";

const menuItems = [
  {
    title: "My Listings",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
  },
  {
    title: "My Messages",
    icon: {
      name: "email",
      backgroundColor: colors.secondary,
    },
  },
];

const initialMessages = [
  {
    id: 1,
    title: "T1",
    description: "D1",
    image: require("../assets/mosh.jpg"),
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
  },
  {
    id: 2,
    title: "T2",
    description: "D2",
    image: require("../assets/mosh.jpg"),
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
  },
];

function AccountScreen(props) {
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title="Mosh"
          subTitle="gcfchen@gmail.com"
          image={require("../assets/mosh.jpg")}
        ></ListItem>
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                ></Icon>
              }
            ></ListItem>
          )}
        ></FlatList>
      </View>
      <ListItem
        title="Log out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d"></Icon>}
      ></ListItem>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.light },
  container: {
    marginVertical: 20,
  },
});

export default AccountScreen;
