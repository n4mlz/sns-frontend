"use client";

import { useRouter } from "next/navigation";
import { Box, Flex } from "@chakra-ui/react";
import { ArrowBackIcon, HamburgerIcon } from "@chakra-ui/icons";
import useMenuDrawer from "@/hooks/menuDrawer";
import PageBackButton from "../elements/pageBackButton";

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
