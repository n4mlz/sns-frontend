"use client";

import path from "path";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { Box, Flex, Menu, MenuButton, MenuItem, MenuList, Text, useColorModeValue } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Linkify from "linkify-react";
import { components } from "@/lib/openapi/schema";
import { useAuthContext } from "@/components/contexts/AuthProvider";
import UserIcon from "@/components/ui/userIcon";
import useDeleteCommentDialog from "@/hooks/comment/deleteCommentDialog";
import { getAboutDate } from "@/utils/time";
import Replies from "@/app/posts/[postId]/_components/replies";

type Props = {
  comment: components["schemas"]["comment"];
  commentCallback?: (comment: components["schemas"]["comment"] | null) => void;
};

const Comment = ({ comment, commentCallback }: Props) => {
  const router = useRouter();
  const authContext = useAuthContext();

  const { data } = useSWR<components["schemas"]["profile"]>(authContext.currentUser ? "/api/settings/profile" : null);

  const { onOpen, deleteCommentDialog } = useDeleteCommentDialog(comment.commentId!, commentCallback);

  const repliesCallback = (replies: components["schemas"]["reply"][]) => {
    commentCallback?.({ ...comment, replies });
  };

  return (
    <Flex
      direction="column"
      gap="16px"
      padding="12px"
      borderBottom="1px"
      borderColor={useColorModeValue("gray.200", "gray.700")}>
      <Flex direction="row" gap="8px">
        <UserIcon user={comment.commenter!} size="45px" />
        <Flex direction="column" flex={1}>
          <Flex direction="row" justifyContent="space-between" alignItems="center">
            <Flex
              cursor="pointer"
              direction="row"
              gap="4px"
              onClick={() =>
                router.push(path.join("/users", comment?.commenter?.userName ? comment.commenter.userName : ""))
              }>
              <Text fontWeight={700}>{comment?.commenter?.displayName}</Text>
              <Text color="gray.500">{`@${comment?.commenter?.userName}`}</Text>
              <Text color="gray.500">{`· ${getAboutDate(comment?.createdAt!)}`}</Text>
            </Flex>
            {comment.commenter?.userName === data?.userName && (
              <Menu>
                <MenuButton>
                  <ChevronDownIcon fontSize="20px" color="gray.500" />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={onOpen}>コメントを削除</MenuItem>
                  {deleteCommentDialog}
                </MenuList>
              </Menu>
            )}
          </Flex>
          <Text overflowWrap="anywhere" wordBreak="normal" whiteSpace="break-spaces">
            <Linkify>{comment?.content}</Linkify>
          </Text>
        </Flex>
      </Flex>
      <Box marginLeft="40px">
        <Replies
          commentId={comment.commentId!}
          replies={comment.replies ? comment.replies : []}
          repliesCallback={repliesCallback}
        />
      </Box>
    </Flex>
  );
};

export default Comment;
