"use client";

import useSWR from "swr";
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, useDisclosure } from "@chakra-ui/react";
import { useAuthContext } from "@/components/contexts/AuthProvider";
import { components } from "@/lib/openapi/schema";

const useNetworkErrorDialog = () => {
  const disclosure = useDisclosure();
  const authContext = useAuthContext();

  const { error } = useSWR<components["schemas"]["profile"]>(authContext.currentUser ? "/api/settings/profile" : null);

  const onOpen = () => {
    if (error) {
      disclosure.onOpen();
    }
  };

  const networkErrorDialog = (
    <>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <Box>
            <AlertTitle>ネットワークエラー</AlertTitle>
            <AlertDescription>サーバーと通信できませんでした。通信環境をお確かめください。</AlertDescription>
          </Box>
        </Alert>
      )}
    </>
  );

  return { ...disclosure, onOpen, networkErrorDialog };
};

export default useNetworkErrorDialog;
