"use client";

import path from "path";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import {
  Flex,
  Box,
  Text,
  Tooltip,
  Image,
  useColorModeValue,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FaRegCommentAlt, FaHeart, FaRegHeart } from "react-icons/fa";
import client from "@/lib/openapi";
import { components } from "@/lib/openapi/schema";
import { useAuthContext } from "@components/contexts/AuthProvider";
import useDeletePostDialog from "@/hooks/post/deletePostDialog";
import { getAboutDate } from "@/utils/time";

type Props = {
  post: components["schemas"]["post"];
  postCallback?: (post: components["schemas"]["post"] | null) => void;
};

const Post = ({ post, postCallback }: Props) => {
  const router = useRouter();
  const authContext = useAuthContext();

  const { data } = useSWR<components["schemas"]["profile"]>(authContext.currentUser ? "/api/settings/profile" : null);

  const { onOpen, deletePostDialog } = useDeletePostDialog(post.postId!, postCallback);

  const like = () => {
    client.PUT("/api/posts/like", { body: { postId: post.postId } });
    postCallback?.({ ...post, liked: true, likes: post.likes! + 1 });
  };

  const unlike = () => {
    client.PUT("/api/posts/unlike", { body: { postId: post.postId } });
    postCallback?.({ ...post, liked: false, likes: post.likes! - 1 });
  };

  return (
    <Flex
      direction="row"
      gap="8px"
      padding="12px"
      borderBottom="1px"
      borderColor={useColorModeValue("gray.200", "gray.700")}>
      <Box
        cursor="pointer"
        w="45px"
        h="45px"
        borderRadius="full"
        backgroundColor="gray.200"
        overflow="hidden"
        onClick={() => router.push(path.join("/users", post.poster?.userName ? post.poster?.userName : ""))}>
        <Image src={post.poster?.iconUrl} w="45px" h="45px" alt="" />
      </Box>
      <Flex direction="column" gap="4px" flex="1">
        <Flex direction="column">
          <Flex direction="row" justifyContent="space-between" alignItems="center">
            <Flex
              cursor="pointer"
              direction="row"
              gap="4px"
              onClick={() => router.push(path.join("/posts", post.postId ? post.postId : ""))}>
              <Text fontWeight={700}>{post.poster?.displayName}</Text>
              <Text color="gray.500">{`@${post.poster?.userName}`}</Text>
              <Text color="gray.500">{`· ${getAboutDate(post.createdAt!)}`}</Text>
            </Flex>
            {post.poster?.userName === data?.userName && (
              <Menu>
                <MenuButton>
                  <ChevronDownIcon fontSize="20px" color="gray.500" />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={onOpen}>ポストを削除</MenuItem>
                  {deletePostDialog}
                </MenuList>
              </Menu>
            )}
          </Flex>
          <Text
            cursor="pointer"
            overflowWrap="anywhere"
            wordBreak="normal"
            whiteSpace="break-spaces"
            onClick={() => router.push(path.join("/posts", post.postId ? post.postId : ""))}>
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
            <Tooltip label="コメントする" bg={useColorModeValue("gray.500", "white")} openDelay={1000}>
              <Box>
                <FaRegCommentAlt />
              </Box>
            </Tooltip>
            <Text>{post.comments}</Text>
          </Flex>
          {post.liked ? (
            <Flex cursor="pointer" direction="row" gap="6px" alignItems="center" color="red.500" onClick={unlike}>
              <Tooltip label="いいねを取り消す" bg={useColorModeValue("gray.500", "white")} openDelay={1000}>
                <Box>
                  <FaHeart />
                </Box>
              </Tooltip>
              <Text>{post.likes}</Text>
            </Flex>
          ) : (
            <Flex cursor="pointer" direction="row" gap="6px" alignItems="center" color="gray.500" onClick={like}>
              <Tooltip label="いいね !" bg={useColorModeValue("gray.500", "white")} openDelay={1000}>
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
