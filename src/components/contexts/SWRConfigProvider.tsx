"use client";

import { SWRConfig } from "swr";
import { useAuthContext } from "@components/contexts/AuthProvider";
import { publicEnv } from "@/constants/env";

const SWRConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const authContext = useAuthContext();

  const fetcher = async (url: string) => {
    const idToken = await authContext.currentUser?.getIdToken();
    const res = fetch(new URL(url, publicEnv.API_URL).href, {
      headers: { Authorization: `Bearer ${idToken}` },
    })
      .catch((e) => {
        // network error
        throw Error(e);
      })
      .then((res) => res.json());
    return res;
  };

  return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>;
};

export default SWRConfigProvider;
