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
    // if we have auth token -- then we are going to get the access token
    // If we have the access token then we are going to get the user details
    const authToken = await AsyncStorage.getItem("authToken");
    const accessToken = await AsyncStorage.getItem("authToken");
    // If we are here after the login
    if (authToken && !accessToken) {
      try {
        const data = await getAccessTokenApi(authToken);
      } catch (error) {
        router.replace("(auth)/login");
      }
    }
    // // if we refresh on this page and we have access token
    // if (!authToken && accessToken) {
    // }
    try {
      //   const token = (await AsyncStorage.getItem("authToken")) || "Token Hahah";
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
