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

LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
  "Non-serializable values were found in the navigation state",
]);

logger.start();

// https://docs.expo.dev/versions/latest/sdk/splash-screen/
SplashScreen.preventAutoHideAsync();

function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  // const questionsQuery = query(
  //   collection(db, "customers"),
  //   where("email", "==", user?.email)
  // );

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
  }, []);

  // useEffect(() => {
  //   console.log("userEffect");
  //   const unsubscribe = onSnapshot(questionsQuery, (querySnapshot) => {
  //     querySnapshot.docs.map((doc) => setUserData(doc.data()));
  //   });
  //   unsubscribe();
  // }, [user]);

  const onNavigationContainerReady = useCallback(async () => {
    if (isReady) await SplashScreen.hideAsync();
  }, [isReady]);

  if (!isReady) return null;

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <OfflineNotice></OfflineNotice>
      <NavigationContainer
        ref={navigationRef}
        theme={navigationTheme}
        onReady={onNavigationContainerReady}
      >
        {user ? <AppNavigator></AppNavigator> : <AuthNavigator></AuthNavigator>}
      </NavigationContainer>
    </AuthContext.Provider>
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
