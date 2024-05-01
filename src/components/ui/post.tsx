import { userIconUrl } from "@/lib/image";
import { components } from "@/lib/openapi/schema";
import { getFormattedDate } from "@/utils/time";
import { Flex, Box, Text, Image } from "@chakra-ui/react";

type Props = { post: components["schemas"]["post"] };

const Post = ({ post }: Props) => {
  return (
    <Flex direction="row">
      <Box w="40px" h="40px" borderRadius="full" backgroundColor="gray.200" overflow="hidden">
        <Image src={userIconUrl(post.poster?.userName!)} w="40px" h="40px" alt="" />
      </Box>
      <Flex direction="column">
        <Flex direction="row" gap="4px">
          <Text fontWeight={700}>{post.poster?.displayName}</Text>
          <Text color="gray.500">{`@${post.poster?.userName}`}</Text>
          <Text color="gray.500">{getFormattedDate(post.createdAt!)}</Text>
        </Flex>
        <Text>{post.content}</Text>
      </Flex>
    </Flex>
  );
};

export default Post;
