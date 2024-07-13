"use client";

import { Flex, Box, useColorModeValue, Image } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import useMenuDrawer from "@/hooks/menuDrawer";
import { logoIcon } from "@/utils/images";

type Props = {
  onLogoClick?: () => any;
};

const LogoHeader = ({ onLogoClick }: Props) => {
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
        justifyContent="space-between"
        alignItems="center"
        position="fixed"
        zIndex="100"
        backgroundColor={useColorModeValue("white", "gray.800")}>
        <Box w="35px" h="35px" marginX="15px" />
        <Image
          src={logoIcon.src}
          alt="logo"
          cursor={onLogoClick ? "pointer" : "auto"}
          w="35px"
          h="35px"
          pointerEvents="all"
          onClick={onLogoClick}
        />
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

export default LogoHeader;
