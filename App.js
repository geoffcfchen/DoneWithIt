import * as React from "react";
import { View, Text, Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

import Screen from "./app/components/Screen";

function Link() {
  const navigation = useNavigation();
  return (
    <Button
      title="Click"
      onPress={() => navigation.navigate("TweetDetails")}
    ></Button>
  );
}

function Tweets({ navigation }) {
  return (
    <Screen>
      <Text>Tweets</Text>
      <Button
        title="View Tweet"
        onPress={() => navigation.navigate("TweetDetails", { id: "1" })}
      ></Button>
    </Screen>
  );
}

function TweetDetails({ route }) {
  return (
    <Screen>
      <Text>Tweet Details {route.params.id}</Text>
    </Screen>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "dodgerblue" },
          headerTintColor: "white",
        }}
      >
        <Stack.Screen name="Tweets" component={Tweets}></Stack.Screen>
        <Stack.Screen
          name="TweetDetails"
          component={TweetDetails}
          options={{ headerStyle: { backgroundColor: "tomato" } }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
