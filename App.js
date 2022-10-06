import React, { useCallback, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import "expo-dev-menu";

import * as SplashScreen from "expo-splash-screen";

import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import OfflineNotice from "./app/components/OfflineNotice";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import { navigationRef } from "./app/navigation/rootNavigation";

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const userInfo = await authStorage.getUser();
    if (userInfo) setUser(userInfo);
  };

  const prepare = async () => {
    try {
      await SplashScreen.preventAutoHideAsync();
      await restoreUser();
    } catch (error) {
      console.log("Error loading app", error);
    } finally {
      // Tell the application to render
      setIsReady(true);
    }
  };

  useEffect(() => {
    prepare();
  }, []);

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
