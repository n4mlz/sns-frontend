"use client";

import path from "path";
import { useRouter } from "next/navigation";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { components } from "@/lib/openapi/schema";
import { userIconUrl } from "@/lib/image";
import { getAboutDate } from "@/utils/time";
import Replies from "@app/posts/[postId]/_components/replies";

type Props = {
  comment: components["schemas"]["comment"];
  commentCallback?: (comment: components["schemas"]["comment"]) => void;
};

const Comment = ({ comment, commentCallback }: Props) => {
  const router = useRouter();

  const repliesCallback = (replies: components["schemas"]["reply"][]) => {
    commentCallback?.({ ...comment, replies });
  };

  return (
    <Flex direction="column" gap="16px" padding="12px" borderBottom="2px" borderColor="gray.200">
      <Flex direction="row" gap="8px">
        <Box
          w="45px"
          h="45px"
          borderRadius="full"
          backgroundColor="gray.200"
          overflow="hidden"
          onClick={() =>
            router.push(path.join("/users", comment?.commenter?.userName ? comment.commenter.userName : ""))
          }>
          <Image src={userIconUrl(comment?.commenter?.userName!)} w="45px" h="45px" alt="" />
        </Box>
        <Flex direction="column" flex={1}>
          <Flex direction="row" gap="4px">
            <Text fontWeight={700}>{comment?.commenter?.displayName}</Text>
            <Text color="gray.500">{`@${comment?.commenter?.userName}`}</Text>
            <Text color="gray.500">{`· ${getAboutDate(comment?.createdAt!)}`}</Text>
          </Flex>
          <Text overflowWrap="anywhere" wordBreak="normal" whiteSpace="break-spaces">
            {comment?.content}
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
