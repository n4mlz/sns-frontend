import { publicEnv } from "@/constants/env";

const userIconUrl = (userName: string) => new URL(`/images/users/${userName}/icon.png`, publicEnv.IMAGE_URL).href;

const userBgImageUrl = (userName: string) =>
  new URL(`/images/users/${userName}/background.png`, publicEnv.IMAGE_URL).href;

export { userIconUrl, userBgImageUrl };
