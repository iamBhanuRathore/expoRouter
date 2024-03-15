import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useUserDetails } from "@/providers/auth-provider";
import { router } from "expo-router";

const HomeRoute = () => {
  const { user, refetch, error } = useUserDetails();
  // if (error) {
  //   router.replace("(auth)/login");
  // }
  useEffect(() => {
    refetch();
  }, []);
  return (
    <View>
      <Text>HomeRoute {JSON.stringify(user)}</Text>
    </View>
  );
};

export default HomeRoute;
