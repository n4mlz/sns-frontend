"use client";

import useSWR from "swr";
import { Flex, Box, Button, Skeleton, Image, useColorModeValue } from "@chakra-ui/react";
import { useAuthContext } from "@/components/contexts/AuthProvider";
import UserIcon from "@/components/ui/userIcon";
import { components } from "@/lib/openapi/schema";
import useCommentModal from "@/hooks/comment/commentModal";
import Comment from "@/app/posts/[postId]/_components/comment";

type Props = {
  postId: string;
  comments: components["schemas"]["comment"][];
  commentsCallback?: (comments: components["schemas"]["comment"][]) => void;
};

const Comments = ({ postId, comments, commentsCallback }: Props) => {
  const authContext = useAuthContext();

  const { data, isLoading } = useSWR<components["schemas"]["profile"]>(
    authContext.currentUser ? "/api/settings/profile" : null
  );

  const commentCallback = (index: number) => {
    return (comment: components["schemas"]["comment"] | null) => {
      const newComments = [...comments];
      if (comment) {
        newComments[index] = comment;
      } else {
        newComments.splice(index, 1);
      }
      commentsCallback?.(newComments);
    };
  };

  const commentSubmitCallback = (comment: components["schemas"]["comment"]) => {
    commentsCallback?.([...comments, comment]);
  };

  const { onOpen, commentModal } = useCommentModal(postId, commentSubmitCallback);

  return (
    <>
      {commentModal}
      <Box>
        <Flex direction="column">
          {comments.map((comment, index) => (
            <Comment comment={comment} commentCallback={commentCallback(index)} />
          ))}
        </Flex>
        <Flex direction="row" alignItems="center" padding="12px">
          <UserIcon
            user={data!}
            size="45px"
            isLoading={authContext.currentUser == undefined || isLoading}
            disableClick
          />
          <Button
            onClick={onOpen}
            margin="8px"
            size="sm"
            color="primary.400"
            backgroundColor={useColorModeValue("white", "gray.800")}
            border="1px"
            borderColor="primary.400"
            borderRadius="full">
            コメントする
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default Comments;
