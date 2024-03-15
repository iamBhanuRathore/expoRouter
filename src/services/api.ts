import { catchAsyncErrors } from "@/lib/utils";

// <-------- For Getting the accessToken --------->
import { Buffer } from "buffer"; // for base64 encoding
// import axios from "axios";
import { makeRedirectUri } from "expo-auth-session";
const AUTH_BASE_URL = "https://accounts.spotify.com/api";
// const USER_BASE_URL = "https://api.spotify.com/v1";
const redirectUri = makeRedirectUri({
  scheme: "acme",
  path: "(main)",
});
const clientId = "a9c371842776484c9202086d65d111d2";
const clientSecret = "ed35bfb8f6f94bc2ad5b136aea4d1bce";

// export const getUserDetailsApi = catchAsyncErrors(async (token: string) => {
//   console.log({ token });
//   const data = await fetch("/user/getdetails");
//   const res = await data.json();
//   return res;
// });
export const getUserDetailsApi = async (accessToken: string) => {
  console.log({ accessToken });
  const data = await fetch("/user/getdetails");
  const res = await data.json();
  return res;
};
export const getAccessTokenApi = async (authToken: string) => {
  const encodedCredentials = Buffer.from(
    `${clientId}:${clientSecret}`
  ).toString("base64");
  console.log("hehe");
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
