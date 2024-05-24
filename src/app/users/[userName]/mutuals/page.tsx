"use client";

import path from "path";
import { useEffect } from "react";
import useSWR from "swr";
import { Box, Center, Spinner } from "@chakra-ui/react";
import { useAuthContext } from "@/components/contexts/AuthProvider";
import Users from "@/components/ui/users";
import { components } from "@/lib/openapi/schema";
import TitleHeader from "@/components/ui/titleHeader";

const UserMutualsPage = ({ params }: { params: { userName: string } }) => {
  const authContext = useAuthContext();

  const { data, isLoading, mutate } = useSWR<components["schemas"]["user"][]>(
    path.join("/api/users", params.userName, "/mutuals")
  );

  useEffect(() => {
    mutate();
  }, [authContext.currentUser]);

  return (
    <>
      <TitleHeader title="相互フォロー" />
      {isLoading ? (
        <Center>
          <Spinner thickness="2px" color="gray.300" margin="40px" />
        </Center>
      ) : data && data.length ? (
        <Box>
          <Users users={data} usersCallback={(users) => mutate(users, false)} />
        </Box>
      ) : null}
    </>
  );
};

export default UserMutualsPage;
