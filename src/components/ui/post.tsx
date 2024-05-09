"use client";

import path from "path";
import { useRouter } from "next/navigation";
import { Flex, Box, Text, Tooltip, Image } from "@chakra-ui/react";
import { FaRegCommentAlt, FaHeart, FaRegHeart } from "react-icons/fa";
import client from "@/lib/openapi";
import { components } from "@/lib/openapi/schema";
import { userIconUrl } from "@/lib/image";
import { getAboutDate } from "@/utils/time";

type Props = { post: components["schemas"]["post"]; postCallback?: (post: components["schemas"]["post"]) => void };

const Post = ({ post, postCallback }: Props) => {
  const router = useRouter();

  const like = () => {
    client.PUT("/api/posts/like", { body: { postId: post.postId } });
    postCallback?.({ ...post, liked: true, likes: post.likes! + 1 });
  };

  const unlike = () => {
    client.PUT("/api/posts/unlike", { body: { postId: post.postId } });
    postCallback?.({ ...post, liked: false, likes: post.likes! - 1 });
  };

  return (
    <Flex direction="row" gap="8px" padding="12px" borderBottom="2px" borderColor="gray.200">
      <Box
        cursor="pointer"
        w="45px"
        h="45px"
        borderRadius="full"
        backgroundColor="gray.200"
        overflow="hidden"
        onClick={() => router.push(path.join("/users", post.poster?.userName ? post.poster?.userName : ""))}>
        <Image src={userIconUrl(post.poster?.userName!)} w="45px" h="45px" alt="" />
      </Box>
      <Flex direction="column" gap="4px" flex="1">
        <Flex
          cursor="pointer"
          direction="column"
          onClick={() => router.push(path.join("/posts", post.postId ? post.postId : ""))}>
          <Flex direction="row" gap="4px">
            <Text fontWeight={700}>{post.poster?.displayName}</Text>
            <Text color="gray.500">{`@${post.poster?.userName}`}</Text>
            <Text color="gray.500">{`· ${getAboutDate(post.createdAt!)}`}</Text>
          </Flex>
          <Text overflowWrap="anywhere" wordBreak="normal" whiteSpace="break-spaces">
            {post.content}
          </Text>
        </Flex>
        <Flex direction="row" gap="16px">
          <Flex
            cursor="pointer"
            direction="row"
            gap="6px"
            alignItems="center"
            color="gray.500"
            onClick={() => router.push(path.join("/posts", post.postId ? post.postId : ""))}>
            <Tooltip label="コメントする" bg="gray.500" openDelay={1000}>
              <Box>
                <FaRegCommentAlt />
              </Box>
            </Tooltip>
            <Text>{post.comments}</Text>
          </Flex>
          {post.liked ? (
            <Flex cursor="pointer" direction="row" gap="6px" alignItems="center" color="red.500" onClick={unlike}>
              <Tooltip label="いいねを取り消す" bg="gray.500" openDelay={1000}>
                <Box>
                  <FaHeart />
                </Box>
              </Tooltip>
              <Text>{post.likes}</Text>
            </Flex>
          ) : (
            <Flex cursor="pointer" direction="row" gap="6px" alignItems="center" color="gray.500" onClick={like}>
              <Tooltip label="いいね !" bg="gray.500" openDelay={1000}>
                <Box>
                  <FaRegHeart />
                </Box>
              </Tooltip>
              <Text>{post.likes}</Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Post;
