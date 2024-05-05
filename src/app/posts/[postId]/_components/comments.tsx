"use client";

import useSWR from "swr";
import { Flex, Box, Button, Skeleton, Image } from "@chakra-ui/react";
import { useAuthContext } from "@/components/contexts/AuthProvider";
import { components } from "@/lib/openapi/schema";
import useCommentModal from "@/hooks/commentModal";
import Comment from "@app/posts/[postId]/_components/comment";
import { userIconUrl } from "@/lib/image";

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
        <Flex direction="row" alignItems="center" padding="12px">
          <Box w="45px" h="45px" borderRadius="full" backgroundColor="gray.200" overflow="hidden">
            <Skeleton isLoaded={authContext.currentUser != undefined && !isLoading}>
              <Image src={userIconUrl(data?.userName!)} w="45px" h="45px" alt="" />
            </Skeleton>
          </Box>
          <Button
            onClick={onOpen}
            margin="8px"
            size="sm"
            color="blue.500"
            backgroundColor="white"
            border="1px"
            borderColor="blue.500"
            borderRadius="full">
            コメントする
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default Comments;
