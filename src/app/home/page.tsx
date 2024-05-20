"use client";

import useSWR from "swr";
import { Box, Center, Spinner, Text, useColorModeValue } from "@chakra-ui/react";
import { useAuthContext } from "@/components/contexts/AuthProvider";
import { components } from "@/lib/openapi/schema";
import SetUpDialog from "@/components/handle/setUpDialog";
import Posts from "@/components/ui/posts";
import MenuHeader from "@/components/ui/menuHeader";
import PostButton from "@/components/elements/postButton";

const Timeline = () => {
  const authContext = useAuthContext();

  const { data, isLoading, mutate, error } = useSWR<components["schemas"]["post"][]>(
    authContext.currentUser ? "/api/posts/timeline" : null
  );

  const postSubmitCallback = (post: components["schemas"]["post"]) => {
    mutate([post, ...(data ? data : [])], false);
  };

  return (
    <Box>
      <SetUpDialog />
      <MenuHeader />
      <PostButton submitCallback={postSubmitCallback} />
      {isLoading ? (
        <Center borderTop="1px" borderColor={useColorModeValue("gray.200", "gray.700")}>
          <Spinner thickness="2px" color="gray.300" margin="40px" />
        </Center>
      ) : data && data.length ? (
        <Box borderTop="1px" borderColor={useColorModeValue("gray.300", "gray.700")}>
          <Posts posts={data} postsCallback={(posts) => mutate(posts, false)} />
        </Box>
      ) : (
        data !== undefined && (
          <Center paddingY="100px">
            <Text fontWeight="500" color="gray.400">
              表示するポストがありません
            </Text>
          </Center>
        )
      )}
    </Box>
  );
};

export default Timeline;
