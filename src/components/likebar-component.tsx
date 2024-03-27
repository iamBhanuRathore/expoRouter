import { router } from "expo-router";
import React from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
const LikedButtonComponent = () => {
  return (
    <Pressable
      className="bg-zinc-700 overflow-hidden flex-row gap-x-4 items-center rounded-md flex-1 mx-4 my-2 "
      onPress={() => router.navigate("/liked")}>
      <Image
        height={65}
        width={65}
        resizeMode="cover"
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8j1phplfUkt-F1EAB3ieH1liY7MD_GvOg3Q&usqp=CAU",
        }}
      />
      <Text className="text-zinc-300 ml-[10px]">Liked Songs</Text>
    </Pressable>
  );
};

const secondTabBar = [
  { name: "Liked", component: LikedButtonComponent },
  { name: "Second Column" },
  { name: "Third Column" },
  { name: "Fourth Column" },
  { name: "Fifth Column" },
  { name: "Sixth Columngsrfgsrger" },
];
const LikebarComponent = () => {
  return (
    <View className="bg-zinc-800 my-2 py-3 flex-row flex-wrap">
      <FlatList
        data={secondTabBar}
        numColumns={2}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item, index }) => {
          return item.component ? (
            <item.component key={index} />
          ) : (
            <Pressable
              key={index}
              className="bg-zinc-700 overflow-hidden flex-row gap-x-4 flex-1 items-center rounded-md mx-4 my-2">
              <Image
                height={65}
                width={65}
                resizeMode="cover"
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8j1phplfUkt-F1EAB3ieH1liY7MD_GvOg3Q&usqp=CAU",
                }}
              />
              <Text
                ellipsizeMode="clip"
                numberOfLines={1}
                className="text-zinc-300 ml-[10px] text-lg">
                {item.name}
              </Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

export default LikebarComponent;
{
  /*
       <FlatList
        data={secondTabBar}
        numColumns={2}
        ListHeaderComponent={LikedButtonComponent}
        ListHeaderComponentStyle={{ width: "50%" }}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item, index }) => (
          <Pressable className="bg-zinc-700 overflow-hidden flex-row gap-x-4 items-center rounded-md mx-4 my-2 ">
            <Image
              height={65}
              width={65}
              resizeMode="cover"
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8j1phplfUkt-F1EAB3ieH1liY7MD_GvOg3Q&usqp=CAU",
              }}
            />
            <Text
              ellipsizeMode="clip"
              numberOfLines={1}
              className="text-zinc-300 text-lg">
              {item.name}
            </Text>
          </Pressable>
        )}
      />
       */
}
