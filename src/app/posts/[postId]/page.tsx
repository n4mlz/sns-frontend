"use client";

import path from "path";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { Box, Center, Flex, Image, Skeleton, SkeletonText, Spinner, Text, Tooltip } from "@chakra-ui/react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAuthContext } from "@/components/contexts/AuthProvider";
import Header from "@/components/elements/header";
import client from "@/lib/openapi";
import { components } from "@/lib/openapi/schema";
import { userIconUrl } from "@/lib/image";
import { getFormattedDate } from "@/utils/time";
import Comments from "@app/posts/[postId]/_components/comments";

const PostPage = ({ params }: { params: { postId: string } }) => {
  const router = useRouter();
  const authContext = useAuthContext();

  const { data, isLoading, mutate, error } = useSWR<components["schemas"]["postDetail"]>(
    authContext.currentUser ? path.join("/api/posts", params.postId).toString() : null
  );

  const like = () => {
    client.PUT("/api/posts/like", { body: { postId: data?.postId } });
    mutate({ ...data, liked: true, likes: data?.likes! + 1 }, false);
  };

  const unlike = () => {
    client.PUT("/api/posts/unlike", { body: { postId: data?.postId } });
    mutate({ ...data, liked: false, likes: data?.likes! - 1 }, false);
  };

  return (
    <>
      <Header title="ポスト" />
      <Box>
        <Flex direction="column" gap="8px" padding="12px" borderBottom="2px" borderColor="gray.200">
          <Flex direction="row" gap="8px">
            <Box
              w="45px"
              h="45px"
              borderRadius="full"
              backgroundColor="gray.200"
              overflow="hidden"
              onClick={() => router.push(path.join("/users", data?.poster?.userName ? data.poster.userName : ""))}>
              <Skeleton isLoaded={authContext.currentUser != undefined && !isLoading}>
                <Image src={userIconUrl(data?.poster?.userName!)} w="45px" h="45px" alt="" />
              </Skeleton>
            </Box>
            <Flex direction="column" gap="4px" flex="1">
              <Flex
                direction="column"
                flex="1"
                onClick={() => router.push(path.join("/users", data?.poster?.userName ? data.poster.userName : ""))}>
                {authContext.currentUser != undefined && !isLoading ? (
                  <>
                    <Text fontWeight={700}>{data?.poster?.displayName}</Text>
                    <Text color="gray.500">{`@${data?.poster?.userName}`}</Text>
                  </>
                ) : (
                  <>
                    <Skeleton w="120px" h="16px" marginY="4px" />
                    <Skeleton w="80px" h="16px" marginY="4px" />
                  </>
                )}
              </Flex>
            </Flex>
          </Flex>
          <SkeletonText isLoaded={authContext.currentUser != undefined && !isLoading} noOfLines={3} marginY="4px">
            <Text fontSize={22} overflowWrap="anywhere" wordBreak="normal" whiteSpace="break-spaces">
              {data?.content}
            </Text>
          </SkeletonText>
          {authContext.currentUser != undefined && !isLoading && (
            <>
              <Text fontSize="sm" color="gray.500">
                {data?.createdAt ? getFormattedDate(data.createdAt) : ""}
              </Text>
              {data?.liked ? (
                <Flex direction="row" gap="8px" alignItems="center">
                  <Tooltip label="いいねを取り消す" bg="gray.500" openDelay={1000}>
                    <Box color="red.500" onClick={unlike}>
                      <FaHeart />
                    </Box>
                  </Tooltip>
                  <Text
                    onClick={() =>
                      router.push(path.join("/posts", params.postId, "/likes"))
                    }>{`${data?.likes}人からのいいね`}</Text>
                </Flex>
              ) : (
                <Flex direction="row" gap="8px" alignItems="center">
                  <Tooltip label="いいね !" bg="gray.500" openDelay={1000}>
                    <Box color="gray.500" onClick={like}>
                      <FaRegHeart />
                    </Box>
                  </Tooltip>
                  <Text
                    onClick={() =>
                      router.push(path.join("/posts", params.postId, "/likes"))
                    }>{`${data?.likes}人からのいいね`}</Text>
                </Flex>
              )}
            </>
          )}
        </Flex>
        {isLoading ? (
          <Center>
            <Spinner thickness="2px" color="gray.300" margin="40px" />
          </Center>
        ) : (
          data && (
            <Comments
              postId={data.postId!}
              comments={data.comments ? data.comments : []}
              commentsCallback={(comments) => mutate({ ...data, comments }, false)}
            />
          )
        )}
      </Box>
    </>
  );
};

export default PostPage;
