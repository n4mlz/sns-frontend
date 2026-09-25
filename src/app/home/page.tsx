"use client";

import { Box, Button, Center, Spinner, Text, useColorModeValue } from "@chakra-ui/react";
import { useCallback, useRef, useState } from "react";

import { useAuthContext } from "@/components/contexts/AuthProvider";
import PostButton from "@/components/elements/postButton";
import SetUpDialog from "@/components/handle/setUpDialog";
import InfiniteScroll from "@/components/ui/infiniteScroll";
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
  const [loadError, setLoadError] = useState(false);
  const lastAuthUserId = useRef<string | null | undefined>(undefined);

  const resetPosts = useCallback(() => {
    setPosts([]);
    setHasMore(true);
    setCursor(undefined);
    setLoadError(false);
  }, []);

  const loadMore = useCallback(async () => {
    const authUserId = authContext.currentUser?.uid;
    const authStateChanged = lastAuthUserId.current !== authUserId;

    if (authStateChanged) {
      lastAuthUserId.current = authUserId;
      resetPosts();
    }

    if ((!hasMore && !authStateChanged) || authContext.currentUser === undefined) {
      return;
    }

    if (authContext.currentUser === null) {
      setHasMore(false);
      return;
    }

    try {
      const res = await client.GET("/api/posts/timeline", {
        params: {
          query: {
            limit: domainConsts.CURSOR_PAGINATION_LIMIT,
            cursor: authStateChanged ? undefined : cursor,
          },
        },
      });
      if (!res.response.ok || !res.data) {
        setLoadError(true);
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

      setPosts((currentPosts) => [...currentPosts, ...res.data.posts!]);
    } catch {
      setLoadError(true);
      setHasMore(false);
    }
  }, [authContext.currentUser, cursor, hasMore, resetPosts]);

  const postSubmitCallback = (post: components["schemas"]["post"]) => {
    setPosts((currentPosts) => [post, ...currentPosts]);
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
        ) : loadError ? (
          <Center paddingY="100px" flexDirection="column" gap="12px">
            <Text fontWeight="500" color="gray.400">
              ポストの取得に失敗しました
            </Text>
            <Button size="sm" variant="outline" onClick={resetPosts}>
              再試行
            </Button>
          </Center>
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
