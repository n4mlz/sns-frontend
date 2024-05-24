"use client";

import { useRouter } from "next/navigation";
import { Box, Flex } from "@chakra-ui/react";
import { ArrowBackIcon, HamburgerIcon } from "@chakra-ui/icons";
import useMenuDrawer from "@/hooks/menuDrawer";

const TransparentHeader = () => {
  const router = useRouter();
  const { onOpen, menuDrawer } = useMenuDrawer();

  return (
    <Box>
      {menuDrawer}
      <Flex
        as="header"
        direction="row"
        w="100%"
        maxW="600px"
        h="60px"
        justifyContent="space-between"
        alignItems="center"
        position="fixed">
        <Flex
          cursor="pointer"
          w="35px"
          h="35px"
          justifyContent="center"
          alignItems="center"
          marginX="15px"
          backgroundColor="gray.700"
          borderRadius="full"
          opacity="0.8"
          onClick={router.back}>
          <ArrowBackIcon w="22px" h="22px" color="white" />
        </Flex>
        <HamburgerIcon cursor="pointer" w="35px" h="35px" marginX="15px" color="gray.400" onClick={onOpen} />
      </Flex>
    </Box>
  );
};

export default TransparentHeader;
