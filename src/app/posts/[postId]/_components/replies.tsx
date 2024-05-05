import { Flex, Box, Button } from "@chakra-ui/react";
import { components } from "@/lib/openapi/schema";
import useReplyModal from "@/hooks/replyModal";
import Reply from "@app/posts/[postId]/_components/reply";

type Props = {
  commentId: string;
  replies: components["schemas"]["reply"][];
  repliesCallback?: (replies: components["schemas"]["reply"][]) => void;
};

const Replies = ({ commentId, replies, repliesCallback }: Props) => {
  const replyCallback = (index: number) => {
    return (reply: components["schemas"]["reply"]) => {
      const newReplies = [...replies];
      newReplies[index] = reply;
      repliesCallback?.(newReplies);
    };
  };

  const replySubmitCallback = (reply: components["schemas"]["reply"]) => {
    repliesCallback?.([...replies, reply]);
  };

  const { onOpen, replyModal } = useReplyModal(commentId, replySubmitCallback);

  return (
    <>
      {replyModal}
      <Flex direction="column" gap="12px">
        {replies.length > 0 && (
          <Flex direction="column" gap="12px">
            {replies.map((reply, index) => (
              <Reply reply={reply} replyCallback={replyCallback(index)} />
            ))}
          </Flex>
        )}
        <Box>
          <Button
            onClick={onOpen}
            marginX="4px"
            size="sm"
            color="blue.500"
            backgroundColor="white"
            border="1px"
            borderColor="blue.500"
            borderRadius="full">
            返信を追加
          </Button>
        </Box>
      </Flex>
    </>
  );
};

export default Replies;
