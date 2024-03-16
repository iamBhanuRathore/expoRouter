import { View, Text, Pressable } from "react-native";
import React, { useEffect } from "react";
import { useUserDetails } from "@/providers/auth-provider";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeRoute = () => {
  const { user, refetch, error } = useUserDetails();
  // if (error) {
  //   router.replace("(auth)/login");
  // }
  useEffect(() => {
    refetch();
  }, []);
  const handleClearStorage = async () => {
    await AsyncStorage.clear();
    router.replace("(auth)");
  };
  return (
    <View>
      <Text>HomeRoute {JSON.stringify(user)}</Text>
      <Pressable onPress={handleClearStorage}>
        <Text>Clear Async Storage</Text>
      </Pressable>
    </View>
  );
};

export default HomeRoute;
