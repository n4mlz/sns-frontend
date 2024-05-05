"use client";

import { Flex, Box, Button } from "@chakra-ui/react";
import { components } from "@/lib/openapi/schema";
import useCommentModal from "@/hooks/commentModal";
import Comment from "@app/posts/[postId]/_components/comment";

type Props = {
  postId: string;
  comments: components["schemas"]["comment"][];
  commentsCallback?: (comments: components["schemas"]["comment"][]) => void;
};

const Comments = ({ postId, comments, commentsCallback }: Props) => {
  const commentCallback = (index: number) => {
    return (comment: components["schemas"]["comment"]) => {
      const newComments = [...comments];
      newComments[index] = comment;
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
        <Button
          onClick={onOpen}
          margin="8px"
          color="blue.500"
          backgroundColor="white"
          border="1px"
          borderColor="blue.500"
          borderRadius="full">
          コメントする
        </Button>
      </Box>
    </>
  );
};

export default Comments;
