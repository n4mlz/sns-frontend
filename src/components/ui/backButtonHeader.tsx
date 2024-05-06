"use client";

import { useRouter } from "next/navigation";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

type Props = {
  title: string;
};

const BackButtonHeader = ({ title }: Props) => {
  const router = useRouter();

  return (
    <Box h="60px">
      <Flex
        as="header"
        direction="row"
        w="100%"
        maxW="600px"
        h="60px"
        alignItems="center"
        position="fixed"
        backgroundColor="white">
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

export default BackButtonHeader;
