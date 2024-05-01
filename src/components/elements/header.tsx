"use client";

import { useRouter } from "next/navigation";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

type Props = {
  title: string;
};

const Header = ({ title }: Props) => {
  const router = useRouter();
  return (
    <Box position="relative" h="60px">
      <Flex as="header" direction="row" alignItems="center" position="fixed" h="60px">
        <Flex
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
        <Heading as="h1" size="md" margin="0">
          {title}
        </Heading>
      </Flex>
    </Box>
  );
};

export default Header;
