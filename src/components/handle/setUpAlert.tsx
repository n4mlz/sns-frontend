"use client";

import { useEffect } from "react";
import useSWR from "swr";
import { components } from "@/lib/openapi/schema";
import { useAuthContext } from "@/components/contexts/AuthProvider";
import useSetUpAlert from "@/hooks/setUpAlert";

const SetUpAlert = () => {
  const authContext = useAuthContext();
  const { onOpen, setUpAlert } = useSetUpAlert();

  const { data, error, isLoading } = useSWR<components["schemas"]["profile"]>(
    authContext.currentUser ? "/api/settings/profile" : null
  );

  useEffect(() => {
    if (
      authContext.currentUser === null ||
      (authContext.currentUser && !isLoading && (!data || !data.userName || error))
    ) {
      onOpen();
    }
  }, [authContext.currentUser, data, error, isLoading]);

  return <>{setUpAlert}</>;
};

export default SetUpAlert;
