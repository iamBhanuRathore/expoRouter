import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { getAccessTokenApi, getUserDetailsApi } from "@/services/api";
import { router } from "expo-router";

interface User {
  name: string;
  email: string;
  // Add other user details as needed
}
type UserContextType = {
  loading: boolean;
  user: User | null;
  error: string;
  refetch: () => Promise<void>;
};
// Create the context
const UserContext = createContext<UserContextType>(null);

// Custom hook to consume the context
export const useUserDetails = () => useContext(UserContext);

// Provider component
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const fetchUserDetails = async () => {
    console.log("Inside fetch User Details");
    // if we have auth token -- then we are going to get the access token
    // If we have the access token then we are going to get the user details
    const authToken = await AsyncStorage.getItem("authToken");
    const accessToken = await AsyncStorage.getItem("accessToken");
    console.log({ authToken, accessToken });
    if (!accessToken && !authToken) {
      router.replace("(auth)/login");
    }

    // If we are here after the login
    if (authToken && !accessToken) {
      console.log("First Time");
      try {
        const data = await getAccessTokenApi(authToken);
        if (data?.error_description) {
        }
        console.log("authToken-->", data);
      } catch (error) {
        router.replace("(auth)/login");
      }
    }

    try {
      if (authToken) {
        setUser((p) => ({ ...p, loading: true }));
        const userDetails = await getUserDetailsApi(authToken);
        setUser((p) => ({ ...p, user: userDetails }));
      }
    } catch (error) {
      setUser((p) => ({
        ...p,
        error: error?.message || "Unknown error Occured",
      }));
    } finally {
      setUser((p) => ({ ...p, loading: false }));
    }
  };
  const [user, setUser] = useState<UserContextType>({
    loading: true,
    user: null,
    error: "",
    refetch: fetchUserDetails,
  });
  useEffect(() => {
    fetchUserDetails();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
