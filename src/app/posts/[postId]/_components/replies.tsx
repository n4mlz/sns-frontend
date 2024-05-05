import { Flex } from "@chakra-ui/react";
import { components } from "@/lib/openapi/schema";
import Reply from "@app/posts/[postId]/_components/reply";

type Props = {
  replies: components["schemas"]["reply"][];
  repliesCallback?: (replies: components["schemas"]["reply"][]) => void;
};

const Replies = ({ replies, repliesCallback }: Props) => {
  const replyCallback = (index: number) => {
    return (reply: components["schemas"]["reply"]) => {
      const newReplies = [...replies];
      newReplies[index] = reply;
      repliesCallback?.(newReplies);
    };
  };

  return (
    <Flex direction="column">
      {replies.map((reply, index) => (
        <Reply reply={reply} replyCallback={replyCallback(index)} />
      ))}
    </Flex>
  );
};

export default Replies;
