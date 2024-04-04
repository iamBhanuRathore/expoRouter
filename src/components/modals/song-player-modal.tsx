import {
  View,
  Text,
  Modal,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { BottomModal, ModalContent } from "react-native-modals";
import { useModal } from "@/providers/modal-provider";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  Ionicons,
  Feather,
} from "@expo/vector-icons";
import { usePlayer } from "@/providers/player-provider";
import PlayerSlider from "../player-slider";

type Props = {};

const SongPlayerModal = (props: Props) => {
  const {
    closeModal,
    modalState: { isOpen, modalData, type },
  } = useModal();
  const { currentTrack } = usePlayer();
  const isModalOpen = isOpen && type === "player-modal";
  if (!isModalOpen) {
    return null;
  }
  const handleCloseModal = () => {
    closeModal();
    return true; // Return true to indicate the event was handled
  };
  return (
    <BottomModal
      animationDuration={900}
      onHardwareBackPress={handleCloseModal}
      swipeThreshold={200}
      swipeDirection={["up", "down"]}
      onSwipeOut={handleCloseModal}
      visible={isModalOpen}>
      <ModalContent
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#492f68",
        }}>
        <View style={{ width: "100%", height: "100%", alignItems: "center" }}>
          {/* Top bar for song name and other actions  */}
          <Pressable className="flex-row justify-between px-[10px]">
            <AntDesign
              onPress={closeModal}
              name="down"
              size={24}
              color="rgb(212 212 216)"
            />
            <Text className="flex-1 text-center text-2xl italic text-zinc-300">
              {currentTrack?.track?.name}
            </Text>
            <Entypo
              name="dots-three-vertical"
              size={24}
              color="rgb(212 212 216)"
            />
          </Pressable>
          {/* Song Details like image, song name, artist name  */}
          <View className="items-center w-[90%] max-w-[500px]  mt-[50px]">
            <Image
              style={{
                width: "100%",
                borderRadius: 10,
                aspectRatio: 1,
              }}
              resizeMode="cover"
              source={{ uri: currentTrack?.track?.album?.images?.[0].url }}
            />
            <View className="w-full mt-[20px] flex-row justify-between ">
              <View>
                <Text
                  numberOfLines={1}
                  className="italic text-zinc-200 text-2xl">
                  {currentTrack?.track?.name}
                </Text>
                <Text className="italic text-zinc-400 text-md mt-2">
                  {currentTrack?.track?.artists?.[0].name}
                </Text>
              </View>
              <AntDesign
                className="mx-[10px]"
                name="heart"
                size={24}
                color="rgb(22 163 74 )"
              />
            </View>
          </View>
          {/* Song Player */}
          <View className="mt-[40px] w-[90%]">
            <PlayerSlider />
            <View className="mt-[10px] flex-row justify-between">
              <Text className="text-zinc-400 ">0.00</Text>
              <Text className="text-zinc-400">3.00</Text>
            </View>
          </View>
          <View className="flex-row w-full justify-between items-center mt-[20px] px-[40px]">
            <TouchableOpacity>
              <FontAwesome name="arrows" size={30} color="rgb(22 163 74 )" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="play-skip-back" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <AntDesign name="pausecircle" size={60} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="play-skip-forward" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather name="repeat" size={30} color="rgb(22 163 74 )" />
            </TouchableOpacity>
          </View>
        </View>
      </ModalContent>
    </BottomModal>
  );
};

export default SongPlayerModal;

{
  /* <Pressable onPress={closeModal}>
        <Text>Hello</Text>
      </Pressable> */
}
// animationType="slide"
// transparent={false}
// onRequestClose={closeModal}
