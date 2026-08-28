"use client";

import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Flex } from "@chakra-ui/react";

import PageBackButton from "../elements/pageBackButton";

import useMenuDrawer from "@/hooks/menuDrawer";

const TransparentHeader = () => {
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
        position="fixed"
        pointerEvents="none">
        <PageBackButton position="inherit" />
        <HamburgerIcon
          cursor="pointer"
          w="35px"
          h="35px"
          marginX="15px"
          color="gray.400"
          pointerEvents="all"
          onClick={onOpen}
        />
      </Flex>
    </Box>
  );
};

export default TransparentHeader;
