import { getAuth } from "firebase/auth";
import { firebaseApp } from "@lib/firebase";
import { publicEnv } from "@/constants/env";

const userIconUrl = (userName: string) => new URL(`/images/users/${userName}/icon.png`, publicEnv.IMAGE_URL).href;

const userBgImageUrl = (userName: string) =>
  new URL(`/images/users/${userName}/background.png`, publicEnv.IMAGE_URL).href;

const postUserIconUrl = async (blob: Blob) => {
  const auth = getAuth(firebaseApp);
  const idToken = await auth.currentUser?.getIdToken();

  const body = new FormData();
  body.append("image", blob);

  return fetch(new URL("/api/settings/profile/icon", publicEnv.API_URL).href, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
    body,
  });
};

const postUserBgImageUrl = async (blob: Blob) => {
  const auth = getAuth(firebaseApp);
  const idToken = await auth.currentUser?.getIdToken();

  const body = new FormData();
  body.append("image", blob);

  return fetch(new URL("/api/settings/profile/bgImage", publicEnv.API_URL).href, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
    body,
  });
};

export { userIconUrl, userBgImageUrl, postUserIconUrl, postUserBgImageUrl };
