import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import { USER_BASE_URL } from "./api";
import { useUserDetails } from "@/providers/auth-provider";

export const useRecentPlayedSongs = () => {
  const { accessToken } = useUserDetails();
  return useQuery({
    queryKey: ["recentPlayed"],
    queryFn: async () => {
      // const accessToken = await AsyncStorage.getItem("accessToken");
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
  const { accessToken } = useUserDetails();
  return useQuery({
    queryKey: ["topArtists"],
    queryFn: async () => {
      // const accessToken = await AsyncStorage.getItem("accessToken");
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
export const useGetLikedSongs = () => {
  const { accessToken } = useUserDetails();
  return useQuery({
    queryKey: ["likedSongs"],
    queryFn: async () => {
      // const accessToken = await AsyncStorage.getItem("accessToken");
      const tokenResponse = await fetch(
        `${USER_BASE_URL}/me/tracks?offset=0&limit=50`,
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
