"use client";

import useSWR from "swr";
import { Box, Center, Spinner } from "@chakra-ui/react";
import { useAuthContext } from "@/components/contexts/AuthProvider";
import Users from "@/components/ui/users";
import { components } from "@/lib/openapi/schema";
import BackButtonHeader from "@/components/ui/backButtonHeader";

const RequestsPage = () => {
  const authContext = useAuthContext();

  const { data, isLoading, mutate } = useSWR<components["schemas"]["user"][]>(
    authContext.currentUser ? "/api/follows/requests" : null
  );

  return (
    <>
      <BackButtonHeader title="リクエスト" />
      {!authContext.currentUser || isLoading ? (
        <Center>
          <Spinner thickness="2px" color="gray.300" margin="40px" />
        </Center>
      ) : data && data.length ? (
        <Box>
          <Users users={data} usersCallback={(users) => mutate(users, false)} enableReject />
        </Box>
      ) : null}
    </>
  );
};

export default RequestsPage;
