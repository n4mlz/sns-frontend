"use client";

import { useEffect } from "react";
import useSWR from "swr";
import { components } from "@/lib/openapi/schema";
import { useAuthContext } from "@/components/contexts/AuthProvider";
import useNetworkErrorDialog from "@/hooks/networkErrorDialog";

const NetworkErrorDialog = () => {
  const authContext = useAuthContext();
  const { onOpen, networkErrorDialog } = useNetworkErrorDialog();

  const { error } = useSWR<components["schemas"]["profile"]>(authContext.currentUser ? "/api/settings/profile" : null);

  useEffect(() => {
    if (error) {
      onOpen();
    }
  }, [error]);

  return <>{networkErrorDialog}</>;
};

export default NetworkErrorDialog;
