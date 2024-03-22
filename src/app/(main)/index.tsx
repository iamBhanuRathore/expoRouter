import { SafeAreaView, Text } from "react-native";
import React, { useEffect } from "react";
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
  // (main)/index
  useEffect(() => {
    // Wait for user context to update
    if (user) {
      router.replace("(main)/home");
    }
  }, [user]);

  if (error) {
    console.log("from error from herer");
    router.replace("(auth)/login");
    // return (
    //   <SafeAreaView>
    //     <Text>Error Occured While Getting User details...</Text>
    //   </SafeAreaView>
    // );
  }
  console.log({ user });
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
