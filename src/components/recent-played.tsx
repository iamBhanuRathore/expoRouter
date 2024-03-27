import { useRecentPlayedSongs } from "@/services/queries";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
const dummyData = {
  href: "string",
  limit: 0,
  next: "string",
  cursors: {
    after: "string",
    before: "string",
  },
  total: 0,
  items: [
    {
      track: {
        album: {
          album_type: "compilation",
          total_tracks: 9,
          available_markets: ["CA", "BR", "IT"],
          external_urls: {
            spotify: "string",
          },
          href: "string",
          id: "2up3OPMp9Tb4dAKM2erWXQ",
          images: [
            {
              url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
              height: 300,
              width: 300,
            },
          ],
          name: "string",
          release_date: "1981-12",
          release_date_precision: "year",
          restrictions: {
            reason: "market",
          },
          type: "album",
          uri: "spotify:album:2up3OPMp9Tb4dAKM2erWXQ",
          artists: [
            {
              external_urls: {
                spotify: "string",
              },
              href: "string",
              id: "string",
              name: "string",
              type: "artist",
              uri: "string",
            },
          ],
        },
        artists: [
          {
            external_urls: {
              spotify: "string",
            },
            followers: {
              href: "string",
              total: 0,
            },
            genres: ["Prog rock", "Grunge"],
            href: "string",
            id: "string",
            images: [
              {
                url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
                height: 300,
                width: 300,
              },
            ],
            name: "string",
            popularity: 0,
            type: "artist",
            uri: "string",
          },
        ],
        available_markets: ["string"],
        disc_number: 0,
        duration_ms: 0,
        explicit: false,
        external_ids: {
          isrc: "string",
          ean: "string",
          upc: "string",
        },
        external_urls: {
          spotify: "string",
        },
        href: "string",
        id: "string",
        is_playable: false,
        linked_from: {},
        restrictions: {
          reason: "string",
        },
        name: "string",
        popularity: 0,
        preview_url: "string",
        track_number: 0,
        type: "track",
        uri: "string",
        is_local: false,
      },
      played_at: "string",
      context: {
        type: "string",
        href: "string",
        external_urls: {
          spotify: "string",
        },
        uri: "string",
      },
    },
  ],
};
const RecentPlayed = () => {
  const { data, isLoading, isError, error } = useRecentPlayedSongs();
  const tracks = data?.items?.length ? data?.items : dummyData.items;
  return (
    <View>
      <FlatList
        data={tracks}
        numColumns={2}
        renderItem={({ item }) => (
          <Pressable className="flex-1 flex-row justify-between my-3 mx-2 bg-zinc-800 rounded-md overflow-hidden">
            <Image
              source={{
                uri: item.track.album.images[0].url,
              }}
              height={55}
              width={55}
              // height={item.track.album.images[0].height}
              // width={item.track.album.images[0].width}
            />
            <View className="flex-1 justify-center pl-4 bg-zinc-700">
              <Text numberOfLines={1} className="font-bold text-white">
                {item.track.name}
              </Text>
            </View>
          </Pressable>
        )}
        columnWrapperStyle={{ justifyContent: "space-between" }}
      />
    </View>
  );
};

export default RecentPlayed;
