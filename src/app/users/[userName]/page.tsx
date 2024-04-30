"use client";

import path from "path";
import useSWR from "swr";
import { useAuthContext } from "@/components/contexts/AuthProvider";
import { components } from "@/lib/openapi/schema";
import { Box, Button, Container, Flex, Heading, Image, Skeleton, SkeletonText, Text } from "@chakra-ui/react";
import { userBgImageUrl, userIconUrl } from "@/lib/image";
import { CalendarIcon } from "@chakra-ui/icons";
import domainConsts from "@/constants/domain";
import client from "@/lib/openapi";
import { useRouter } from "next/navigation";

const UserPage = ({ params }: { params: { userName: string } }) => {
  const router = useRouter();
  const authContext = useAuthContext();

  const { data, isLoading, mutate, error } = useSWR<components["schemas"]["user"]>(
    authContext.currentUser ? path.join("/api/users", params.userName).toString() : null
  );

  const follow = (afterStatus: string) => {
    client.PUT("/api/follows/follow", { body: { userName: params.userName } });
    mutate({ ...data, followingStatus: afterStatus }, false);
  };

  const unfollow = (afterStatus: string) => {
    client.PUT("/api/follows/unfollow", { body: { userName: params.userName } });
    mutate({ ...data, followingStatus: afterStatus }, false);
  };

  return (
    <Container padding={0}>
      <Box w="100%" aspectRatio={3} backgroundColor="gray.200" overflow="hidden">
        <Skeleton isLoaded={authContext.currentUser != undefined && !isLoading}>
          {!data || !data.userName || error || isLoading ? (
            <Box w="100%" aspectRatio={3} />
          ) : (
            <Image src={userBgImageUrl(data.userName)} w="100%" aspectRatio={3} alt="" />
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
            <Skeleton isLoaded={authContext.currentUser != undefined && !isLoading}>
              {!data || !data.userName || error || isLoading ? (
                <Box w="80px" h="80px" />
              ) : (
                // TODO: 謎の枠線ができてしまうので onerror="this.src=(代替のURL)" などで対処する
                // TODO: 以下を nocache にする (プロフィールを変更しても以前の画像が表示されてしまうため)
                <Image src={userIconUrl(data.userName)} w="80px" h="80px" alt="" />
              )}
            </Skeleton>
          </Box>
        </Box>
        {data?.followingStatus == domainConsts.MUTUAL && (
          <Button borderRadius="full" marginX="10px" marginTop="10px" onClick={() => unfollow(domainConsts.FOLLOWED)}>
            相互フォロー
          </Button>
        )}
        {data?.followingStatus == domainConsts.FOLLOWING && (
          <Button borderRadius="full" marginX="10px" marginTop="10px" onClick={() => unfollow(domainConsts.NONE)}>
            リクエスト中
          </Button>
        )}
        {data?.followingStatus == domainConsts.FOLLOWED && (
          <Button borderRadius="full" marginX="10px" marginTop="10px" onClick={() => follow(domainConsts.MUTUAL)}>
            リクエストを承認する
          </Button>
        )}
        {data?.followingStatus == domainConsts.NONE && (
          <Button borderRadius="full" marginX="10px" marginTop="10px" onClick={() => follow(domainConsts.FOLLOWING)}>
            リクエストする
          </Button>
        )}
        {data?.followingStatus == domainConsts.OWN && (
          <Button borderRadius="full" marginX="10px" marginTop="15px" onClick={() => router.push("/settings/profile")}>
            プロフィールを編集
          </Button>
        )}
      </Flex>
      <Flex direction="column" gap={1} paddingX={6} paddingY={1.5}>
        <Box>
          {authContext.currentUser != undefined && !isLoading ? (
            !data || !data.userName || error ? (
              <>
                <Heading fontSize="24px">存在しないユーザー</Heading>
                <Text color="gray.500">{`@${params.userName}`}</Text>
              </>
            ) : (
              <>
                <Heading fontSize="24px">{data?.displayName}</Heading>
                <Text color="gray.500">{`@${data?.userName}`}</Text>
              </>
            )
          ) : (
            <>
              <Skeleton w="300px" h="28px" marginY="6px" />
              <Skeleton w="100px" h="16px" marginY="6px" />
            </>
          )}
        </Box>
        <SkeletonText isLoaded={authContext.currentUser != undefined && !isLoading} noOfLines={3} marginY="4px">
          <Text>{data?.biography}</Text>
        </SkeletonText>
        {authContext.currentUser != undefined && !isLoading ? (
          <Flex direction="row" gap="6px" alignItems="center">
            <CalendarIcon color="gray.500" />
            <Text color="gray.500">
              {new Date(data?.createdAt!).toLocaleDateString("en-us", { year: "numeric", month: "short" })}
            </Text>
          </Flex>
        ) : null}
      </Flex>
    </Container>
  );
};

export default UserPage;
