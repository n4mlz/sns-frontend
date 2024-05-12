"use client";

import usePostModal from "@/hooks/postModal";
import { Box, Flex } from "@chakra-ui/react";
import { LuSend } from "react-icons/lu";
import { components } from "@/lib/openapi/schema";

type Props = {
  submitCallback?: (comment: components["schemas"]["post"]) => any;
};

const PostButton = ({ submitCallback }: Props) => {
  const { onOpen, postModal } = usePostModal(submitCallback);

  return (
    <Flex w="100%" maxW="600px" justifyContent="flex-end" position="fixed" bottom="35px">
      <Box
        as="button"
        position="relative"
        w="60px"
        h="60px"
        marginRight="35px"
        backgroundColor="primary.300"
        borderRadius="full">
        {postModal}
        <Box cursor="pointer" position="absolute" top="16px" left="13.5px">
          <LuSend size="30px" color="white" onClick={onOpen} />
        </Box>
      </Box>
    </Flex>
  );
};

export default PostButton;
