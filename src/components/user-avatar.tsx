import { cn, greetings } from "@/lib/utils";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserDetails } from "@/providers/auth-provider";

type Props = {
  className?: string;
};

const UserAvatar = ({ className }: Props) => {
  const { user } = useUserDetails();
  console.log("user", user);

  return (
    <SafeAreaView
      className={cn(
        "flex-row items-center justify-center px-4 py-4 gap-4",
        className
      )}>
      {/* Image or the text in image  */}
      {user?.images[0]?.url ? (
        <Image
          className="h-10 w-10 rounded-full object-cover"
          source={{ uri: user?.images[0]?.url }}
        />
      ) : (
        <View className="h-10 w-10 rounded-full items-center justify-center bg-green-600">
          <Text className="text-white text-2xl">
            {user?.display_name.at(0).toUpperCase()}
          </Text>
        </View>
      )}
      <Text className="flex-1 text-2xl">
        <Text className="text-white">{greetings()}</Text>
        <Text className="text-green-500"> {user?.display_name}</Text>
      </Text>
      <MaterialCommunityIcons
        name="lightning-bolt-outline"
        size={24}
        color="white"
      />
    </SafeAreaView>
  );
};

export default UserAvatar;
