"use client";

import { useRouter } from "next/navigation";
import { Box, Flex, FlexProps } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

type Props = FlexProps;

const PageBackButton = ({ ...rest }: Props) => {
  const router = useRouter();

  return (
    <Box position="relative" pointerEvents="none">
      <Flex
        cursor="pointer"
        position="fixed"
        w="35px"
        h="35px"
        justifyContent="center"
        alignItems="center"
        margin="15px"
        backgroundColor="gray.700"
        borderRadius="full"
        opacity="0.8"
        pointerEvents="all"
        zIndex="100"
        onClick={router.back}
        {...rest}>
        <ArrowBackIcon w="22px" h="22px" color="white" />
      </Flex>
    </Box>
  );
};

export default PageBackButton;
