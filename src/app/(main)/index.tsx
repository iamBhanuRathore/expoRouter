import { SafeAreaView, Text } from "react-native";
import React from "react";
import { router } from "expo-router";
import { useUserDetails } from "@/providers/auth-provider";

const Main = () => {
  const { error, loading, user } = useUserDetails();
  if (loading) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }
  if (error) {
    router.replace("(auth)/login");
    // return (
    //   <SafeAreaView>
    //     <Text>Error Occured While Getting User details...</Text>
    //   </SafeAreaView>
    // );
  }
  if (user) {
    router.replace("(main)/home");
    return;
  }
  return (
    <SafeAreaView>
      <Text>Boy...</Text>
    </SafeAreaView>
  );
};

export default Main;
