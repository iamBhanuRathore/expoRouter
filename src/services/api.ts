import { clientId, clientSecret, redirectUri } from "@/lib/constants";

// <-------- For Getting the accessToken --------->
import { Buffer } from "buffer"; // for base64 encoding
export const AUTH_BASE_URL = "https://accounts.spotify.com/api";
export const USER_BASE_URL = "https://api.spotify.com/v1";

export const getUserDetailsApi = async (accessToken: string) => {
  // console.log({ accessToken, message: "In getting the user Detials" });
  const tokenResponse = await fetch(`${USER_BASE_URL}/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const tokenData = await tokenResponse.json();
  return tokenData;
};
export const getAccessTokenApi = async (authToken: string) => {
  const encodedCredentials = Buffer.from(
    `${clientId}:${clientSecret}`
  ).toString("base64");
  console.log("Getting the access token");
  const authorizationHeader = `Basic ${encodedCredentials}`;

  const tokenResponse = await fetch(`${AUTH_BASE_URL}/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: authorizationHeader,
    },
    body: `grant_type=authorization_code&code=${authToken}&redirect_uri=${redirectUri}`,
  });

  const tokenData = await tokenResponse.json();
  // console.log("tokenData", tokenData);
  return tokenData;
};
