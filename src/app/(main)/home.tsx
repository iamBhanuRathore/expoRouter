import { View, Text, Pressable, ScrollView, FlatList } from "react-native";
import React, { useEffect } from "react";
import { useUserDetails } from "@/providers/auth-provider";
import { Link, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LikebarComponent from "@/components/likebar-component";
import RecentPlayed from "@/components/recent-played";
import GetTopItems from "@/components/top-items-component";
import UserAvatar from "@/components/user-avatar";
const tabButtons = [
  {
    name: "Music",
    url: "1",
  },
  {
    name: "Postasts & ShowsPostasts & Shows",
    url: "2",
  },
  {
    name: "Music",
    url: "1",
  },
  {
    name: "Postasts & ShowsPostasts & Shows",
    url: "2",
  },
  {
    name: "Music",
    url: "1",
  },
  {
    name: "Postasts & ShowsPostasts & Shows",
    url: "2",
  },
  {
    name: "Music",
    url: "1",
  },
  {
    name: "Postasts & ShowsPostasts & Shows",
    url: "2",
  },
  {
    name: "Music",
    url: "1",
  },
  {
    name: "Postasts & ShowsPostasts & Shows",
    url: "2",
  },
  {
    name: "Music",
    url: "1",
  },
  {
    name: "Postasts & ShowsPostasts & Shows",
    url: "2",
  },
];
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
    router.replace("(auth)/login");
  };
  return (
    <View className="bg-zinc-800 flex-1">
      {/* <LinearGradient colors={["#040306", "#131624"]}> */}
      <ScrollView>
        {/* <View className="gap-4"> */}
        <UserAvatar />
        <View className="py-2 my-2">
          <FlatList
            data={tabButtons}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => String(index)}
            renderItem={({ item, index }) => (
              <Pressable className="bg-zinc-700 mx-1 py-2 px-5 rounded-full">
                <Text className="text-white">{item.name}</Text>
              </Pressable>
            )}
          />
        </View>
        {/* Likebar Component  */}
        <LikebarComponent />
        {/* Likebar Component  */}
        {/* Recent Played Component  */}
        <View className="p-3">
          <Text className="text-zinc-300 text-2xl ">Recently Played</Text>
          <RecentPlayed />
        </View>
        {/* Recent Played Component  */}
        {/* GetTopItems GetTopItems Component  */}
        <View className="p-3">
          <Text className="text-zinc-300 text-2xl ">Your Top Artists</Text>
          <GetTopItems type="artists" />
        </View>
        {/* GetTopItems GetTopItems Component  */}
        {/* </View> */}
      </ScrollView>
      {/* <Button title="Logout" onPress={handleLogout} /> */}
      {/* </LinearGradient> */}
    </View>
  );
};

export default HomeRoute;
