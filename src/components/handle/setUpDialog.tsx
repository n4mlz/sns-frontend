"use client";

import { useEffect } from "react";
import useSWR from "swr";
import { components } from "@/lib/openapi/schema";
import { useAuthContext } from "@/components/contexts/AuthProvider";
import useSetUpDialog from "@/hooks/setUpDialog";

const SetUpDialog = () => {
  const authContext = useAuthContext();
  const { onOpen, setUpDialog } = useSetUpDialog();

  const { data, isLoading } = useSWR<components["schemas"]["profile"]>(
    authContext.currentUser ? "/api/settings/profile" : null
  );

  useEffect(() => {
    if (authContext.currentUser === null || (authContext.currentUser && !isLoading && (!data || !data.userName))) {
      onOpen();
    }
  }, [authContext.currentUser, data, isLoading]);

  return <>{setUpDialog}</>;
};

export default SetUpDialog;
