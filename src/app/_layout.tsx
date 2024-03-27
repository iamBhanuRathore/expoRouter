import React from "react";
import { Stack } from "expo-router";
import { View, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import "../global.css";
import { UserProvider } from "@/providers/auth-provider";
import { QueryProvider } from "@/providers/query-provider";
import PlayerProvider from "@/providers/player-provider";

const MainLayout = () => {
  const { top } = useSafeAreaInsets();

  return (
    <>
      {/* <StatusBar
        // animated
        // translucent={true}
        // barStyle="default"
        // networkActivityIndicatorVisible
        // hideTransitionAnimation="fade"
        // // hidden
        // translucent
        // backgroundColor="red"
        // style="light"
      /> */}
      <View
        style={{
          paddingTop: top,
          flex: 1,
          backgroundColor: "#789797",
        }}>
        {/* <StatusBar
        animated={true}
        backgroundColor="#ededed"
        barStyle={"dark-content"}
        showHideTransition={"slide"}
        hidden={false}
      /> */}
        <UserProvider>
          <QueryProvider>
            <PlayerProvider>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen
                  name="(auth)"
                  options={{
                    title: "Login",
                  }}
                />
                <Stack.Screen name="(main)/index" />
                <Stack.Screen name="(main)/liked" />
              </Stack>
            </PlayerProvider>
          </QueryProvider>
        </UserProvider>
      </View>
    </>
  );
};

export default MainLayout;
