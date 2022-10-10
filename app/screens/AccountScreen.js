import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useContext } from "react";

import ListItem from "../components/lists/ListItem";
import Screen from "../components/Screen";
import colors from "../config/colors";
import Icon from "../components/Icon";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import useAuth from "../auth/useAuth";
import { auth } from "../../firebase";
import AuthContext from "../auth/context";

const menuItems = [
  {
    title: "My Questions",
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
    targetScreen: "Messages",
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

function AccountScreen({ navigation }) {
  const { user, setUser } = useContext(AuthContext);
  // const { user, logOut } = useAuth();
  const { currentUser } = auth;

  const signOutUser = () => {
    auth.signOut().then(() => {
      setUser(null);
    });
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={user.name}
          subTitle={user.email}
          image={{ uri: currentUser.photoURL }}
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
              onPress={() => navigation.navigate(item.targetScreen)}
            ></ListItem>
          )}
        ></FlatList>
      </View>
      <ListItem
        title="Log out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d"></Icon>}
        onPress={signOutUser}
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
