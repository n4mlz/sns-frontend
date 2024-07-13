"use client";

import { useRouter } from "next/navigation";
import { Box, Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import { ArrowBackIcon, HamburgerIcon } from "@chakra-ui/icons";
import useMenuDrawer from "@/hooks/menuDrawer";

type Props = {
  title: string;
};

const TitleHeader = ({ title }: Props) => {
  const router = useRouter();
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
          pointerEvents="all"
          onClick={router.back}>
          <ArrowBackIcon w="22px" h="22px" color="white" />
        </Flex>
        <Heading as="h1" size="md" margin="0">
          {title}
        </Heading>
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

export default TitleHeader;
