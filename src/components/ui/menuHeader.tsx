"use client";

import { Flex, Box } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import useMenuDrawer from "@/hooks/menuDrawer";

const MenuHeader = () => {
  const { onOpen, menuDrawer } = useMenuDrawer();

  return (
    <Box h="60px">
      {menuDrawer}
      <Flex
        as="header"
        direction="row"
        w="100%"
        maxW="600px"
        h="60px"
        justifyContent="flex-end"
        alignItems="center"
        position="fixed"
        backgroundColor="white">
        <HamburgerIcon w="35px" h="35px" marginX="15px" onClick={onOpen} />
      </Flex>
    </Box>
  );
};

export default MenuHeader;
