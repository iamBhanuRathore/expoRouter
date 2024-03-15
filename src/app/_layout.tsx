import React from "react";
import { Stack } from "expo-router";
import { StatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import "../global.css";
import { UserProvider } from "@/providers/auth-provider";
const MainLayout = () => {
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: top,
        flex: 1,
      }}>
      {/* <StatusBar
        animated={true}
        backgroundColor="#ededed"
        barStyle={"dark-content"}
        showHideTransition={"slide"}
        hidden={false}
      /> */}
      <UserProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="(auth)"
            options={{
              title: "Login",
            }}
          />
          <Stack.Screen name="(main)/index" />
        </Stack>
      </UserProvider>
    </View>
  );
};

export default MainLayout;
