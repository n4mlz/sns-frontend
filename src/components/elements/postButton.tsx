"use client";

import usePostModal from "@/hooks/postModal";
import { Box, Flex } from "@chakra-ui/react";
import { LuSend } from "react-icons/lu";

const PostButton = () => {
  const { onOpen, postModal } = usePostModal();

  return (
    <Flex w="100%" maxW="600px" justifyContent="flex-end" position="fixed" bottom="35px">
      <Box
        as="button"
        position="relative"
        w="60px"
        h="60px"
        marginRight="35px"
        backgroundColor="blue.400"
        borderRadius="full">
        {postModal}
        <Box position="absolute" top="16px" left="13.5px">
          <LuSend size="30px" color="white" onClick={onOpen} />
        </Box>
      </Box>
    </Flex>
  );
};

export default PostButton;
