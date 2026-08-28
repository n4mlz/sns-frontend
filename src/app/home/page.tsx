"use client";

import { Box, Center, Spinner, Text, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
// @ts-ignore
import InfiniteScroll from "react-infinite-scroller";

import { useAuthContext } from "@/components/contexts/AuthProvider";
import PostButton from "@/components/elements/postButton";
import SetUpDialog from "@/components/handle/setUpDialog";
import LogoHeader from "@/components/ui/logoHeader";
import Posts from "@/components/ui/posts";
import domainConsts from "@/constants/domain";
import client from "@/lib/openapi";
import { components } from "@/lib/openapi/schema";

const Timeline = () => {
  const authContext = useAuthContext();
  const loaderBorderColor = useColorModeValue("gray.200", "gray.700");
  const postsBorderColor = useColorModeValue("gray.300", "gray.700");

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
      setHasMore(false);
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
          <Center borderTop="1px" borderColor={loaderBorderColor}>
            <Spinner thickness="2px" color="gray.300" margin="40px" />
          </Center>
        }>
        {hasMore || posts.length > 0 ? (
          <Box borderTop="1px" borderColor={postsBorderColor}>
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
