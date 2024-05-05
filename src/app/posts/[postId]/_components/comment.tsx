"use client";

import path from "path";
import { useRouter } from "next/navigation";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { components } from "@/lib/openapi/schema";
import { userIconUrl } from "@/lib/image";
import { getAboutDate } from "@/utils/time";

type Props = {
  comment: components["schemas"]["comment"];
  commentCallback?: (comment: components["schemas"]["comment"]) => void;
};

const Comment = ({ comment, commentCallback }: Props) => {
  const router = useRouter();

  return (
    <Flex direction="row" gap="8px" padding="12px" borderBottom="2px" borderColor="gray.200">
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
      <Flex direction="column" gap="4px" flex="1">
        <Flex direction="column">
          <Flex direction="row" gap="4px">
            <Text fontWeight={700}>{comment?.commenter?.displayName}</Text>
            <Text color="gray.500">{`@${comment?.commenter?.userName}`}</Text>
            <Text color="gray.500">{`· ${getAboutDate(comment?.createdAt!)}`}</Text>
          </Flex>
          <Text overflowWrap="anywhere" wordBreak="normal" whiteSpace="break-spaces">
            {comment?.content}
          </Text>
        </Flex>
        {/* replies */}
      </Flex>
    </Flex>
  );
};

export default Comment;
