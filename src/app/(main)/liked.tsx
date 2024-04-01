import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Image,
  Animated,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

import { useGetLikedSongs } from "@/services/queries";
import { usePlayer } from "@/providers/player-provider";
import PlayerBar from "@/components/player-bar";
import { Audio } from "expo-av";
const Liked = () => {
  const { data, error, isLoading } = useGetLikedSongs();
  const { currentTrack, setCurrentTrack } = usePlayer();
  const [search, setSearch] = useState("");

  const navigation = useNavigation();
  const onBack = () => {
    navigation.goBack();
  };
  // console.log(data);
  //   navigation.setOptions({
  //     headerShown: true,
  //   });
  const play = async (track) => {
    const previewUrl = track?.track?.preview_url;
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: false,
      });
      const { sound, status } = await Audio.Sound.createAsync(
        {
          uri: previewUrl,
        },
        { shouldPlay: true, isLooping: false }
      );
      await sound.playAsync();
    } catch (error) {}
  };

  const playAllLikedSongs = async () => {
    if (data.items.length !== 0) {
      setCurrentTrack(data.items[0]);
    }
    await play(data.items[0]);
  };

  return (
    <LinearGradient colors={["#614385", "#516395"]} className="flex-1">
      {/* Top SearchBar */}
      <View className="flex-row px-3 py-5 items-center">
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="arrow-back" size={40} color="#b5acac" />
        </TouchableOpacity>
        <View className="flex-row flex-1 mx-2 bg-zinc-800/25 p-3 rounded-md">
          <Ionicons name="search" size={30} className="mr-3" color="#b5acac" />
          <TextInput
            // autoFocus
            placeholderTextColor="#b5acac"
            value={search}
            className="text-white placeholder:font-bold"
            onChangeText={(text) => setSearch(text)}
            placeholder="Find Liked Songs"
          />
        </View>
        <Pressable className="bg-zinc-800/25 h-full w-[60px] rounded-md justify-center items-center flex-row p-3">
          <Text className="text-[#b5acac]">Sort</Text>
        </Pressable>
      </View>
      <View className="h-[20]" />
      <ScrollView>
        <View className="mx-5">
          <Text className="text-2xl text-zinc-300">Liked Songs</Text>
          <Text className="text-md text-zinc-400">
            {isLoading ? "Loading..." : data?.total || "Error"} Songs
          </Text>
        </View>
        <View className="flex-row items-center px-5 mt-5">
          <Pressable className="items-center justify-center bg-green-600 w-[40px] h-[40px] rounded-full">
            <AntDesign name="arrowdown" size={30} color="white" />
          </Pressable>
          <Pressable className="flex-1 flex-row justify-end items-center px-5 w-[40px] h-[40px] rounded-full">
            <MaterialCommunityIcons
              name="cross-bolnisi"
              size={30}
              color="rgb(22 163 74)"
            />
          </Pressable>
          <Pressable
            onPress={playAllLikedSongs}
            className="items-center justify-center w-[60px] h-[60px] bg-green-600 rounded-full">
            <Entypo name="controller-play" size={40} color="white" />
          </Pressable>
        </View>
        {isLoading ? (
          <Text>Loading</Text>
        ) : error ? (
          <Text>{JSON.stringify(error)}</Text>
        ) : (
          <FlatList
            data={data.items}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return <SingleLikedSong item={item} />;
            }}
            keyExtractor={(_, index) => String(index)}
          />
        )}
        {/* <Text>{JSON.stringify(data)}</Text> */}
      </ScrollView>
      {currentTrack && <PlayerBar />}
    </LinearGradient>
  );
};

export default Liked;

const SingleLikedSong = ({ item }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [animatedValue]);

  const animatedStyle = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [100, 0],
        }),
      },
    ],
    opacity: animatedValue,
  };

  return (
    <Animated.View style={[animatedStyle]}>
      <TouchableOpacity
        style={{
          marginVertical: 5,
          marginHorizontal: 15,
          borderColor: "#61438575",
          borderWidth: 1,
          borderRadius: 6,
          overflow: "hidden",
        }}>
        <View className="flex-row items-center">
          <Image
            height={60}
            width={60}
            source={{ uri: item?.track?.album?.images[0].url }}
          />
          <View className="flex-1 mx-[10px]">
            <Text numberOfLines={1} className="text-zinc-200 text-lg">
              {item?.track?.name}
            </Text>
            <Text className="text-zinc-400 mt-2">
              {item?.track?.artists?.[0].name}
            </Text>
          </View>
          <View className="flex-row" style={{ columnGap: 15 }}>
            <Pressable>
              <Fontisto name="heart" size={22} color="rgb(22 163 74 )" />
            </Pressable>
            <Pressable>
              <SimpleLineIcons
                name="options-vertical"
                size={24}
                color="rgb(161 161 170)"
              />
            </Pressable>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};
