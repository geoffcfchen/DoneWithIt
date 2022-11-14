import React, { useCallback, useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import "expo-dev-menu";
import { onAuthStateChanged } from "firebase/auth";
import * as SplashScreen from "expo-splash-screen";
import { LogBox } from "react-native";

import { auth, db } from "./firebase";
import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import OfflineNotice from "./app/components/OfflineNotice";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import { navigationRef } from "./app/navigation/rootNavigation";
import logger from "./app/utility/logger";
import ContextWrapper from "./app/context/ContextWrapper";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import GlobalContext from "./app/context/Context";
import ProfileScreen from "./app/screens/ProfileScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import colors from "./app/config/colors";
import NewTweetScreen from "./app/screens/NewTweetScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";

LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
  "Non-serializable values were found in the navigation state",
]);

logger.start();

// https://docs.expo.dev/versions/latest/sdk/splash-screen/
SplashScreen.preventAutoHideAsync();

function App() {
  // const { user } = useContext(AuthContext);
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(true);

  useEffect(() => {
    async function prepare() {
      try {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            setUser(user);
          }
        });
      } catch (error) {
        logger.log("Error loading app", error);
      } finally {
        setIsReady(true);
      }
    }
    prepare();
    // console.log("user in first useEffect", user);
  }, []);

  const onNavigationContainerReady = useCallback(async () => {
    if (isReady) await SplashScreen.hideAsync();
  }, [isReady]);

  if (!isReady) return null;

  const Stack = createNativeStackNavigator();

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <OfflineNotice></OfflineNotice>
      <NavigationContainer
        ref={navigationRef}
        theme={navigationTheme}
        onReady={onNavigationContainerReady}
      >
        {!user ? (
          <AuthNavigator></AuthNavigator>
        ) : (
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: colors.foreground,
                shadowOpacity: 0,
                elevation: 0,
              },
              headerTintColor: colors.white,
              headerShown: false,
            }}
          >
            {!user.displayName && (
              <Stack.Screen
                name="profile"
                component={ProfileScreen}
                options={{ headerShown: false }}
              ></Stack.Screen>
            )}
            <Stack.Screen name="root" component={RootNavigator}></Stack.Screen>
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

function RootNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="App" component={AppNavigator} />
      <Stack.Screen name="NewTweet" component={NewTweetScreen} />
    </Stack.Navigator>
  );
}

function Main() {
  return (
    <ContextWrapper>
      <App></App>
    </ContextWrapper>
  );
}

export default Main;
