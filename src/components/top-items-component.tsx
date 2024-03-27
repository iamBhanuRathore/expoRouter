import React from "react";
import { useGetUsersTopItems } from "@/services/queries";
import { FlatList, Image, Text, View } from "react-native";

type Props = {
  type: "artists" | "tracks";
};

const GetTopItems = ({ type }: Props) => {
  const { data, isLoading, isError } = useGetUsersTopItems(type);
  // console.log({ data, isLoading, isError });
  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data?.items}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item }) => <ArtistCard item={item} />}
      />
    </View>
    // <Text className="text-white">
    //   GetTopItems{JSON.stringify({ data: data.items })}
    // </Text>
  );
};

export default GetTopItems;

export const ArtistCard = ({ item }) => {
  // console.log(item);
  return (
    <View className="drop-shadow-sm p-1">
      <Image
        source={{ uri: item.images[0].url }}
        height={150}
        width={150}
        resizeMode="cover"
      />
      <Text className="text-white font-semibold mt-2">{item.name}</Text>
    </View>
  );
};
