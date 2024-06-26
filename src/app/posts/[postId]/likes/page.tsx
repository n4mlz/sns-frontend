"use client";

import path from "path";
import useSWR from "swr";
import { Box, Center, Spinner } from "@chakra-ui/react";
import { useAuthContext } from "@/components/contexts/AuthProvider";
import Users from "@/components/ui/users";
import { components } from "@/lib/openapi/schema";
import TitleHeader from "@/components/ui/titleHeader";
import SetUpDialog from "@/components/handle/setUpDialog";

const postLikesPage = ({ params }: { params: { postId: string } }) => {
  const authContext = useAuthContext();

  const { data, isLoading, mutate } = useSWR<components["schemas"]["user"][]>(
    authContext.currentUser ? path.join("/api/posts", params.postId, "/likes") : null
  );

  return (
    <>
      <SetUpDialog />
      <TitleHeader title="いいねした人" />
      {!authContext.currentUser || isLoading ? (
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

export default postLikesPage;
