"use client";

import path from "path";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { Flex, Box, Heading, Button, Text, Skeleton, SkeletonText, Image } from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import { useAuthContext } from "@/components/contexts/AuthProvider";
import Posts from "@/components/ui/posts";
import client from "@/lib/openapi";
import { components } from "@/lib/openapi/schema";
import { userBgImageUrl, userIconUrl } from "@/lib/image";
import domainConsts from "@/constants/domain";
import PageBackButton from "@/components/elements/pageBackButton";

const UserPage = ({ params }: { params: { userName: string } }) => {
  const router = useRouter();
  const authContext = useAuthContext();

  const {
    data: userData,
    isLoading: isLoadingUser,
    mutate: userMutate,
    error: userError,
  } = useSWR<components["schemas"]["user"]>(
    authContext.currentUser ? path.join("/api/users", params.userName).toString() : null
  );

  const {
    data: postsData,
    isLoading: isLoadingPosts,
    error: postsError,
  } = useSWR<components["schemas"]["post"][]>(
    authContext.currentUser ? path.join("/api/users", params.userName, "/posts") : null
  );

  const follow = (afterStatus: string) => {
    client.PUT("/api/follows/follow", { body: { userName: params.userName } });
    userMutate({ ...userData, followingStatus: afterStatus }, false);
  };

  const unfollow = (afterStatus: string) => {
    client.PUT("/api/follows/unfollow", { body: { userName: params.userName } });
    userMutate({ ...userData, followingStatus: afterStatus }, false);
  };

  return (
    <Box padding={0}>
      <PageBackButton />
      <Box>
        <Box w="100%" aspectRatio={3} backgroundColor="gray.200" overflow="hidden">
          <Skeleton isLoaded={authContext.currentUser != undefined && !isLoadingUser}>
            {!userData || !userData.userName || userError || isLoadingUser ? (
              <Box w="100%" aspectRatio={3} />
            ) : (
              <Image src={userBgImageUrl(userData.userName)} w="100%" aspectRatio={3} alt="" />
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
              border="4px solid white"
              borderRadius="44px"
              backgroundColor="gray.200"
              overflow="hidden">
              <Skeleton isLoaded={authContext.currentUser != undefined && !isLoadingUser}>
                {!userData || !userData.userName || userError || isLoadingUser ? (
                  <Box w="80px" h="80px" />
                ) : (
                  // TODO: 謎の枠線ができてしまうので onerror="this.src=(代替のURL)" などで対処する
                  // TODO: 以下を nocache にする (プロフィールを変更しても以前の画像が表示されてしまうため)
                  <Image src={userIconUrl(userData.userName)} w="80px" h="80px" alt="" />
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
              リクエストする
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
        <Flex direction="column" gap={1} paddingX={6} paddingY={1.5}>
          <Box>
            {authContext.currentUser != undefined && !isLoadingUser ? (
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
          <SkeletonText isLoaded={authContext.currentUser != undefined && !isLoadingUser} noOfLines={3} marginY="4px">
            <Text>{userData?.biography}</Text>
          </SkeletonText>
          {authContext.currentUser != undefined && !isLoadingUser ? (
            <Flex direction="row" gap="6px" alignItems="center">
              <CalendarIcon color="gray.500" />
              <Text color="gray.500">
                {new Date(userData?.createdAt!).toLocaleDateString("en-us", { year: "numeric", month: "short" })}
              </Text>
            </Flex>
          ) : null}
        </Flex>
      </Box>
      <Button onClick={() => client.POST("/api/posts", { body: { content: "hello, world!" } })}>post</Button>
      <Box>{postsData ? <Posts posts={postsData} /> : null}</Box>
    </Box>
  );
};

export default UserPage;
