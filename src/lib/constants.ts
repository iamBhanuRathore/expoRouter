import { makeRedirectUri } from "expo-auth-session";

export const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};
export const clientId = "a9c371842776484c9202086d65d111d2";
export const clientSecret = "ed35bfb8f6f94bc2ad5b136aea4d1bce";

export const redirectUri = makeRedirectUri({
  scheme: "acme",
  path: "/(main)/home",
});
