import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import { USER_BASE_URL } from "./api";

export const useRecentPlayedSongs = () => {
  return useQuery({
    queryKey: ["recentPlayed"],
    queryFn: async () => {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const tokenResponse = await fetch(
        `${USER_BASE_URL}/me/player/recently-played?limit=4`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const tokenData = await tokenResponse.json();
      return tokenData;
    },
  });
};
export const useGetUsersTopItems = (type: "artists" | "tracks") => {
  return useQuery({
    queryKey: ["topArtists"],
    queryFn: async () => {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const tokenResponse = await fetch(`${USER_BASE_URL}/me/top/${type}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const tokenData = await tokenResponse.json();
      return tokenData;
    },
  });
};
