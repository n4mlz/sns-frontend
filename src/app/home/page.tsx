"use client";

import { useState } from "react";
import { Box, Center, Spinner, Text, useColorModeValue } from "@chakra-ui/react";
// @ts-ignore
import InfiniteScroll from "react-infinite-scroller";
import { useAuthContext } from "@/components/contexts/AuthProvider";
import client from "@/lib/openapi";
import { components } from "@/lib/openapi/schema";
import SetUpDialog from "@/components/handle/setUpDialog";
import Posts from "@/components/ui/posts";
import LogoHeader from "@/components/ui/logoHeader";
import PostButton from "@/components/elements/postButton";
import domainConsts from "@/constants/domain";

const Timeline = () => {
  const authContext = useAuthContext();

  const [posts, setPosts] = useState<components["schemas"]["post"][]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState<string | undefined>();

  const loadMore = async () => {
    if (!hasMore || authContext.currentUser === undefined) {
      return;
    }

    if (authContext.currentUser === null) {
      setHasMore(false);
      return;
    }

    const res = await client.GET("/api/posts/timeline", {
      params: { query: { limit: domainConsts.CURSOR_PAGINATION_LIMIT, cursor: cursor } },
    });
    if (!res.response.ok || !res.data) {
      return;
    }

    if (res.data.nextCursor) {
      setCursor(res.data.nextCursor);
    } else {
      setHasMore(false);
    }

    if (!res.data.posts) {
      return;
    }

    setPosts([...posts, ...res.data.posts]);
  };

  const postSubmitCallback = (post: components["schemas"]["post"]) => {
    setPosts([post, ...posts]);
  };

  const resetPosts = () => {
    setPosts([]);
    setHasMore(true);
    setCursor(undefined);
  };

  return (
    <Box>
      <SetUpDialog />
      <LogoHeader onLogoClick={resetPosts} />
      <PostButton submitCallback={postSubmitCallback} />
      <InfiniteScroll
        loadMore={loadMore}
        hasMore={hasMore}
        loader={
          <Center borderTop="1px" borderColor={useColorModeValue("gray.200", "gray.700")}>
            <Spinner thickness="2px" color="gray.300" margin="40px" />
          </Center>
        }>
        {hasMore || posts.length > 0 ? (
          <Box borderTop="1px" borderColor={useColorModeValue("gray.300", "gray.700")}>
            <Posts posts={posts} postsCallback={(posts) => setPosts(posts)} />
          </Box>
        ) : (
          <Center paddingY="100px">
            <Text fontWeight="500" color="gray.400">
              表示するポストがありません
            </Text>
          </Center>
        )}
      </InfiniteScroll>
    </Box>
  );
};

export default Timeline;
