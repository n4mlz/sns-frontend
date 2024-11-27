"use client";

import path from "path";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import {
  Flex,
  Box,
  Center,
  Heading,
  Button,
  Text,
  Skeleton,
  SkeletonText,
  Spinner,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
// @ts-ignore
import InfiniteScroll from "react-infinite-scroller";
import { useAuthContext } from "@/components/contexts/AuthProvider";
import TransparentHeader from "@/components/ui/transparentHeader";
import Posts from "@/components/ui/posts";
import { CustomLinkify } from "@/components/elements/customLinkify";
import client from "@/lib/openapi";
import { components } from "@/lib/openapi/schema";
import domainConsts from "@/constants/domain";
import PostButton from "@/components/elements/postButton";
import useSetUpDialog from "@/hooks/setUpDialog";

const UserPage = ({ params }: { params: { userName: string } }) => {
  const router = useRouter();
  const authContext = useAuthContext();
  const { onOpen, setUpDialog } = useSetUpDialog();

  const { data: profileData } = useSWR<components["schemas"]["profile"]>(
    authContext.currentUser ? "/api/settings/profile" : null
  );

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

    const res = await client.GET("/api/users/{userName}/posts", {
      params: {
        path: { userName: params.userName },
        query: { limit: domainConsts.CURSOR_PAGINATION_LIMIT, cursor: cursor },
      },
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
    if (profileData?.userName === params.userName) setPosts([post, ...posts]);
  };

  const {
    data: userData,
    isLoading: isLoadingUser,
    mutate: userMutate,
    error: userError,
  } = useSWR<components["schemas"]["userDetail"]>(path.join("/api/users", params.userName).toString());

  const follow = (afterStatus: string) => {
    onOpen();
    client.PUT("/api/follows/follow", { body: { userName: params.userName } });
    if (afterStatus == domainConsts.MUTUAL) {
      userMutate({ ...userData, followingStatus: afterStatus, mutuals: userData?.mutuals! + 1 }, false);
    } else {
      userMutate({ ...userData, followingStatus: afterStatus }, false);
    }
  };

  const unfollow = (afterStatus: string) => {
    onOpen();
    client.PUT("/api/follows/unfollow", { body: { userName: params.userName } });
    if (afterStatus == domainConsts.FOLLOWED) {
      userMutate({ ...userData, followingStatus: afterStatus, mutuals: userData?.mutuals! - 1 }, false);
    } else {
      userMutate({ ...userData, followingStatus: afterStatus }, false);
    }
  };

  useEffect(() => {
    userMutate();
  }, [authContext.currentUser]);

  return (
    <Box padding={0}>
      {setUpDialog}
      <TransparentHeader />
      <PostButton submitCallback={postSubmitCallback} />
      <Box paddingBottom="8px">
        <Box w="100%" aspectRatio={3} backgroundColor={useColorModeValue("gray.200", "gray.900")} overflow="hidden">
          <Skeleton isLoaded={!isLoadingUser}>
            {!userData || !userData.userName || userError || isLoadingUser || userData.bgImageUrl == "" ? (
              <Box w="100%" aspectRatio={3} />
            ) : (
              <Image src={userData.bgImageUrl} w="100%" aspectRatio={3} alt="" />
            )}
          </Skeleton>
        </Box>
        <Flex direction="row" justifyContent="space-between" alignItems="center">
          <Box position="relative" marginBottom="44px">
            <Box
              w="88px"
              h="88px"
              position="absolute"
              top="-44px"
              left="10px"
              border="4px"
              borderColor={useColorModeValue("white", "gray.800")}
              borderRadius="44px"
              backgroundColor={useColorModeValue("gray.200", "gray.900")}
              overflow="hidden">
              <Skeleton isLoaded={!isLoadingUser}>
                {!userData || !userData.userName || userError || isLoadingUser || userData.iconUrl == "" ? (
                  <Box w="80px" h="80px" />
                ) : (
                  <Image src={userData.iconUrl} w="80px" h="80px" alt="" />
                )}
              </Skeleton>
            </Box>
          </Box>
          {userData?.followingStatus == domainConsts.MUTUAL && (
            <Button borderRadius="full" marginX="10px" marginTop="10px" onClick={() => unfollow(domainConsts.FOLLOWED)}>
              相互フォロー
            </Button>
          )}
          {userData?.followingStatus == domainConsts.FOLLOWING && (
            <Button borderRadius="full" marginX="10px" marginTop="10px" onClick={() => unfollow(domainConsts.NONE)}>
              リクエスト中
            </Button>
          )}
          {userData?.followingStatus == domainConsts.FOLLOWED && (
            <Button borderRadius="full" marginX="10px" marginTop="10px" onClick={() => follow(domainConsts.MUTUAL)}>
              リクエストを承認する
            </Button>
          )}
          {userData?.followingStatus == domainConsts.NONE && (
            <Button borderRadius="full" marginX="10px" marginTop="10px" onClick={() => follow(domainConsts.FOLLOWING)}>
              リクエスト
            </Button>
          )}
          {userData?.followingStatus == domainConsts.OWN && (
            <Button
              borderRadius="full"
              marginX="10px"
              marginTop="15px"
              onClick={() => router.push("/settings/profile")}>
              プロフィールを編集
            </Button>
          )}
        </Flex>
        <Flex direction="column" gap={1} paddingX={5} paddingY={1.5}>
          <Box>
            {!isLoadingUser ? (
              !userData || !userData.userName || userError ? (
                <>
                  <Heading fontSize="24px">存在しないユーザー</Heading>
                  <Text color="gray.500">{`@${params.userName}`}</Text>
                </>
              ) : (
                <>
                  <Heading fontSize="24px">{userData?.displayName}</Heading>
                  <Text color="gray.500">{`@${userData?.userName}`}</Text>
                </>
              )
            ) : (
              <>
                <Skeleton w="300px" h="28px" marginY="6px" />
                <Skeleton w="100px" h="16px" marginY="6px" />
              </>
            )}
          </Box>
          <SkeletonText isLoaded={!isLoadingUser} noOfLines={3} marginY="4px">
            <Text>
              <CustomLinkify>{userData?.biography}</CustomLinkify>
            </Text>
          </SkeletonText>
          {!isLoadingUser && (
            <>
              <Flex direction="column" gap="8px">
                <Flex direction="row" gap="6px" alignItems="center">
                  <CalendarIcon color="gray.500" />
                  <Text color="gray.500">
                    {new Date(userData?.createdAt!).toLocaleDateString("en-us", { year: "numeric", month: "short" })}
                  </Text>
                </Flex>
                <Flex
                  cursor="pointer"
                  direction="row"
                  gap="6px"
                  alignItems="center"
                  onClick={() => router.push(path.join("/users", userData?.userName!, "/mutuals"))}>
                  <Text fontWeight={700}>{userData?.mutuals}</Text>
                  <Text fontWeight={700}>相互フォロー</Text>
                </Flex>
              </Flex>
            </>
          )}
        </Flex>
      </Box>
      <Box>
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
    </Box>
  );
};

export default UserPage;
