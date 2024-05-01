import { Flex, Box, Text, Tooltip, Image } from "@chakra-ui/react";
import { FaRegCommentAlt, FaHeart, FaRegHeart } from "react-icons/fa";
import client from "@/lib/openapi";
import { components } from "@/lib/openapi/schema";
import { userIconUrl } from "@/lib/image";
import { getFormattedDate } from "@/utils/time";

type Props = { post: components["schemas"]["post"]; postCallback?: (post: components["schemas"]["post"]) => void };

const Post = ({ post, postCallback }: Props) => {
  const like = () => {
    client.PUT("/api/posts/like", { body: { postId: post.postId } });
    postCallback?.({ ...post, liked: true, likes: post.likes ? post.likes + 1 : undefined });
  };

  const unlike = () => {
    client.PUT("/api/posts/unlike", { body: { postId: post.postId } });
    postCallback?.({ ...post, liked: false, likes: post.likes ? post.likes - 1 : undefined });
  };

  return (
    <Flex direction="row" gap="8px" padding="12px">
      <Box w="45px" h="45px" borderRadius="full" backgroundColor="gray.200" overflow="hidden">
        <Image src={userIconUrl(post.poster?.userName!)} w="45px" h="45px" alt="" />
      </Box>
      <Flex direction="column" gap="4px">
        <Flex direction="column">
          <Flex direction="row" gap="4px">
            <Text fontWeight={700}>{post.poster?.displayName}</Text>
            <Text color="gray.500">{`@${post.poster?.userName}`}</Text>
            <Text color="gray.500">{`· ${getFormattedDate(post.createdAt!)}`}</Text>
          </Flex>
          <Text>{post.content}</Text>
        </Flex>
        <Flex direction="row" gap="16px">
          <Flex direction="row" gap="6px" alignItems="center" color="gray.500">
            <Tooltip label="コメントする" bg="gray.500" openDelay={1000}>
              <Box>
                <FaRegCommentAlt />
              </Box>
            </Tooltip>
            <Text>{post.comments}</Text>
          </Flex>
          {post.liked ? (
            <Flex direction="row" gap="6px" alignItems="center" color="red.500">
              <Tooltip label="いいねを取り消す" bg="gray.500" openDelay={1000}>
                <Box onClick={unlike}>
                  <FaHeart />
                </Box>
              </Tooltip>
              <Text>{post.likes}</Text>
            </Flex>
          ) : (
            <Flex direction="row" gap="6px" alignItems="center" color="gray.500">
              <Tooltip label="いいね !" bg="gray.500" openDelay={500}>
                <Box onClick={like}>
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
