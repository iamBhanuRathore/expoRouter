import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { getAccessTokenApi, getUserDetailsApi } from "@/services/api";
import { useRouter } from "expo-router";
import { UserType } from "@/typings";

type UserContextType = {
  loading: boolean;
  user: UserType | null;
  accessToken: string;
  error: string;
  refetch: () => Promise<void>;
};
// Create the context
const UserContext = createContext<UserContextType>(null);

// Custom hook to consume the context
export const useUserDetails = () => useContext(UserContext);

// Provider component
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const fetchUserDetails = async () => {
    console.log("Inside fetch User Details");
    try {
      setUser((p) => ({ ...p, loading: true, accessToken: "" }));
      // if we have auth token -- then we are going to get the access token
      // If we have the access token then we are going to get the user details
      let authToken = await AsyncStorage.getItem("authToken");
      let accessToken = await AsyncStorage.getItem("accessToken");
      // console.log({ authToken, accessToken });
      if (!accessToken && !authToken) {
        console.log("!accessToken && !authToken");
        router.replace("(auth)/login");
        return;
      }
      // If we are here after the login
      if (authToken && !accessToken) {
        console.log("First Time");
        try {
          const data = await getAccessTokenApi(authToken);
          // getting access token and set it to the async storage
          console.log("token from accessToken api");
          // if our authToken is expired
          if (data?.error_description) {
            await AsyncStorage.removeItem("authToken");
            console.log("data?.error_description");
            router.replace("(auth)/login");
            return;
          }
          accessToken = data.access_token;
          await AsyncStorage.setItem("accessToken", data.access_token);
          console.log("Setting the accessToken");
        } catch (error) {
          // if some other occured
          console.log("Error block");
          router.replace("(auth)/login");
          return;
        }
      }
      const userDetails = await getUserDetailsApi(accessToken);
      // console.log({ userDetails });
      if (userDetails.error) {
        console.log("return from there");
        await AsyncStorage.removeItem("accessToken");
        router.replace("(auth)/login");
        return;
      }
      // if userdetails get error again go to the login
      setUser((p) => ({ ...p, user: userDetails, accessToken }));
    } catch (error) {
      setUser((p) => ({
        ...p,
        error: error?.message || "Unknown error Occured",
        accessToken: "",
      }));
    } finally {
      setUser((p) => ({ ...p, loading: false }));
    }
  };
  const [user, setUser] = useState<UserContextType>({
    loading: true,
    user: null,
    accessToken: "",
    error: "",
    refetch: fetchUserDetails,
  });
  useEffect(() => {
    fetchUserDetails();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
