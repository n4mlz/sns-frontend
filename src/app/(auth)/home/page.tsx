"use client";

import useSWR from "swr";
import { Box, Center, Spinner } from "@chakra-ui/react";
import { useAuthContext } from "@/components/contexts/AuthProvider";
import { components } from "@/lib/openapi/schema";
import Posts from "@/components/ui/posts";
import MenuHeader from "@/components/ui/menuHeader";
import PostButton from "@/components/elements/postButton";

const Timeline = () => {
  const authContext = useAuthContext();

  const { data, isLoading, mutate } = useSWR<components["schemas"]["post"][]>(
    authContext.currentUser ? "/api/posts/timeline" : null
  );

  const postSubmitCallback = (post: components["schemas"]["post"]) => {
    mutate([post, ...(data ? data : [])], false);
  };

  return (
    <Box>
      <MenuHeader />
      <PostButton submitCallback={postSubmitCallback} />
      {isLoading ? (
        <Center borderTop="2px" borderColor="gray.200">
          <Spinner thickness="2px" color="gray.300" margin="40px" />
        </Center>
      ) : (
        data &&
        data.length && (
          <Box borderTop="2px" borderColor="gray.300">
            <Posts posts={data} postsCallback={(posts) => mutate(posts, false)} />
          </Box>
        )
      )}
    </Box>
  );
};

export default Timeline;