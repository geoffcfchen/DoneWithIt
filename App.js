import * as React from "react";
import { View, Text, Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Screen from "./app/components/Screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import AuthNavigator from "./app/navigation/AuthNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";

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

function Account({ navigation }) {
  return (
    <Screen>
      <Text>Account</Text>
    </Screen>
  );
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <AppNavigator></AppNavigator>
      {/* <Stack.Navigator>
        <Stack.Screen
          name="AuthNavigator"
          component={AuthNavigator}
        ></Stack.Screen>
      </Stack.Navigator>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveBackgroundColor: "tomato",
          tabBarActiveTintColor: "white",
          tabBarInactiveBackgroundColor: "#eee",
          tabBarInactiveTintColor: "black",
        }}
      >
        <Tab.Screen
          name="Feed"
          component={TweetAll}
          options={{
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <MaterialCommunityIcons
                name="home"
                size={size}
                color={color}
              ></MaterialCommunityIcons>
            ),
          }}
        ></Tab.Screen>
        <Tab.Screen name="Account" component={Account}></Tab.Screen>
      </Tab.Navigator> */}
    </NavigationContainer>
  );
}
