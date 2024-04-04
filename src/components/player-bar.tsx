import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  Animated,
  Alert,
  ScrollView,
} from "react-native";
import { usePlayer } from "@/providers/player-provider";
import { AntDesign } from "@expo/vector-icons";
import { useModal } from "@/providers/modal-provider";
import PlayerSlider from "./player-slider";

type Props = {};

const PlayerBar = (props: Props) => {
  const { openModal } = useModal();
  const { currentTrack, setCurrentTrack } = usePlayer();
  const animatedValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
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

  const handleHeartPress = () => {
    // Add your logic for handling the heart press event
    Alert.alert("Heart Pressed");
  };

  const handlePausePress = () => {
    // Add your logic for handling the pause press event
    Alert.alert("Pause Pressed");
  };

  return (
    <Animated.View style={[animatedStyle]}>
      <View className="w-[95%] px-[5px] pt-[5px] bg-[#795a9e] rounded-xl overflow-hidden mx-auto mb-[15px] absolute bottom-[10px] right-1/2 translate-x-1/2">
        <ScrollView>
          <Pressable
            onPress={() => openModal("player-modal")}
            className="flex-row justify-between items-center">
            <Image
              height={50}
              className="rounded-lg"
              width={50}
              source={{ uri: currentTrack?.track?.album?.images[0].url }}
            />
            {/* Details */}
            <View className="flex-1 mx-[10px]">
              <Text numberOfLines={1} className="text-zinc-200 text-lg">
                {currentTrack?.track?.name}
              </Text>
              <Text className="text-zinc-400 mt-[4px]">
                {currentTrack?.track?.artists?.[0].name}
              </Text>
            </View>
            {/* Actions */}
            <View className="flex-row px-[10px]" style={{ columnGap: 10 }}>
              <Pressable onPress={handleHeartPress}>
                <AntDesign name="heart" size={24} color="rgb(22 163 74)" />
              </Pressable>
              <Pressable onPress={handlePausePress}>
                <AntDesign
                  name="pausecircle"
                  size={24}
                  color="rgb(22 163 74)"
                />
              </Pressable>
            </View>
          </Pressable>
        </ScrollView>
        <View className="">
          <PlayerSlider />
        </View>
      </View>
    </Animated.View>
  );
};

export default PlayerBar;
