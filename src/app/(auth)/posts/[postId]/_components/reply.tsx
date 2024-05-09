import path from "path";
import { useRouter } from "next/navigation";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { components } from "@/lib/openapi/schema";
import { userIconUrl } from "@/lib/image";
import { getAboutDate } from "@/utils/time";

type Props = {
  reply: components["schemas"]["reply"];
  replyCallback?: (reply: components["schemas"]["reply"]) => void;
};

const Reply = ({ reply, replyCallback }: Props) => {
  const router = useRouter();

  return (
    <Flex direction="row" gap="8px">
      <Box
        cursor="pointer"
        w="45px"
        h="45px"
        borderRadius="full"
        backgroundColor="gray.200"
        overflow="hidden"
        onClick={() => router.push(path.join("/users", reply?.replier?.userName ? reply.replier.userName : ""))}>
        <Image src={userIconUrl(reply?.replier?.userName!)} w="45px" h="45px" alt="" />
      </Box>
      <Flex direction="column" gap="4px" flex="1">
        <Flex direction="column">
          <Flex direction="row" gap="4px">
            <Text fontWeight={700}>{reply?.replier?.displayName}</Text>
            <Text color="gray.500">{`@${reply?.replier?.userName}`}</Text>
            <Text color="gray.500">{`· ${getAboutDate(reply?.createdAt!)}`}</Text>
          </Flex>
          <Text overflowWrap="anywhere" wordBreak="normal" whiteSpace="break-spaces">
            {reply?.content}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Reply;
